import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRegisterDto } from './user-register.dto';
// import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService
  let module: TestingModule = null;
  // let userRepo: Repository<User>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    // userRepo = module.get(getRepositoryToken(User));
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
    
    const user1 = new User();
    user1.id= 2;
    user1.firstName = 'etset',
    user1.lastName = "test",
    user1.name = "test",
    user1.isActive = true
    
    jest.spyOn(userService, 'createUser').mockResolvedValue(user1);

    const user: User = await controller.createPost(userRegisterDto);
    expect(user != null).toEqual(true);
  });

  it('test get user', async () => {
    const userRegisterDto: UserRegisterDto = {
      firstName: 'etset',
      lastName: 'test',
      name: 'test',
      isActive: true
    };
    
    const user1 = new User();
    user1.id= 2;
    user1.firstName = 'etset',
    user1.lastName = "test",
    user1.name = "test",
    user1.isActive = true
    jest.spyOn(userService, 'createUser').mockResolvedValue(user1);

    const user: User = await controller.createPost(userRegisterDto);

    expect(user != null).toEqual(true);
  });
});