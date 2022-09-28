import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const connectionSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/**/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy()
});