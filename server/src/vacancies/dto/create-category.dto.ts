import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
	@ApiProperty({
		description: 'Название',
		default: 'Frontend Разработчик',
		required: true,
	})
	@IsNotEmpty()
	title: string
}
