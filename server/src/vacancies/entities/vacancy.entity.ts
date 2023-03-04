import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'

@Entity('vacancies')
export class Vacancy {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@ManyToOne(() => VacancyCategory, (category) => category.vacancy)
	category: VacancyCategory
}
