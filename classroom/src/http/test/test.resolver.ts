import { PrismaService } from '@/database/prisma/prisma.service'
import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World!'
  }
}
