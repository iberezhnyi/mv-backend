import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService, getMongoConfig } from './common/configs'
import { LoggerMiddleware } from './common/middlewares'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MonthsModule } from './months/months.module'
import { WeeksModule } from './weeks/weeks.module'
import { TasksModule } from './tasks/tasks.module'
import { NotesModule } from './notes/notes.module'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UsersModule,
    MonthsModule,
    WeeksModule,
    TasksModule,
    NotesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
