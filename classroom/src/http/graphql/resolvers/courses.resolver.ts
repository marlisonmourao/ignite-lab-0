import { AuthorizationGuard } from '@/http/auth/authorization/authorization.guard'
import { CoursesServices } from '@/services/courses.service'
import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Course } from '../models/course'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CoursesServices) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses()
  }
}
