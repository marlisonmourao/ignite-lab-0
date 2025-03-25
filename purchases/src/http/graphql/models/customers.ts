import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Purchase } from './purchases'

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customers {
  id: string

  @Field(() => ID)
  authUserId: string

  @Field(() => [Purchase])
  purchases: Purchase[]
}
