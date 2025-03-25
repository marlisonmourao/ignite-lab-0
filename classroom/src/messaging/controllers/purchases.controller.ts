import { CoursesServices } from '@/services/courses.service'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

interface PurchaseCreatedPayload {
  customer: {
    authUserId: string
  }
  product: {
    id: string
    title: string
    slug: string
  }
}

@Controller()
export class PurchasesController {
  constructor(
    private studentServices: StudentServices,
    private courseServices: CoursesServices,
    private enrollmentServices: EnrollmentServices
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentServices.getStudentByUserId(
      payload.customer.authUserId
    )

    if (!student) {
      student = await this.studentServices.create({
        authUserId: payload.customer.authUserId,
      })
    }

    let course = await this.courseServices.getStudentBySlug(
      payload.product.slug
    )

    if (!course) {
      course = await this.courseServices.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      })
    }

    await this.enrollmentServices.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    })
  }
}
