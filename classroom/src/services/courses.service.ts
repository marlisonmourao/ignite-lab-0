import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CoursesServices {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return await this.prisma.course.findMany()
  }

  async getCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    })
  }
}
