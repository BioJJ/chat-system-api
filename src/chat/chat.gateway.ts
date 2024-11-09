import { JwtService } from '@nestjs/jwt'
import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	WsResponse,
	OnGatewayConnection,
	OnGatewayDisconnect
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from 'src/message/dto/create-message.dto'
import { MessageService } from 'src/message/message.service'
import { UsersService } from 'src/users/users.service'

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server

	constructor(
		private readonly usersService: UsersService,
		private readonly messageService: MessageService,
		private readonly jwtService: JwtService
	) {}

	async handleConnection(client: Socket) {
		const token = client.handshake.auth.token
		try {
			const decoded = this.jwtService.verify(token)
			const user = await this.usersService.findOne(decoded.sub)
			if (user) {
				client['user'] = user
				console.log(`Client connected: ${client.id}, User: ${user.email}`)
			} else {
				client.disconnect()
			}
		} catch (error) {
			client.disconnect()
		}
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`)
	}

	@SubscribeMessage('sendMessage')
	async handleMessage(client: Socket, message: CreateMessageDto) {
		const savedMessage = await this.saveMessage(message)
		this.server.emit('messageReceived', savedMessage)
	}

	private async saveMessage(message: CreateMessageDto) {
		return await this.messageService.create(message)
	}
}
