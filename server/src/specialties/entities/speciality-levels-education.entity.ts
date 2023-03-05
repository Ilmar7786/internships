import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('specialty_levels_education')
export class SpecialityLevelsEducation {
	@ApiProperty({
		description: 'Уникальный идентификатор',
		example: '1',
	})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({
		description: 'Код уровня профессионального образования',
		example: '02',
	})
	@Column({ unique: true })
	code: string

	@ApiProperty({
		description: 'Название',
		example:
			'Среднее профессиональное образование — подготовка специалистов среднего звена',
	})
	@Column()
	title: string

	@OneToMany(() => Specialty, (specialty) => specialty.specialityLevelEducation)
	specialties: Specialty[]

	@OneToMany(() => Vacancy, (vacancy) => vacancy.specialityFieldEducation)
	vacancies: Vacancy[]
}
