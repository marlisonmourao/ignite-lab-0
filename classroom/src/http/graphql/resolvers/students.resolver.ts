import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Student } from '../models/student'

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentServices,
    private enrollmentsService: EnrollmentServices
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents()
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id)
  }

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentService.getStudentByUserId(user.sub)
  // }
}
