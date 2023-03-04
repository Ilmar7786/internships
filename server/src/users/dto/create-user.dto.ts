import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@IsNotEmpty()
	@Length(5, 30)
	@IsEmail()
	readonly email: string

	@ApiProperty({ example: '12345678', description: 'Пароль' })
	@IsNotEmpty()
	@Length(8, 20)
	@IsString()
	readonly password: string
}
