import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User | null | undefined;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) {
        this.user = this.accountService.userValue;
    }
    
    ngOnInit() {
        this.alertService.clear();
    }
}
