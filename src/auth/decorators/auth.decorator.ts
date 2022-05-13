import { Roles } from '@app/decorators/roles.decorator';
import { UserRole } from '@app/user/user.entity';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (roles?: UserRole[]): ReturnType<typeof applyDecorators> =>
	applyDecorators(
		roles ? (Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard)) : UseGuards(JwtAuthGuard),
	);
