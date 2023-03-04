import { IsBoolean, IsNotEmpty, IsNumber, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateVacancyDto {
	@ApiProperty({
		description: 'Название',
		default: 'Frontend Разработчик',
		required: true,
	})
	@IsNotEmpty()
	title: string

	@ApiProperty({
		description: 'Краткое описание',
		default: 'React, Typescript, Mobx',
		required: true,
	})
	@IsNotEmpty()
	description: string

	@ApiProperty({
		description: 'Контент',
		default: 'Нужен человек с опытом для разработки внутреннего проекта',
		required: true,
	})
	@IsNotEmpty()
	content: string

	@ApiProperty({
		description: 'Опыт',
		default: 0,
		type: 'boolean',
	})
	@IsNumber()
	experience: number

	@ApiProperty({
		description: 'Идентификатор категории',
		default: 1,
		type: 'number',
		required: true,
	})
	@IsNotEmpty()
	@IsNumber()
	categoryId: number
}
