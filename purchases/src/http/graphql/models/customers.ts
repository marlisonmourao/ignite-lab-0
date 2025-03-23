import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Purchase } from './purchases'

@ObjectType()
export class Customers {
  @Field(() => ID)
  id: string

  @Field(() => [Purchase])
  purchases: Purchase[]
}
