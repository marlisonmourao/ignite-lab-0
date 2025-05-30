import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Products {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  slug: string
}
