import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
	@ApiProperty({
		description: 'Почта',
		default: 'example@mail.ru',
		required: true,
	})
	@IsNotEmpty()
	readonly email: string

	@ApiProperty({
		description: 'Пароль',
		default: 'qwerty12+',
		required: true,
	})
	@IsNotEmpty()
	readonly password: string
}
