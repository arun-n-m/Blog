import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
signup_img = "ajith.jpg"
constructor( private router: Router,) { }
logoClick(){
  this.router.navigateByUrl("/home")
}

open = "open"
pf_click = false
pfClicked() {
  this.pf_click = !this.pf_click
}
menu=false
menuopen="open-menu-wrap"
open_menu(){
this.menu=!this.menu
}

}
