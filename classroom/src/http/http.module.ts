import { DatabaseModule } from '@/database/database.module'
import { CoursesServices } from '@/services/courses.service'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import {
  ApolloFederationDriver,
  type ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'node:path'
import { CourseResolver } from './graphql/resolvers/courses.resolver'
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver'
import { StudentResolver } from './graphql/resolvers/students.resolver'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
      context: ({ req, res }) => ({ request: req, response: res }),
    }),
  ],
  providers: [
    CourseResolver,
    EnrollmentResolver,
    StudentResolver,

    CoursesServices,
    EnrollmentServices,
    StudentServices,
  ],
})
export class HttpModule {}
