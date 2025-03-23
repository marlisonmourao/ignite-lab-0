import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PurchasesServices {
  constructor(private prisma: PrismaService) {}

  listAllPurchase() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
