import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(dto)
		await this.userRepository.save(user)
		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: {
				email,
			},
		})
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find()
	}

	async getUserInfo(userId: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: {
				id: +userId,
			},
		})
	}

	async checkIsAdmin(userId): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		})

		return user.isAdmin
	}

	async findById(userId: number): Promise<User | null> {
		return await this.userRepository.findOne({
			where: {
				id: userId,
			},
		})
	}
}
