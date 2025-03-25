import { PrismaService } from '@/database/prisma/prisma.service'
import { generateSlug } from '@/utils/generate-slug'
import { Injectable } from '@nestjs/common'

interface CreateCourseParams {
  title: string
  slug?: string
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

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? generateSlug(title)

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug: courseSlug,
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

  async getStudentBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug,
      },
    })
  }
}
