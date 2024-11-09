import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { LoggerMiddleware } from './logger.middleware'
import { LoggerService } from './logger.service'

@Module({
	providers: [LoggerService]
})
export class LoggerModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware).forRoutes('*')
	}
}
