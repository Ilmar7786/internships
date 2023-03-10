import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard'
import { UsersService } from './users.service'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { User } from '@app/users/entities/user.entity'

@ApiTags('Пользователь')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Информация пользователя' })
	@ApiCreatedResponse({ type: User })
	@UseGuards(JwtAuthGuard)
	@Get('info')
	getUserInfo(@Request() req) {
		return this.usersService.getUserInfo(req.user.id)
	}
	@ApiOperation({ summary: 'Список пользователей' })
	@ApiCreatedResponse({ type: [User] })
	@Get()
	getAll() {
		return this.usersService.findAll()
	}
}
