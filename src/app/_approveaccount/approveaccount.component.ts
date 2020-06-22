import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Account} from '@/domain/account.interface';

import { AlertService, AuthenticationService } from '@/_services';
import { AccountSubmissionService } from '@/_services/accountSubmission.service';
import { ShowAccountService } from '@/_services/showaccount.service';
import { AccountApprovalService } from '@/_services/accountapproval.service';

@Component({ templateUrl: 'approveaccount.component.html' })
export class ApproveAccountComponent  {
    accountList: any[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private showacccountService: ShowAccountService,
        private accountApprovalService: AccountApprovalService
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
                        this.router.navigate(['/approve-account-component']);
                    }                                    
                },
                error => {
                    this.alertService.error(error);                    
                });
    }

    cancel(account : Account) {
        console.log('Approve account----'+account);  
        account.approvedBy = this.authenticationService.username;
        account.status = "Rejected";      
        this.accountApprovalService.approveAccount(account)
            .subscribe(
                data => {
                    console.log('data-----'+data);
                    this.alertService.success('Account is successfully Cencelled/Rejectd', true);                        
                    this.router.navigate(['/home']);                                     
                },
                error => {
                    this.alertService.error(error);                    
                });
    }

    approve(account : Account) {
        console.log('Cancel account----'+account);
        if(account.submittedBy == this.authenticationService.username) {
            this.alertService.success('You dont have permission to approve this account', true);                        
            this.router.navigate(['/home']);  
            return;                                  
        }
        account.approvedBy = this.authenticationService.username;
        account.status = "Approved";              
        this.accountApprovalService.approveAccount(account)
            .subscribe(
                data => {
                    console.log('data-----'+data);
                    this.alertService.success('Account is successfully Approved', true);                        
                    this.router.navigate(['/home']);                                     
                },
                error => {
                    this.alertService.error(error);                    
                });
    }
}
