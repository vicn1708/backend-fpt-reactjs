import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ImageModule } from './apis/image/image.module';
import { StorageModule } from './apis/storage/storage.module';
import { AlbumModule } from './apis/album/album.module';
import appSetting from './configs/appSetting';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    JwtModule.register({
      global: true,
      secret: appSetting.jwt.secret,
      signOptions: { expiresIn: appSetting.jwt.exp },
    }),
    UserModule,
    AuthModule,
    ImageModule,
    StorageModule,
    AlbumModule,
  ],
})
export class AppModule {}
