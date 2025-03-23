import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Products } from './products'

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase status',
})

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string

  @Field(() => PurchaseStatus)
  status: PurchaseStatus

  @Field()
  slug: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Products)
  product: Products

  productId: string
}
