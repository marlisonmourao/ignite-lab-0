import { PrismaService } from '@/database/prisma/prisma.service'
import { generateSlug } from '@/utils/generate-slug'
import { Injectable } from '@nestjs/common'

interface CreateProductsParams {
  title: string
}

@Injectable()
export class ProductsServices {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return await this.prisma.product.findMany()
  }

  async getProductById(id: string) {
    return await this.prisma.product.findUnique({ where: { id } })
  }

  async createProduct({ title }: CreateProductsParams) {
    const productWithSameSlug = await this.prisma.product.findFirst({
      where: { slug: generateSlug(title) },
    })

    if (productWithSameSlug) {
      throw new Error('Another product with the same title already exists')
    }

    return this.prisma.product.create({
      data: {
        title,
        slug: generateSlug(title),
      },
    })
  }
}
