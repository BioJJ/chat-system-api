import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards
} from '@nestjs/common'
import {
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiTags
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { IsPublic } from './decorators/is-public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './models/AuthRequest'
import { DefaultForbiddenResponse } from 'src/common/swagger/DefaultForbiddenResponse'
import { DefaultInternalServerErrorResponse } from 'src/common/swagger/DefaultInternalServerErrorResponse'
import { LoginRequestBody } from './models/LoginRequestBody'

@Controller()
@ApiTags('Auth')
@ApiForbiddenResponse(DefaultForbiddenResponse)
@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiBody({ type: LoginRequestBody })
	async login(@Req() req: AuthRequest) {
		return await this.authService.login(req.user)
	}
}
