import {
	Column,
	Entity,
	JoinColumn, OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { JobPosting } from "@app/job-postings/entities/job-posting.entity";

@Entity('users')
export class User {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({ example: 'Иванов', description: 'Фамилия' })
	@Column()
	surname: string

	@ApiProperty({ example: 'Иван', description: 'Имя' })
	@Column()
	name: string

	@ApiProperty({ example: 'Иванович', description: 'Отчество' })
	@Column()
	patronymic: string

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@Column({ unique: true })
	email: string

	@ApiProperty({ example: '8 928 999-99-99', description: 'Телефон' })
	@Column()
	phone: string

	@Column()
	@Exclude()
	password: string

	@ApiProperty({ example: false, description: 'Администратор' })
	@Column({ default: false })
	isAdmin: boolean

	@OneToOne(() => Specialty, (specialty) => specialty.user)
	@JoinColumn({ name: 'specialty_id' })
	specialty: Specialty

	@OneToMany(()=> JobPosting, (job) => job.user)
	jobPosting: JobPosting
}
