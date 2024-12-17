import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { DatePipe} from '@angular/common';
import { SlicePipe } from '../slice.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe,SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private apiservices:ApiService,private router:Router){}
  erorr_message=''
  all_Blogs:any
  ngOnInit(): void {
    this.apiservices.getHome().subscribe((data:any)=>{
       this.all_Blogs=data.data
      

         
   })
  }

  
  blogView(id: any) {
    console.log("viewwwwwwwwwwid",id);
    this.router.navigateByUrl(`/home/view/${id}`)
    
  }
}
