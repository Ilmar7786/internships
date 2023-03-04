import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UsersService } from '@app/users/users.service'
import { CreateUserDto } from '@app/users/dto/create-user.dto'

import { User } from '@app/users/entities/user.entity'

import { IAuth, IJWTPayload, ITokens } from './auth.types'
import { RefreshTokenDto } from "@app/auth/dto/refresh-token.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async signIn(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair({ id: String(user.id) })

		return {
			user: user,
			...tokens,
		}
	}

	async signUp(dto: CreateUserDto): Promise<IAuth> {
		const oldUser = await this.userService.findByEmail(dto.email)
		if (oldUser) {
			throw new BadRequestException(
				'User with this email is already in the system'
			)
		}

		const user = await this.userService.createUser({
			...dto,
			password: await hash(dto.password, 10),
		})

		const tokens = await this.issueTokenPair({ id: String(user.id) })

		// todo: убрать пароль
		return {
			user: user,
			...tokens,
		}
	}

	async validateUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueTokenPair(payload: IJWTPayload): Promise<ITokens> {
		const accessToken = await this.jwtService.signAsync(payload)
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.get('jwt.jwtRefreshExpires', '30d'),
		})

		return { accessToken, refreshToken }
	}

	refreshToken(dto: RefreshTokenDto) {
		return
	}
}
