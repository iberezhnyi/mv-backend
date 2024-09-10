import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from './common/configs'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'https://iberezhnyi.github.io/planner'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

  app.enableCors(corsOptions)

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const port = configService.port

  app.setGlobalPrefix('api')
  await app.listen(port, () => console.log(`Listen on port ${port}`))
}
bootstrap()
