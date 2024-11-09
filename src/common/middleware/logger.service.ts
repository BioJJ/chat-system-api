import { Injectable } from '@nestjs/common'
import pino from 'pino'

@Injectable()
export class LoggerService {
	private readonly loggerInstance = pino({
		level: 'info'
	})

	get logger(): pino.Logger {
		return this.loggerInstance
	}

	logInfo(message: string, additionalData?: any): void {
		this.logger.info({ message, additionalData })
	}

	logDebug(message: string, additionalData?: any): void {
		this.logger.debug({ message, additionalData })
	}

	logError(message: string, additionalData?: any): void {
		this.logger.error({ message, additionalData })
	}
}
