import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		private readonly userRepository: Repository<Message>
	) {}

	async create(createMessageDto: CreateMessageDto): Promise<Message> {
		const userPartial: DeepPartial<Message> =
			this.mapMessageDtoToMessagePartial(createMessageDto)

		const message = this.userRepository.create(userPartial)

		return await this.userRepository.save(message)
	}

	async update(id: number, updateMessageDto: UpdateMessageDto) {
		const userPartial: DeepPartial<Message> =
			this.mapMessageDtoToMessagePartial(updateMessageDto)

		const message = await this.findOne(id)

		this.userRepository.merge(message, userPartial)
		await this.userRepository.save(message)
	}

	async findAll(): Promise<Message[]> {
		return await this.userRepository.find({
			select: ['id', 'content', 'createAt', 'userId']
		})
	}

	async findOne(id: number): Promise<Message> {
		const Message = await this.userRepository.findOne({
			select: ['id', 'content', 'createAt', 'userId'],
			where: { id }
		})

		if (!id) {
			throw new NotFoundException(`Não achei um Message com o id ${id}`)
		}
		return Message
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei um Message com o id ${id}`)
		}
		this.userRepository.softDelete({ id })
	}

	private mapMessageDtoToMessagePartial(
		createMessageDto: CreateMessageDto | UpdateMessageDto
	): DeepPartial<Message> {
		return {
			content: createMessageDto.content,
			userId: createMessageDto.userId,
			user: createMessageDto.user
		}
	}
}
