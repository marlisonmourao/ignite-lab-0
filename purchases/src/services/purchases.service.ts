import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

interface CreatePurchaseParams {
  productId: string
  customerId: string
}

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

  letAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    })
  }
}
