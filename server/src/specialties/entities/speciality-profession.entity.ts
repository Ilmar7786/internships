import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Specialty } from '@app/specialties/entities/specialty.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@Entity('specialty_profession')
export class SpecialityProfession {
	@ApiProperty({
		description: 'Уникальный идентификатор',
		example: '1',
	})
	@PrimaryGeneratedColumn()
	id: number

	@ApiProperty({
		description: 'Код профессии',
		example: '03',
	})
	@Column({ unique: true })
	code: string

	@ApiProperty({
		description: 'Названия',
		example: 'Программирование в компьютерных системах',
	})
	@Column()
	title: string

	@OneToMany(() => Specialty, (specialty) => specialty.specialityProfession)
	specialties: Specialty[]

	@OneToMany(() => Vacancy, (vacancy) => vacancy.specialityFieldEducation)
	vacancies: Vacancy[]
}
