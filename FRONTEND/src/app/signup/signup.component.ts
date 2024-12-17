import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private apiservices: ApiService, private router: Router,) { }

  signup_img = "profile.jpg"
  error_msg = ""

  fb = new FormBuilder()
  signup = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  })


  formdata = new FormData()
  upload(event: any) {
    this.formdata.delete("profile")
    const file = event.target.files[0]
    this.formdata.append("profile", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let profile: any = reader.result
      this.signup_img = profile
    }
  }

  onSignup() {
    let username: any
    let email: any
    let password: any
    
    username = this.signup.value.username;
    email = this.signup.value.email;
    password = this.signup.value.password;
    this.formdata.append("username", username);
    this.formdata.append("email", email)
    this.formdata.append("password", password)
    
    this.apiservices.postSignup(this.formdata).subscribe((data: any) => {
      console.log("sendingdata", data);
      if (data.msg == "success") {
        this.router.navigateByUrl("/")
      }
      else if(data.msg!="success") {
       
      alert(this.error_msg=data.msg)
      }

    })
  }

  loginClick() {
    this.router.navigateByUrl("/")
  }

}
