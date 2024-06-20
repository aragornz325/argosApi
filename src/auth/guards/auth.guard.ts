import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from 'constant/key-decorators';
import { UserService } from 'user/service/user.service';
import { useToken } from 'utils/use.token';
import { IUseToken } from '../interfaces/auth.interfaces';
import { UsersEntity } from 'user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY, 
      context.getHandler()
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired, please login again');
    }

    const { sub } = manageToken;
    const user: UsersEntity = await this.userService.getUserById(sub);  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.idUser = user.id;
    req.role = user.role;
    return true;
  }
}

