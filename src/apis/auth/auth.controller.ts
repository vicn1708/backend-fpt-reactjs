import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userRegister: CreateUserDto) {
    return this.authService.register(userRegister);
  }

  @ApiBody({
    type: OmitType(CreateUserDto, ['enterPassword', 'avatar']),
  })
  @Post('login')
  login(@Body() userLogin: Omit<CreateUserDto, 'enterPassword'>) {
    return this.authService.login(userLogin);
  }
}
