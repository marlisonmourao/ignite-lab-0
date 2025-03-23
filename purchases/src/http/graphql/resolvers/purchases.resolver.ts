import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { type AuthUser, CurrentUser } from '@/http/auth/current-user'
import { CustomersServices } from '@/services/customers.service'
import { ProductsServices } from '@/services/products.service'
import { PurchasesServices } from '@/services/purchases.service'
import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CreatePurchaseInput } from '../inputs/create-purchase-input'
import { Products } from '../models/products'
import { Purchase } from '../models/purchases'

@Resolver(() => Purchase)
export class PurchasesResolvers {
  constructor(
    private purchasesServices: PurchasesServices,
    private productsServices: ProductsServices,
    private customersService: CustomersServices
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesServices.listAllPurchase()
  }

  @ResolveField(() => Products)
  product(@Parent() purchase: Purchase) {
    return this.productsServices.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data') data: CreatePurchaseInput
  ) {
    let customer = await this.customersService.getCustomerByAuthId(user.sub)

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      })
    }

    return this.purchasesServices.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    })
  }
}
