import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

interface GetByCourseAndStudentIdParams {
  courseId: string
  studentId: string
}

@Injectable()
export class EnrollmentServices {
  constructor(private prisma: PrismaService) {}

  async listAllEnrollments() {
    return await this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null,
      },
    })
  }
}
