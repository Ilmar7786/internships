import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateJobPostingDto {
	@ApiProperty({
		example: 1,
		description: 'Идентификатор пользователя',
		required: true,
	})
	@IsNotEmpty()
	@IsNumber()
	readonly userId: number

	@ApiProperty({
		example: 1,
		description: 'Идентификатор вакансии',
		required: true,
	})
	@IsNotEmpty()
	@IsNumber()
	readonly vacancyId: number
}
