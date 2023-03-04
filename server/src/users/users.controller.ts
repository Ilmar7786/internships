import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common'

import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from "@app/users/entities/user.entity";

@ApiTags('Пользователь')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Информация пользователя' })
	@ApiCreatedResponse({ type: User })
	@UseGuards(JwtAuthGuard)
	@Get()
	getUserInfo(@Request() req) {
		return this.usersService.getUserInfo(req.user)
	}
}