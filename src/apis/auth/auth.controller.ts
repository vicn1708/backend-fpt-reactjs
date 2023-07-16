import { Controller, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { AuthGoogleGuard } from 'src/guards/auth-google.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { Users } from 'src/models/entities/user.entity';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: AuthTokenDto,
  })
  @UseGuards(AuthGoogleGuard)
  @Get('google/login')
  async verifyCodeGoogleLogin(@Request() req): Promise<AuthTokenDto> {
    return await this.authService.loginGoogle(req.user);
  }

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
}
