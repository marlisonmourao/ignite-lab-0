import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'

@Controller('hello')
export class TestController {
  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'ok'
  }
}
