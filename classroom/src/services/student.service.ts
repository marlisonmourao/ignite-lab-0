import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

interface CreateStudentParams {
  authUserId: string
}

@Injectable()
export class StudentServices {
  constructor(private prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.student.findMany()
  }

  async getStudentByUserId(authUserId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    })
  }

  async getStudentById(id: string) {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    })
  }

  async create({ authUserId }: CreateStudentParams) {
    return await this.prisma.student.create({
      data: {
        authUserId,
      },
    })
  }
}
