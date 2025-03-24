import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { type AuthUser, CurrentUser } from '@/http/auth/current-user'
import { CoursesServices } from '@/services/courses.service'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateCourseInput } from '../inputs/create-course-input'
import { Course } from '../models/course'

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private courseServices: CoursesServices,
    private studentServices: StudentServices,
    private enrollmentServices: EnrollmentServices
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseServices.listAllCourses()
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseServices.createCourse(data)
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentServices.getStudentByUserId(user.sub)

    if (!student) {
      throw new Error('Student not found')
    }

    const enrollment = await this.enrollmentServices.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    })

    if (!enrollment) {
      throw new UnauthorizedException()
    }

    return this.courseServices.getCourseById(id)
  }
}
