import { ApiProperty, OmitType } from '@nestjs/swagger';
import { RoleUser } from 'src/constants/role.enum';
import { StatusUser } from 'src/constants/status-user.enum';
import { Users } from 'src/models/entities/user.entity';

export class CreateUserDto extends OmitType(Users, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: RoleUser;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  status: StatusUser;

  @ApiProperty()
  refreshToken?: string;
}
