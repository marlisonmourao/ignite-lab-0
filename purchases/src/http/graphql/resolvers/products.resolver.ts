import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { ProductsServices } from '@/services/products.service'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateProductInput } from '../inputs/create-product-input'
import { Products } from '../models/products'

@Resolver(() => Products)
export class ProductsResolvers {
  constructor(private productsService: ProductsServices) {}

  @Query(() => [Products])
  @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts()
  }

  @Mutation(() => Products)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data)
  }
}
