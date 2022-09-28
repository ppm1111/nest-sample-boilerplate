import { MigrationInterface, QueryRunner, Table } from "typeorm"
import userSeed from '../seed/user.seed';

export class user1663670406161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
              },
              { 
                name: "name",
                type: "varchar"
              },
              {
                name: "first_name",
                type: "varchar"
              },
              {
                name: "last_name",
                type: "varchar"
              },
              {
                name: "is_active",
                type: "int"
              }
            ]
          }),
          true
        );

        const userRepo = queryRunner.connection.getRepository('users');
        await Promise.all(userSeed.map((user) => userRepo.save(user)));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
