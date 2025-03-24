import { PrismaService } from '@/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StudentServices {
  constructor(private prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.student.findMany()
  }

  async getStudentById(id: string) {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    })
  }
}
