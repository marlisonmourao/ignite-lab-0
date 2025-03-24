import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { CoursesServices } from '@/services/courses.service'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Enrollment } from '../models/enrollment'

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentsService: EnrollmentServices,
    private coursesServices: CoursesServices,
    private studentServices: StudentServices
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments()
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentServices.getStudentById(enrollment.studentId)
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesServices.getCourseById(enrollment.courseId)
  }
}
