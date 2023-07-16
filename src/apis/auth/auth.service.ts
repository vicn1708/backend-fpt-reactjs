import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { GoogleLoginDto } from './dtos/googleLogin.dto';
import { Users, userRepository } from 'src/models/entities/user.entity';
import { HashingProvider } from 'src/utils/hashing.provider';
import { StatusUser } from 'src/constants/status-user.enum';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { RoleUser } from 'src/constants/role.enum';
import appSetting from 'src/configs/appSetting';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingProvider,
  ) {}

  async loginGoogle(userInfo: GoogleLoginDto): Promise<AuthTokenDto> {
    if (!userInfo.email_verified)
      throw new HttpException('Email is not verified', HttpStatus.UNAUTHORIZED);

    const user: Users = await userRepository
      .find({
        field: 'email',
        value: userInfo.email,
      })
      .execute();

    if (user) {
      const token = this.createToken(
        {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        user.refreshToken,
      );

      return token;
    } else {
      const password = this.hashingService.hashing(userInfo.sub);

      const payload: Users = {
        name: userInfo.name,
        slug: String(
          _.concat(userInfo.given_name, '.', userInfo.family_name),
        ).replaceAll(',', ''),
        email: userInfo.email,
        password,
        avatar: userInfo.picture,
        status: StatusUser.ACTIVE,
        role: RoleUser.USER,
      };

      const token = await this.createToken({
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });

      payload.refreshToken = token.refreshToken;

      await userRepository.create(payload);

      return token;
    }
  }

  async createToken(
    payload: any,
    refresh_token?: string,
  ): Promise<AuthTokenDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: appSetting.jwt.secret,
      expiresIn: appSetting.jwt.exp,
    });

    if (refresh_token) {
      const checkRefreshToken = await this.jwtService.verifyAsync(
        refresh_token,
        {
          secret: appSetting.jwt.secret,
        },
      );

      if (!checkRefreshToken) {
        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: appSetting.jwt.secret,
          expiresIn: appSetting.jwt.expRefresh,
        });

        return {
          accessToken,
          refreshToken,
        };
      } else {
        return {
          accessToken,
          refreshToken: refresh_token,
        };
      }
    }

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: appSetting.jwt.secret,
      expiresIn: appSetting.jwt.expRefresh,
    });

    return { accessToken, refreshToken };
  }
}
