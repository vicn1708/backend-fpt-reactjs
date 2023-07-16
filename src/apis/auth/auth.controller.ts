import { Controller, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGoogleGuard } from 'src/guards/auth-google.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGoogleGuard)
  @Get('google/login')
  async verifyCodeGoogleLogin(@Request() req) {
    return await this.authService.loginGoogle(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
