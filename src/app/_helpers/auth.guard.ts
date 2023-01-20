import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    nitUrl = "";
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user?.isEmailVerified) {
            return true;
        }
        if (!this.router.url.includes("/account/verificationEmail")) this.router.navigate(['/account/login']);
        return false;
    }
}