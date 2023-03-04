import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from '@nestjs/common'
import { VacanciesService } from './vacancies.service'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation, ApiQuery,
	ApiTags
} from "@nestjs/swagger";
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'

@ApiTags('Вакансии')
@Controller('vacancies')
export class VacanciesController {
	constructor(private readonly vacancyService: VacanciesService) {}

	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Создать' })
	@ApiCreatedResponse({ type: Vacancy })
	// @UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() dto: CreateVacancyDto) {
		return this.vacancyService.create(dto)
	}

	@ApiOperation({ summary: 'Список вакансий' })
	@ApiCreatedResponse({ type: Vacancy })
	@Get()
	findAll() {
		return this.vacancyService.findAll()
	}

	@ApiOperation({ summary: 'Получить' })
	@ApiCreatedResponse({ type: Vacancy })
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.vacancyService.findOne(+id)
	}

	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Обновить' })
	@ApiCreatedResponse({ type: Vacancy })
	// @UseGuards(JwtAuthGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
		return this.vacancyService.update(+id, updateVacancyDto)
	}

	// @ApiBearerAuth()
	@ApiOperation({ summary: 'Удалить' })
	@ApiCreatedResponse({ type: Vacancy })
	// @UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.vacancyService.remove(+id)
	}

	@ApiQuery({ name: 'q' })
	@ApiOperation({ summary: 'Поиск' })
	@ApiCreatedResponse({ type: [Vacancy] })
	@Get('search')
	search(@Query('q') query) {
		return this.vacancyService.remove(+query)
	}
}
