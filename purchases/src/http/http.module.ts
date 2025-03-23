import { TestController } from '@/http/test/test.controller'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TestController],
})
export class HttpModule {}
