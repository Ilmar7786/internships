import { Module } from '@nestjs/common'

import { User } from '@app/users/entities/user.entity'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { SpecialtiesModule } from '@app/specialties/specialties.module'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [TypeOrmModule.forFeature([User, Vacancy]), SpecialtiesModule],
	exports: [UsersService],
})
export class UsersModule {}
