import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Repository } from 'typeorm'
import { SpecialityFieldEducation } from '@app/specialties/entities/speciality-field-education.entity'
import { SpecialityEnlargedGroup } from '@app/specialties/entities/speciality-enlarged-group.entity'
import { SpecialityLevelsEducation } from '@app/specialties/entities/speciality-levels-education.entity'
import { SpecialityProfession } from '@app/specialties/entities/speciality-profession.entity'

@Injectable()
export class SpecialtiesService {
	constructor(
		@InjectRepository(Specialty)
		private readonly specialtyRepository: Repository<Specialty>,
		@InjectRepository(SpecialityFieldEducation)
		private readonly specialtyFieldRepository: Repository<SpecialityFieldEducation>,
		@InjectRepository(SpecialityEnlargedGroup)
		private readonly specialtyGroupRepository: Repository<SpecialityEnlargedGroup>,
		@InjectRepository(SpecialityLevelsEducation)
		private readonly specialtyLevelRepository: Repository<SpecialityLevelsEducation>,
		@InjectRepository(SpecialityProfession)
		private readonly specialtyProfessionRepository: Repository<SpecialityProfession>
	) {}

	async create(specialtyCode: string): Promise<Specialty> {
		const [fieldEducation = '', group = '', level = '', profession = ''] =
			specialtyCode.split('.')

		if (!fieldEducation || !group || !level || !profession) {
			throw new BadRequestException('specialty code cannot be empty')
		}

		const isFieldEducation = await this.getFiledEducationOne(fieldEducation)
		const isGroup = await this.getEnlargedGroupOne(group)
		const isLevel = await this.getLevelEducationOne(level)
		const isProfession = await this.getProfessionOne(profession)

		if (!isFieldEducation || !isGroup || !isLevel || !isProfession) {
			throw new BadRequestException('specialty not found')
		}

		return await this.specialtyRepository.save({
			specialityFieldEducation: isFieldEducation,
			specialityEnlargedGroup: isGroup,
			specialityLevelEducation: isLevel,
			specialityProfession: isProfession,
		})
	}

	async findAll() {
		return await this.specialtyRepository.find({
			relations: {
				specialityFieldEducation: true,
				specialityEnlargedGroup: true,
				specialityLevelEducation: true,
				specialityProfession: true,
			},
		})
	}

	async getFiledEducationOne(code: string): Promise<SpecialityFieldEducation> {
		return await this.specialtyFieldRepository.findOne({ where: { code } })
	}

	async getFiledEducationAll(): Promise<SpecialityFieldEducation[]> {
		return this.specialtyFieldRepository.find()
	}

	async getEnlargedGroupOne(code: string): Promise<SpecialityEnlargedGroup> {
		return await this.specialtyGroupRepository.findOne({ where: { code } })
	}

	async getEnlargedGroupAll(): Promise<SpecialityEnlargedGroup[]> {
		return this.specialtyGroupRepository.find()
	}

	async getLevelEducationOne(code: string): Promise<SpecialityLevelsEducation> {
		return await this.specialtyLevelRepository.findOne({ where: { code } })
	}

	async getLevelEducationAll(): Promise<SpecialityLevelsEducation[]> {
		return this.specialtyLevelRepository.find()
	}

	async getProfessionOne(code: string): Promise<SpecialityProfession> {
		return await this.specialtyProfessionRepository.findOne({ where: { code } })
	}

	async getProfessionAll(): Promise<SpecialityProfession[]> {
		return this.specialtyProfessionRepository.find()
	}
}
