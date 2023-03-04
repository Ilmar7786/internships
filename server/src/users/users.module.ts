import { Module } from '@nestjs/common'

import { User } from '@app/users/entities/user.entity'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [TypeOrmModule.forFeature([User, Vacancy])],
	exports: [UsersService],
})
export class UsersModule {}
