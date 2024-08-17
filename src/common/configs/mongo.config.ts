import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
  }
}

const getMongoString = (configService: ConfigService): string => {
  const uri =
    'mongodb+srv://' +
    configService.get<string>('MONGO_USER') +
    ':' +
    configService.get<string>('MONGO_PASSWORD') +
    '@' +
    configService.get<string>('MONGO_HOST') +
    '/' +
    configService.get<string>('MONGO_DB_NAME') +
    '?' +
    'retryWrites=true&w=majority&appName=Cluster0'

  // const uri = `configService.get<string>('DB_HOST')`

  if (!uri) {
    throw new Error('URI is not defined')
  }

  return uri
}
