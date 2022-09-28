import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRegisterDto } from './user-register.dto';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserSeed from '../database/seed/user.seed';

describe('UserController', () => {
  let controller: UserController;
  let module: TestingModule = null;
  let app: INestApplication;
  let userRepo: Repository<User>;
  
  beforeEach(async () => {

    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [User],
          dropSchema: true,
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy()
        }),
        TypeOrmModule.forFeature([User])
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    controller = app.get<UserController>(UserController);
    
    userRepo = module.get(getRepositoryToken(User));
    await Promise.all(UserSeed.map(user => userRepo.save(user)));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test create user', async () => {
    const userRegisterDto: UserRegisterDto = {
      firstName: 'etset',
      lastName: 'test',
      name: 'test',
      isActive: true
    };
    const user: User = await controller.createPost(userRegisterDto);
    expect(user != null).toEqual(true);
  });

  it('test find one user', async () => {
    const user: User = await controller.findOne(1);

    expect(user != null).toEqual(true);
  });

  it('test find all user', async () => {
    const user: User[] = await controller.findAll();
    expect(user.length == 1).toEqual(true);
  });
  
  afterAll(async () => {
    await app.close()
  });
});