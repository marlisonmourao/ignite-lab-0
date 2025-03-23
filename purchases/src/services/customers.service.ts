import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

interface CreateCustomerParams {
  authUserId: string
}

@Injectable()
export class CustomersServices {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    })
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    })
  }
}
