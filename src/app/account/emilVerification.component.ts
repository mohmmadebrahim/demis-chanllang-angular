import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'emilVerification.component.html' })
export class VerificationComponent implements OnInit {
    isVerified: boolean | undefined = false;
    verificationCode = "";
    uuid = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,

    ) { }

    ngOnInit() {
        setTimeout(() => {
            location.reload()
        }, 3500)
        this.route.queryParams.subscribe(params => {
            this.verificationCode = params['verificationCode'];
            this.uuid = params['uuid'];

            this.accountService.verificationEmail({ uuid: this.uuid, verificationCode: this.verificationCode })
                .pipe(first())
                .subscribe({
                    next: (data) => {
                        this.isVerified = data.body?.isEmailVerified
                        this.alertService.success(data.message ?? "")
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.isVerified = false;
                    }
                });
        });
    }
}