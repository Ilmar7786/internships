import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@app/users/entities/user.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('job_postings')
export class JobPosting {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, (user) => user.jobPosting, {
		nullable: false,
		eager: true,
	})
	user: User

	@ManyToOne(() => Vacancy, (vacancy) => vacancy.jobPosting, {
		nullable: false,
		eager: true,
	})
	vacancy: Vacancy
}
