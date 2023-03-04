import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@app/users/entities/user.entity'
import { UsersModule } from '@app/users'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/auth.strategy'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (cfg: ConfigService) => ({
				secret: cfg.get('JWT_ACCESS_SECRET'),
				signOptions: { expiresIn: cfg.get('JWT_ACCESS_EXPIRES') },
			}),
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
