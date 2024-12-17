import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private apiservices: ApiService, private router: Router,) { }

  signup_img = ""
  error_msg = ""
loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onLogIn() {
    this.apiservices.postLogin(this.loginForm.value).subscribe((data: any) => {
      console.log("sending data", data);
      if (data.msg == "success") {
        this.router.navigateByUrl("/home")
      }
      else if (data.msg != "success") {
       alert( this.error_msg = data.msg)
      }
    })
  }

  SignUp() {
    this.router.navigateByUrl("/signup")
  }

}
