import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { ChatModule } from './chat/chat.module'
import { MessageModule } from './message/message.module'
import { LoggerModule } from './common/middleware/logger.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.number().required(),
				DB_USER: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_DB: Joi.string().required(),
				PORT: Joi.number()
			})
		}),
		DatabaseModule,
		UsersModule,
		AuthModule,
		ChatModule,
		MessageModule,
		LoggerModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	]
})
export class AppModule {}
