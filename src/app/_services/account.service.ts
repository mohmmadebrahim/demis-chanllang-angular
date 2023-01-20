import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { ResponseModel } from "@app/_models/response.model";
import { VerifyEmail } from "@app/_models/verify.email";

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<ResponseModel<User>>(`${environment.apiUrl}/v1/users/auth/login`, { email, password })
            .pipe(map(response => {
                localStorage.setItem('user', JSON.stringify(response.body ?? null));
                this.userSubject.next(response.body ?? null);
                return response;
            }));
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/v1/users/auth/registration`, user);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }


    verificationEmail(verifyEmail: VerifyEmail) {
        return this.http.post<ResponseModel<User>>(`${environment.apiUrl}/v1/users/auth/verificationEmail`, verifyEmail)
            .pipe(map(response => {
                if (response.body?.isEmailVerified) {
                    localStorage.setItem('user', JSON.stringify(response.body ?? null));
                    this.userSubject.next(response.body ?? null);
                }
                return response;
            }));
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/v1/users/all`);
    }

}
