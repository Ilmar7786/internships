import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('vacancy_categories')
export class VacancyCategory {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@OneToMany(() => Vacancy, (vacancy) => vacancy.category)
	vacancy: Vacancy[]
}
