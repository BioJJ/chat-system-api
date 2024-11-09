import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { UsersModule } from 'src/users/users.module'
import { MessageModule } from 'src/message/message.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [UsersModule, MessageModule, JwtModule],
	providers: [ChatGateway]
})
export class ChatModule {}
