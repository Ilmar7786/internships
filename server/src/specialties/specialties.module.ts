import { Module } from '@nestjs/common'
import { SpecialtiesService } from './specialties.service'
import { SpecialtiesController } from './specialties.controller'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SpecialityFieldEducation } from '@app/specialties/entities/speciality-field-education.entity'
import { SpecialityEnlargedGroup } from '@app/specialties/entities/speciality-enlarged-group.entity'
import { SpecialityLevelsEducation } from '@app/specialties/entities/speciality-levels-education.entity'
import { SpecialityProfession } from '@app/specialties/entities/speciality-profession.entity'

@Module({
	controllers: [SpecialtiesController],
	providers: [SpecialtiesService],
	imports: [
		TypeOrmModule.forFeature([
			Specialty,
			SpecialityFieldEducation,
			SpecialityEnlargedGroup,
			SpecialityLevelsEducation,
			SpecialityProfession,
		]),
	],
	exports: [SpecialtiesService],
})
export class SpecialtiesModule {}
