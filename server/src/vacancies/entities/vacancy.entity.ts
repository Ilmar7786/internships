import {
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { User } from '@app/users/entities/user.entity'

@Entity('vacancies')
export class Vacancy {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column({ type: 'text' })
	content: string

	@Column({ default: 0 })
	experience: number

	@ManyToOne(() => VacancyCategory, (category) => category.vacancy)
	category: VacancyCategory
}
