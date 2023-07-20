import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { Users } from 'src/models/entities/user.entity';
import { TokenGoogle } from './dtos/googleLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: AuthTokenDto,
    description: 'Send token via header',
  })
  @Post('google/login')
  async verifyCodeGoogleLogin(
    @Body() { token }: TokenGoogle,
  ): Promise<AuthTokenDto> {
    return await this.authService.loginGoogle(token);
  }

  @ApiBearerAuth()
  @ApiResponse({
    type: OmitType(Users, [
      'avatar',
      'createdAt',
      'id',
      'password',
      'refreshToken',
      'slug',
      'updatedAt',
      'status',
    ]),
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('refresh/:token')
  refreshToken(@Param('token') token: string) {
    return this.authService.refreshToken(token);
  }
}
