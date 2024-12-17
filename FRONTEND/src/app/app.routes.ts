import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BlogviewComponent } from './blogview/blogview.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { MyblogsComponent } from './myblogs/myblogs.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    {
        path: "home", component: NavbarComponent,
        children: [
            { path: "", component: HomeComponent },
            {path:"view/:id",component:BlogviewComponent},
            {path:"profile",component:ProfileComponent},
            {path:"create",component:CreateComponent},
            {path:"myblogs",component:MyblogsComponent}
            
        ]
    },

];
