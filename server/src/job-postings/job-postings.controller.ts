import { Controller, Get, Post, Body } from '@nestjs/common'
import { JobPostingsService } from './job-postings.service'
import { CreateJobPostingDto } from './dto/create-job-posting.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JobPosting } from '@app/job-postings/entities/job-posting.entity'

@ApiTags('Отклик вакансию')
@Controller('job-postings')
export class JobPostingsController {
	constructor(private readonly jobPostingsService: JobPostingsService) {}

	@ApiOperation({ summary: 'Откликнутся' })
	@ApiResponse({ status: 200, type: JobPosting })
	@Post()
	create(@Body() createJobPostingDto: CreateJobPostingDto) {
		return this.jobPostingsService.create(createJobPostingDto)
	}

	@ApiOperation({ summary: 'Список откликов' })
	@ApiResponse({ status: 200, type: [JobPosting] })
	@Get()
	findAll() {
		return this.jobPostingsService.findAll()
	}
}
