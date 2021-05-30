import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        console.log('RolesGuard');
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        //TODO data from token
        const account = request.user.account;

        console.log(roles);
        console.log(account);

        const hasRole = () =>
            roles.some(role => !! (account.permissions.map(a => a.name).includes(role)))
        ||
        roles.some(role => role === 'guarantee' && account.guarantee.id !== undefined);

        return account && hasRole();
    }
}
