import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponseDao {
	@ApiProperty()
	id: number

	@ApiProperty()
	title: string
}
