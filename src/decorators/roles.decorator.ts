import { SetMetadata } from '@nestjs/common';
import { RoleUser } from 'src/constants/role.enum';

export const ROLE_KEY = 'role';
export const Roles = (...roles: RoleUser[]) => SetMetadata(ROLE_KEY, roles);
