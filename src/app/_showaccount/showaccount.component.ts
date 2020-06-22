import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Account} from '@/domain/account.interface';

import { AlertService, AuthenticationService } from '@/_services';
import { AccountSubmissionService } from '@/_services/accountSubmission.service';
import { ShowAccountService } from '@/_services/showaccount.service';

@Component({ templateUrl: 'showaccount.component.html' })
export class ShowAccountComponent  {
    accountList: any[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private showacccountService: ShowAccountService
    ) {
        // redirect to home if already logged in
       this.onSubmit();
    }

    onSubmit() {
        console.log('========================');
        this.showacccountService.getAllAccount()
            .pipe(first())
            .subscribe(
                data => {
                    if(data  == null) {
                        this.router.navigate(['/login']);
                        this.alertService.error("Looks Like backend service is down");                        
                    }   else {
                        this.accountList = data;
                        this.router.navigate(['/show-account-component']);
                    }                                    
                },
                error => {
                    this.alertService.error(error);                    
                });
    }
}
