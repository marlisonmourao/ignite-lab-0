import { ProductsServices } from '@/services/products.service'
import { PurchasesServices } from '@/services/purchases.service'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Products } from '../models/products'
import { Purchase } from '../models/purchases'

@Resolver(() => Purchase)
export class PurchasesResolvers {
  constructor(
    private purchasesServices: PurchasesServices,
    private productsServices: ProductsServices
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchasesServices.listAllPurchase()
  }

  @ResolveField(() => Products)
  product(@Parent() purchase: Purchase) {
    return this.productsServices.getProductById(purchase.productId)
  }
}
