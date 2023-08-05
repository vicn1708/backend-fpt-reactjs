import { Controller, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: OmitType(UpdateUserDto, ['enterPassword']),
  })
  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() dataUser: Omit<UpdateUserDto, 'enterPassword'>,
  ) {
    return this.userService.updateOne(userId, dataUser);
  }
}
