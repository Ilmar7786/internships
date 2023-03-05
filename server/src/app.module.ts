import { Module } from '@nestjs/common'
import { AuthModule } from '@app/auth'
import { UsersModule } from '@app/users'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { VacanciesModule } from './vacancies/vacancies.module'
import { SpecialtiesModule } from './specialties/specialties.module'
import { JobPostingsModule } from './job-postings/job-postings.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (cfg: ConfigService) => ({
				type: 'postgres',
				host: cfg.get('PSQL_HOST', 'localhost'),
				port: cfg.get<number>('PSQL_PORT', 5432),
				username: cfg.get('PSQL_USERNAME'),
				password: cfg.get('PSQL_PASSWORD'),
				database: cfg.get('PSQL_DATABASE'),
				synchronize: true,
				autoLoadEntities: true,
				logging: 'all',
			}),
		}),
		UsersModule,
		AuthModule,
		VacanciesModule,
		SpecialtiesModule,
		JobPostingsModule,
	],
})
export class AppModule {}
