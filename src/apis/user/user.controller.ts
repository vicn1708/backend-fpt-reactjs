import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { Authorize } from 'src/decorators/authorize.decorator';
import { RoleUser } from 'src/constants/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/models/entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    type: [OmitType(Users, ['refreshToken'])],
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({
    type: OmitType(Users, ['refreshToken']),
  })
  @UseGuards(AuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @ApiResponse({
    schema: {
      example: {
        message: 'Deleted successfully',
        data: {},
      },
    },
  })
  @Authorize(RoleUser.ADMIN)
  @Delete('delete/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteOne(userId);
  }

  @ApiResponse({
    schema: {
      example: {
        message: 'Updated successfully',
        data: {},
      },
    },
  })
  @Authorize(RoleUser.ADMIN)
  @Patch('update/:userId')
  updateUser(@Param('userId') userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updateOne(userId, body);
  }
}
