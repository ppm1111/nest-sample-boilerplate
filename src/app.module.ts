import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {WinstonModule} from "nest-winston";
import * as winston from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");
const format = winston.format;
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: [__dirname + '/../**/*.entity.js'],
      migrations: ['src/database/migrations/**/*.js'],
      migrationsTableName: 'migrations',
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy()
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.timestamp({
          format: 'HH:mm:ss YY/MM/DD'
        }),
        format.label({
          label: "app"
        }),
      
        format.splat(),
        format.printf( info => {
          return `${info.timestamp} ${info.level}: [${info.label}] ${info.message}`
        }),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
        }),
        new DailyRotateFile({
          filename: 'logs/logger-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
