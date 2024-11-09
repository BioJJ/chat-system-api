import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from 'src/bases/dto/base.dto'
import { User } from 'src/users/entities/user.entity'

export class CreateMessageDto extends BaseDTO {
	@IsNotEmpty()
	@ApiProperty({
		example: 'oi, tudo bem?',
		description: `O content será utilizado para qualquer coisa que precise exibir informações da pessoa conectada.`
	})
	content: string

	@IsNotEmpty()
	@ApiProperty({
		example: 1,
		description: `O userId é necessario para identificar o usuario da mensagem.`
	})
	userId: number

	@IsNotEmpty()
	@ApiProperty({
		example: 'User',
		description: `usuario da mensagem.`
	})
	user: User
}
