import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe} from '@angular/common';
import { SlicePipe } from '../slice.pipe';

@Component({
  selector: 'app-myblogs',
  standalone: true,
  imports: [DatePipe,SlicePipe],
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css'
})
export class MyblogsComponent implements OnInit{

 constructor(private apiservices:ApiService,private router:Router){}
  erorr_message=''
  all_Blogs:any
  ngOnInit(): void {
    this.apiservices.getMyBlog().subscribe((data:any)=>{
       this.all_Blogs=data.data 
       this.erorr_message=data.msg    
   })
  }

  
  blogView(id: any) {
    console.log("viewwwwwwwwwwid",id);
    this.router.navigateByUrl(`/home/view/${id}`)
    
  }

}
