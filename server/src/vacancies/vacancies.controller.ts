import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete, UseGuards, Request
} from "@nestjs/common";
import { VacanciesService } from './vacancies.service'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from '@app/vacancies/dto/create-category.dto'
import { UpdateCategoryDto } from '@app/vacancies/dto/update-category.dto'
import { CategoryResponseDao } from '@app/vacancies/dao/category-response.dao'
import { CreateVacancyDto } from '@app/vacancies/dto/create-vacancy.dto'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { UpdateVacancyDto } from '@app/vacancies/dto/update-vacancy.dto'
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";

@ApiTags('Вакансии')
@Controller('vacancies')
export class VacanciesController {
	constructor(private readonly vacancyService: VacanciesService) {}

	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Создать категорию' })
	@ApiResponse({ status: 200, type: CategoryResponseDao })
	// @UseGuards(JwtAuthGuard)
	@Post('category')
	postCategory(@Body() body: CreateCategoryDto) {
		return this.vacancyService.createCategory(body)
	}

	@ApiOperation({ summary: 'Список категорий' })
	@ApiResponse({ status: 200, type: [CategoryResponseDao] })
	@Get('category')
	getCategories() {
		return this.vacancyService.findAllCategory()
	}

	@ApiOperation({ summary: 'Редактировать категорию' })
	@ApiResponse({ status: 200, type: CategoryResponseDao })
	@ApiParam({ name: 'id', type: 'number' })
	@Patch('category/:id')
	editCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
		return this.vacancyService.updateCategory(+id, body)
	}

	@ApiOperation({ summary: 'Удалить категорию' })
	@ApiResponse({ status: 200, description: 'Успешно удалено' })
	@ApiParam({ name: 'id', type: 'number' })
	@Delete('category/:id')
	deleteCategory(@Param('id') id: string) {
		return this.vacancyService.removeCategory(+id)
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Создать вакансию' })
	@ApiResponse({ status: 200, type: Vacancy })
	@UseGuards(JwtAuthGuard)
	@Post('vacancy')
	postVacancies(@Body() body: CreateVacancyDto) {
		return this.vacancyService.createVacancy(body)
	}

	@ApiOperation({ summary: 'Список вакансий' })
	@ApiResponse({ status: 200, type: [Vacancy] })
	@Get('vacancy')
	getVacancies() {
		return this.vacancyService.findAllVacancy()
	}

	@ApiOperation({ summary: 'Получить вакансию' })
	@ApiResponse({ status: 200, type: Vacancy })
	@ApiParam({ name: 'id', type: 'number' })
	@Get('vacancy/:id')
	getOneVacancy(@Param('id') id: string) {
		return this.vacancyService.findOneVacancy(+id)
	}

	@ApiOperation({ summary: 'Рекомендованные вакансии' })
	@ApiResponse({ status: 200, type: Vacancy })
	@ApiParam({ name: 'id', type: 'number' })
	@Get('vacancy/recommendation')
	getRecommendationVacancy(@Request() req) {
		return this.vacancyService.recommendationsFindAllVacancy(req.user.id)
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Редактировать вакансию' })
	@ApiResponse({ status: 200, type: Vacancy })
	@ApiParam({ name: 'id', type: 'number' })
	@UseGuards(JwtAuthGuard)
	@Patch('vacancy/:id')
	editVacancy(@Param('id') id: string, @Body() body: UpdateVacancyDto) {
		return this.vacancyService.updateVacancy(+id, body)
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Удалить вакансию' })
	@ApiResponse({ status: 200, description: 'Успешно удалено' })
	@ApiParam({ name: 'id', type: 'number' })
	@UseGuards(JwtAuthGuard)
	@Delete('vacancy/:id')
	deleteVacancy(@Param('id') id: string) {
		return this.vacancyService.removeVacancy(+id)
	}
}
