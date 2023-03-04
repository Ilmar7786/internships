import { PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from '@app/vacancies/dto/create-category.dto'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
