import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function RequireAuth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}

export function RequireAdmin() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    UseGuards(
      class AdminGuard {
        canActivate(context: any): boolean {
          const request = context.switchToHttp().getRequest();
          if (request.user?.role !== 'ADMIN') {
            throw new Error('Admin access required');
          }
          return true;
        }
      },
    ),
  );
}

export function RequireModerator() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    UseGuards(
      class ModeratorGuard {
        canActivate(context: any): boolean {
          const request = context.switchToHttp().getRequest();
          if (request.user?.role !== 'MODERATOR' && request.user?.role !== 'ADMIN') {
            throw new Error('Moderator access required');
          }
          return true;
        }
      },
    ),
  );
}
