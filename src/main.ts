import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { HttpExceptionFilter } from './filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.setGlobalPrefix('api')
  await app.listen(port, () => console.log(`Listen on port ${port}`))
}
bootstrap()
