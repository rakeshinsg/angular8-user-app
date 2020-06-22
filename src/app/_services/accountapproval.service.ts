import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from 'http';
import {Account} from '@/domain/account.interface';

@Injectable({ providedIn: 'root' })
export class AccountApprovalService {
    constructor(private http: HttpClient) {
    }

    approveAccount(account : Account) {     
     return this.http.post(`${config.apiUrl}/updateAccount`, account, {responseType: 'text'});
    }           
}