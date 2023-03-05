import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('specialty_enlarged_group')
export class SpecialityEnlargedGroup {
	@ApiProperty({
		description: 'Уникальный идентификатор',
		example: '1',
	})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({
		description: 'Код укрупненной группы',
		example: '09',
	})
	@Column({ unique: true })
	code: string

	@ApiProperty({
		description: 'Название',
		example: 'Информатика и вычислительная техника',
	})
	@Column()
	title: string

	@OneToMany(() => Specialty, (specialty) => specialty.specialityEnlargedGroup)
	specialties: Specialty[]

	@OneToMany(() => Vacancy, (vacancy) => vacancy.specialityFieldEducation)
	vacancies: Vacancy[]
}
