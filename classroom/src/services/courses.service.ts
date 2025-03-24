import { PrismaService } from '@/database/prisma/prisma.service'
import { generateSlug } from '@/utils/generate-slug'
import { Injectable } from '@nestjs/common'

interface CreateCourseParams {
  title: string
}

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

  async createCourse({ title }: CreateCourseParams) {
    const slug = generateSlug(title)

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    })

    if (courseAlreadyExists) {
      throw new Error('Course already exists')
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    })
  }
}
