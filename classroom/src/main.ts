import { NestFactory } from '@nestjs/core'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  })

  app
    .startAllMicroservices()
    .then(() => console.log('Microservices are listening'))

  app.listen(3334).then(() => console.log('HTTP Server is listening'))
}
bootstrap()
