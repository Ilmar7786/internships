import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger'

import { AppModule } from './app.module'
import * as process from 'process'

async function bootstrap() {
	const logger = new Logger(bootstrap.name)

	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)

	const appPrefix = configService.get<string>('APP_GLOBAL_PREFIX', 'api')
	const appPort = configService.get<number>('APP_PORT', 3000)

	app.setGlobalPrefix(appPrefix)
	app.useGlobalPipes(new ValidationPipe())

	const swagPath = InitSwagger(app, appPrefix)

	await app.listen(appPort, async () => {
		logger.log(`Server run started on:  http://localhost:${appPort}`)
		logger.log(`Docs API:  http://localhost:${appPort}/${swagPath}`)
	})
}
bootstrap()

function InitSwagger(app: INestApplication, path: string): string {
	const swagPath = `${path}/swagger`

	const config = new DocumentBuilder()
		.setTitle('Сайт о стажировках для Центр-Инвест ')
		.setDescription('Описание API. Команда Some Developer')
		.setVersion(process.env.npm_package_version)
		.addBearerAuth()
		.build()

	const options: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
	}

	const document = SwaggerModule.createDocument(app, config, options)
	SwaggerModule.setup(swagPath, app, document)

	return swagPath
}
