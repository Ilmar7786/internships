import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
	@ApiProperty({
		example: 'user@mail.ru',
		description: 'Почтовый адрес',
		required: true,
	})
	@IsNotEmpty()
	@Length(5, 30)
	@IsEmail()
	readonly email: string

	@ApiProperty({
		example: '12345678',
		description: 'Пароль',
		required: true,
	})
	@IsNotEmpty()
	@Length(8, 20)
	@IsString()
	readonly password: string
}
