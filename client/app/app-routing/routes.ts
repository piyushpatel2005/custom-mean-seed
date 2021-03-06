import { ErrorComponent } from './../error/error.component';
import { HomeComponent } from './../home/home.component';
import { AboutusComponent } from './../aboutus/aboutus.component';
import { SigninComponent } from './../signin/signin.component';
import { SignupComponent } from './../signup/signup.component';

import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: '', component: HomeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '/error' }
    
];

