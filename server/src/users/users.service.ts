import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { SpecialtiesService } from '@app/specialties/specialties.service'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly specialtyService: SpecialtiesService
	) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		const specialty = await this.specialtyService.create(dto.specialtyCode)

		return await this.userRepository.save({ ...dto, specialty })
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: {
				email,
			},
			relations: {
				specialty: true,
			},
		})
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find({
			relations: {
				specialty: true,
			},
		})
	}

	async getUserInfo(userId: number): Promise<User | null> {
		return await this.findById(userId)
	}

	async checkIsAdmin(userId): Promise<boolean> {
		const user = await this.findById(userId)

		return user.isAdmin
	}

	async findById(userId: number): Promise<User> {
		return await this.userRepository.findOne({
			where: {
				id: userId,
			},
			relations: {
				specialty: true,
			},
		})
	}
}
