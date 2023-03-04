import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@Column({ unique: true })
	email: string

	@Exclude()
	password: string

	@ApiProperty({ example: false, description: 'Администратор' })
	@Column({ default: false })
	isAdmin: boolean
}
