import { ApiProperty } from '@nestjs/swagger'
import {
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { SpecialityFieldEducation } from '@app/specialties/entities/speciality-field-education.entity'
import { SpecialityEnlargedGroup } from '@app/specialties/entities/speciality-enlarged-group.entity'
import { SpecialityLevelsEducation } from '@app/specialties/entities/speciality-levels-education.entity'
import { SpecialityProfession } from '@app/specialties/entities/speciality-profession.entity'
import { User } from '@app/users/entities/user.entity'

@Entity('specialties')
export class Specialty {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(
		() => SpecialityFieldEducation,
		(specialityFieldEducation) => specialityFieldEducation.specialties,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_field_education_id' })
	specialityFieldEducation: SpecialityFieldEducation

	@ManyToOne(
		() => SpecialityEnlargedGroup,
		(specialityEnlargedGroup) => specialityEnlargedGroup.specialties,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_enlarged_group_id' })
	specialityEnlargedGroup: SpecialityEnlargedGroup

	@ManyToOne(
		() => SpecialityLevelsEducation,
		(specialityLevelsEducation) => specialityLevelsEducation.specialties,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_level_education_id' })
	specialityLevelEducation: SpecialityEnlargedGroup

	@ManyToOne(
		() => SpecialityProfession,
		(SpecialityProfession) => SpecialityProfession.specialties,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_profession_id' })
	specialityProfession: SpecialityProfession

	@OneToOne(() => User, (user) => user.specialty)
	user: User
}
