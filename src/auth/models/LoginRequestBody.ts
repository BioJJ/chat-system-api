import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestBody {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		example: 'email@email.com',
		description: `O e-mail é necessário para o login.`
	})
	email: string

	@IsNotEmpty()
	@ApiProperty({
		example: '123@abc',
		description: `É possível conectar com redes sociais sem uma senha, mas para login usando o e-mail diretamente é necessário informar uma senha.`
	})
	password: string
}
