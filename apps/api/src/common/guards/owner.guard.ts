import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramUserId = request.params.userId;
    const queryUserId = request.query.userId;
    const bodyUserId = request.body?.userId;

    // Check if user is trying to access their own data
    const targetUserId = paramUserId || queryUserId || bodyUserId;

    if (targetUserId && user.id !== targetUserId && user.role !== 'ADMIN') {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
