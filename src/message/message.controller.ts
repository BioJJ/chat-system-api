import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import {
	ApiTags,
	ApiBody,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse
} from '@nestjs/swagger'
import { DefaultUnauthorizedResponse } from 'src/common/swagger/DefaultUnauthorizedResponse'
import { DefaultForbiddenResponse } from 'src/common/swagger/DefaultForbiddenResponse'
import { DefaultInternalServerErrorResponse } from 'src/common/swagger/DefaultInternalServerErrorResponse'

import { Message } from './entities/message.entity'

@Controller('message')
@ApiTags('message')
@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
@ApiForbiddenResponse(DefaultForbiddenResponse)
@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Post()
	@ApiBody({ type: CreateMessageDto })
	async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
		return await this.messageService.create(createMessageDto)
	}

	@Get()
	async findAll(): Promise<Message[]> {
		return await this.messageService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Message> {
		return await this.messageService.findOne(+id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateMessageDto: UpdateMessageDto
	): Promise<void> {
		return await this.messageService.update(+id, updateMessageDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.messageService.remove(+id)
	}
}
