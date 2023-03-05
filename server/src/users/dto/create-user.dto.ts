import {
	IsEmail,
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	Length,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Column } from 'typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Exclude } from 'class-transformer'

export class CreateUserDto {
	@ApiProperty({
		example: 'Иванов',
		description: 'Фамилия',
		required: true,
	})
	@IsNotEmpty()
	@Length(2, 20)
	@IsString()
	surname: string

	@ApiProperty({
		example: 'Иван',
		description: 'Имя',
		required: true,
	})
	@IsNotEmpty()
	@Length(2, 20)
	@IsString()
	name: string

	@ApiProperty({
		example: 'Иванович',
		description: 'Отчество',
		required: true,
	})
	@IsNotEmpty()
	@Length(2, 20)
	@IsString()
	patronymic: string

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
		example: '8 928 999-99-99',
		description: 'Телефон',
		required: true,
	})
	@IsNotEmpty()
	phone: string

	@ApiProperty({
		example: '12345678',
		description: 'Пароль',
		required: true,
	})
	@IsNotEmpty()
	@Length(8, 20)
	@IsString()
	readonly password: string

	@ApiProperty({
		description: 'Код специальности',
		example: '2.09.02.03',
		required: true,
	})
	@IsNotEmpty()
	specialtyCode: string
}
