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
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingProvider,
  ) {}

  async loginGoogle(token: string): Promise<AuthTokenDto> {
    const userInfo: any = this.jwtService.decode(token);

    if (!userInfo)
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

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
        true,
        user.refreshToken,
      );

      return token;
    } else {
      const password = this.hashingService.hashing(userInfo.sub);

      const payload: CreateUserDto = {
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

      const token = await this.createToken(
        {
          name: payload.name,
          email: payload.email,
          role: payload.role,
        },
        true,
      );

      payload.refreshToken = token.refreshToken;

      await userRepository.create(payload);

      return token;
    }
  }

  async createToken(
    payload: any,
    returnRefresh: boolean,
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

        if (returnRefresh) {
          return {
            accessToken,
            refreshToken,
          };
        } else {
          return {
            accessToken,
          };
        }
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

    if (returnRefresh) {
      return { accessToken, refreshToken };
    } else {
      return { accessToken };
    }
  }

  async refreshToken(token: string) {
    try {
      const isToken = await this.jwtService.verifyAsync(token, {
        secret: appSetting.jwt.secret,
      });

      const payload = {
        name: isToken.name,
        email: isToken.email,
        role: isToken.role,
      };

      const accessToken = await this.createToken(payload, false);

      return accessToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
