import { DatabaseModule } from '@/database/database.module'
import { CoursesServices } from '@/services/courses.service'
import { EnrollmentServices } from '@/services/enrollment.service'
import { StudentServices } from '@/services/student.service'
import { Module } from '@nestjs/common'
import { PurchasesController } from './controllers/purchases.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [StudentServices, CoursesServices, EnrollmentServices],
})
export class MessagingModule {}
