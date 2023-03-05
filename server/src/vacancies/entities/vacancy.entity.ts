import {
	Column,
	Entity, JoinColumn,
	ManyToMany,
	ManyToOne, OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { User } from '@app/users/entities/user.entity'
import { SpecialityFieldEducation } from "@app/specialties/entities/speciality-field-education.entity";
import { SpecialityEnlargedGroup } from "@app/specialties/entities/speciality-enlarged-group.entity";
import { SpecialityLevelsEducation } from "@app/specialties/entities/speciality-levels-education.entity";
import { SpecialityProfession } from "@app/specialties/entities/speciality-profession.entity";
import { JobPosting } from "@app/job-postings/entities/job-posting.entity";

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

	@ManyToOne(() => VacancyCategory, (category) => category.vacancies, {
		nullable: false,
	})
	category: VacancyCategory

	@ManyToOne(
		() => SpecialityFieldEducation,
		(specialityFieldEducation) => specialityFieldEducation.vacancies,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_field_education_id' })
	specialityFieldEducation: SpecialityFieldEducation

	@ManyToOne(
		() => SpecialityEnlargedGroup,
		(specialityEnlargedGroup) => specialityEnlargedGroup.vacancies,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_enlarged_group_id' })
	specialityEnlargedGroup: SpecialityEnlargedGroup

	@ManyToOne(
		() => SpecialityLevelsEducation,
		(specialityLevelsEducation) => specialityLevelsEducation.vacancies,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_level_education_id' })
	specialityLevelEducation: SpecialityEnlargedGroup

	@ManyToOne(
		() => SpecialityProfession,
		(SpecialityProfession) => SpecialityProfession.vacancies,
		{ eager: true }
	)
	@JoinColumn({ name: 'speciality_profession_id' })
	specialityProfession: SpecialityProfession

	@OneToMany(() => JobPosting, (job) => job.vacancy)
	jobPosting: JobPosting[]
}
