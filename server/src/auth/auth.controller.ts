import { Body, Controller, Post } from '@nestjs/common'
import {
	ApiCreatedResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'

import { AuthService } from '@app/auth/auth.service'
import { LoginUserDto } from '@app/auth/dto/login-user.dto'
import { User } from '@app/users/entities/user.entity'
import { RefreshTokenDto } from '@app/auth/dto/refresh-token.dto'
import { RegisterUserDto } from '@app/auth/dto/register-user.dto'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Регистрация' })
	@ApiResponse({
		status: 200,
		type: User,
		description: 'Успешная регистрация пользователя',
	})
	@Post('register')
	register(@Body() dto: RegisterUserDto) {
		return this.authService.signUp(dto)
	}

	@ApiOperation({ summary: 'Авторизация' })
	@ApiCreatedResponse({ type: User, description: 'Авторизация пользователя' })
	@Post('login')
	login(@Body() dto: LoginUserDto) {
		return this.authService.signIn(dto)
	}

	@ApiOperation({ summary: 'Обновление токена' })
	@ApiResponse({
		status: 200,
		type: User,
		description: 'Получить новую пару ключей',
	})
	@Post('refresh-token')
	refreshToken(@Body() dto: RefreshTokenDto) {
		return this.authService.refreshToken(dto)
	}
}
