import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import * as cookieParser from 'cookie-parser'
// import { HttpExceptionFilter } from './filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalFilters(new HttpExceptionFilter())

  app.use(cookieParser())

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

  app.enableCors(corsOptions)

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.setGlobalPrefix('api')
  await app.listen(port, () => console.log(`Listen on port ${port}`))
}
bootstrap()
