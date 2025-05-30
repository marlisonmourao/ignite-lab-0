import { PrismaService } from '@/database/prisma/prisma.service'
import { KafkaService } from '@/messaging/kafka.service'
import { Injectable } from '@nestjs/common'

interface CreatePurchaseParams {
  productId: string
  customerId: string
}

@Injectable()
export class PurchasesServices {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

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

    const purchase = this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    })

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    })

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    })

    return purchase
  }
}
