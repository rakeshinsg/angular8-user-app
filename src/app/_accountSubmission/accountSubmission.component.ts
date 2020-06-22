import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Account} from '@/domain/account.interface';

import { AlertService, AuthenticationService } from '@/_services';
import { AccountSubmissionService } from '@/_services/accountSubmission.service';

@Component({ templateUrl: 'accountSubmission.component.html' })
export class AccountSubmissionComponent  {
    accountNo = '';
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private acccountSubmissionService: AccountSubmissionService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    onSubmit() {
        console.log('========================');
        this.acccountSubmissionService.createAccount(this.getAccount())
            .subscribe(
                data => {
                    console.log('data-----'+data);
                    this.alertService.success('Account Created successfully', true);                        
                    this.router.navigate(['/home']);                                     
                },
                error => {
                    this.alertService.error(error);                    
                });
    }

    getAccount() {
        let account  = {} as Account;
        account.accountNumber = this.accountNo;
        account.submittedBy = this.authenticationService.username;
        account.submittedDate = new Date();
        account.status = 'pending';
        console.log('========================'+account);
        return account;
    }
}
