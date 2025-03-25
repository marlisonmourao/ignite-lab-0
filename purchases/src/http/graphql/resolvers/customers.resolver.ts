import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { type AuthUser, CurrentUser } from '@/http/auth/current-user'
import { CustomersServices } from '@/services/customers.service'
import { PurchasesServices } from '@/services/purchases.service'
import { UseGuards } from '@nestjs/common'
import {
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql'
import { Customers } from '../models/customers'

@Resolver(() => Customers)
export class CustomersResolvers {
  constructor(
    private customersService: CustomersServices,
    private customerService: PurchasesServices
  ) {}

  @Query(() => Customers)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customersService.getCustomerByAuthId(user.sub)
  }

  @ResolveField()
  async purchases(@Parent() customer: Customers) {
    return await this.customerService.letAllFromCustomer(customer.id)
  }

  @ResolveReference()
  async resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthId(reference.authUserId)
  }
}
