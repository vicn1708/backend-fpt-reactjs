import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { RoleUser } from 'src/constants/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';

export const Authorize = (...args: RoleUser[]) => {
  return applyDecorators(Roles(...args), UseGuards(AuthGuard, RolesGuard));
};
