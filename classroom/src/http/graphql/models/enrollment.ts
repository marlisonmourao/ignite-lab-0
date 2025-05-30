import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Course } from './course'
import { Student } from './student'

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string

  @Field(() => Date, { nullable: true })
  canceledAt: Date

  @Field(() => Date)
  createdAt: Date

  @Field(() => Student)
  student: Student

  @Field(() => Course)
  course: Course

  courseId: string
  studentId: string
}
