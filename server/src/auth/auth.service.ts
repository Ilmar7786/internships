import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UsersService } from '@app/users/users.service'

import { User } from '@app/users/entities/user.entity'

import { IAuth, IJWTPayload, ITokens } from './auth.types'
import { RefreshTokenDto } from '@app/auth/dto/refresh-token.dto'
import { LoginUserDto } from '@app/auth/dto/login-user.dto'
import { RegisterUserDto } from '@app/auth/dto/register-user.dto'
import { SpecialtiesService } from '@app/specialties/specialties.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signIn(dto: LoginUserDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair({ id: user.id })

		return {
			user: user,
			...tokens,
		}
	}

	async signUp(dto: RegisterUserDto): Promise<IAuth> {
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
		delete user.password

		const tokens = await this.issueTokenPair({ id: user.id })

		return {
			user: user,
			...tokens,
		}
	}

	async validateUser(dto: LoginUserDto): Promise<User> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueTokenPair(payload: IJWTPayload): Promise<ITokens> {
		const accessToken = await this.jwtService.signAsync(payload)
		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.configService.get('JWT_REFRESH_EXPIRES', '30d'),
		})

		return { accessToken, refreshToken }
	}

	async refreshToken(dto: RefreshTokenDto): Promise<ITokens> {
		const payload = this.jwtService.verify<IJWTPayload>(dto.token)
		if (!payload) throw new ForbiddenException('Access Denied')

		const user = await this.userService.findById(payload.id)
		if (!user) {
			throw new ForbiddenException('Access Denied')
		}
		return await this.issueTokenPair({ id: user.id })
	}
}
