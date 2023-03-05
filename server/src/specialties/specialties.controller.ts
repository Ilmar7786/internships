import { Controller, Get } from '@nestjs/common'
import { SpecialtiesService } from './specialties.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { SpecialityFieldEducation } from './entities/speciality-field-education.entity'
import { SpecialityEnlargedGroup } from '@app/specialties/entities/speciality-enlarged-group.entity'
import { SpecialityLevelsEducation } from './entities/speciality-levels-education.entity'
import { SpecialityProfession } from './entities/speciality-profession.entity'

@ApiTags('Специальности')
@Controller('specialties')
export class SpecialtiesController {
	constructor(private readonly specialtiesService: SpecialtiesService) {}

	@ApiOperation({ summary: 'Список ОКСО' })
	@ApiResponse({ status: 200, type: [Specialty] })
	@Get()
	findAll() {
		return this.specialtiesService.findAll()
	}

	@ApiOperation({ summary: 'Список деятельности' })
	@ApiResponse({ status: 200, type: [SpecialityFieldEducation] })
	@Get('filed-education')
	findFiledEducationAll() {
		return this.specialtiesService.getFiledEducationAll()
	}

	@ApiOperation({ summary: 'Список направлений' })
	@ApiResponse({ status: 200, type: [SpecialityEnlargedGroup] })
	@Get('enlarged-group')
	findEnlargedGroupAll() {
		return this.specialtiesService.getEnlargedGroupAll()
	}

	@ApiOperation({ summary: 'Список образований' })
	@ApiResponse({ status: 200, type: [SpecialityLevelsEducation] })
	@Get('levels-education')
	findLevelAll() {
		return this.specialtiesService.getLevelEducationAll()
	}

	@ApiOperation({ summary: 'Список профессий' })
	@ApiResponse({ status: 200, type: [SpecialityProfession] })
	@Get('profession')
	findProfessionAll() {
		return this.specialtiesService.getProfessionAll()
	}
}
