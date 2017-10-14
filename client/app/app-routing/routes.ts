import { HomeComponent } from './../home/home.component';
import { AboutusComponent } from './../aboutus/aboutus.component';
import { Routes } from '@angular/router';

import { SigninComponent } from './../signin/signin.component';
import { SignupComponent } from './../signup/signup.component';


export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'home', component: HomeComponent }
];

