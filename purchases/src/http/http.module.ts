import { DatabaseModule } from '@/database/database.module'
import { ProductsResolvers } from '@/http/graphql/resolvers/products.resolver'
import { CustomersServices } from '@/services/customers.service'
import { ProductsServices } from '@/services/products.service'
import { PurchasesServices } from '@/services/purchases.service'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'node:path'
import { PurchasesResolvers } from './graphql/resolvers/purchases.resolver'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: ({ req, res }) => ({ request: req, response: res }),
    }),
  ],
  providers: [
    ProductsServices,
    PurchasesServices,

    ProductsResolvers,
    PurchasesResolvers,

    CustomersServices,
  ],
})
export class HttpModule {}
