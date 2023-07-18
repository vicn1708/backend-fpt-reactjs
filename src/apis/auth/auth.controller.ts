import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { AuthGoogleGuard } from 'src/guards/auth-google.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { Users } from 'src/models/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiResponse({
    type: AuthTokenDto,
    description: 'Send token via header',
  })
  @UseGuards(AuthGoogleGuard)
  @Get('google/login')
  async verifyCodeGoogleLogin(@Request() req): Promise<AuthTokenDto> {
    return await this.authService.loginGoogle(req.user);
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
