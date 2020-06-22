import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AccountSubmissionComponent } from './_accountSubmission';
import { ShowAccountComponent } from './_showaccount';
import { ApproveAccountComponent } from './_approveaccount';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent }, //
    { path: 'account-submission-component', component: AccountSubmissionComponent }, 
    { path: 'show-account-component', component: ShowAccountComponent }, 
    { path: 'approve-account-component', component: ApproveAccountComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);