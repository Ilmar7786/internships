import { Module } from '@nestjs/common'

import { User } from '@app/users/entities/user.entity'

import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [TypeOrmModule.forFeature([User])],
	exports: [UsersService],
})
export class UsersModule {}
