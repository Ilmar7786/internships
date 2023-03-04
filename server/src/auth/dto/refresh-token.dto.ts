import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
	@ApiProperty({
		description: 'Refresh токен, генерация новой пары ключей',
		required: true,
	})
	@IsNotEmpty()
	readonly token: string
}
