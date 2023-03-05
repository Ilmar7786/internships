import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSpecialtyDto {
	@ApiProperty({
		description: 'Код',
		example: '09',
		required: true,
	})
	@IsNotEmpty()
	code: string

	@ApiProperty({
		description: 'Название',
		example: 'Информатика и вычислительная техника',
		required: true,
	})
	@IsNotEmpty()
	title: string
}
