import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('specialty_filed_education')
export class SpecialityFieldEducation {
	@ApiProperty({
		description: 'Уникальный идентификатор',
		example: '1',
	})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({
		description: 'Код области образования',
		example: '2',
	})
	@Column({ unique: true })
	code: string

	@ApiProperty({
		description: 'Названия',
		example: 'Инженерное дело, технологии и технические науки',
	})
	@Column()
	title: string

	@OneToMany(() => Specialty, (specialty) => specialty.specialityFieldEducation)
	specialties: Specialty[]

	@OneToMany(() => Vacancy, (vacancy) => vacancy.specialityFieldEducation)
	vacancies: Vacancy[]
}
