import { UserRole } from '@app/user/user.entity';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]): CustomDecorator<string> => SetMetadata('roles', roles);
