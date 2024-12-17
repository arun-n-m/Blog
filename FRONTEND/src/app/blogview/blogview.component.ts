import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { SlicePipe } from '../slice.pipe';

@Component({
  selector: 'app-blogview',
  standalone: true,
  imports: [FormsModule,DatePipe,SlicePipe],
  templateUrl: './blogview.component.html',
  styleUrl: './blogview.component.css'
})
export class BlogviewComponent implements OnInit {
  constructor(private apiservices:ApiService, private router: Router, private aroute: ActivatedRoute) { }
  id: any;
  comment = "";
  likes_length = 0
  comment_length = 0
  liked:any
  error_msg: any;
  ngOnInit(): void {
    this.id = this.aroute.snapshot.params['id']
    this.apiservices.getBlogView(this.id).subscribe((data: any) => {
      console.log("res.blogview", data);
      this.blogview = data.data
      this.likes_length = this.blogview.likes.length
      this.comment_length = this.blogview.blog_comments.length
      this.liked=data.status
      this.error_msg = data.msg
    })
    
  }
  blogview: any;
 
 
  addComment(bid: any) {
    console.log("bid:", bid, "cmnt:", this.comment);
    this.apiservices.postComment(bid, { msg: this.comment }).subscribe((data: any) => {
      // console.log(data);
    })
    window.location.reload()
  }

  addReplay(cid: any, replay: any) {
    console.log("cid:", cid, "reply:", replay);
    this.apiservices.postReplay(cid, { replays: replay }).subscribe((data: any) => {
      // console.log(data);
    })
    window.location.reload()
  }

  addLike(id:any){
    this.apiservices.postLike(id).subscribe((data:any)=>{
      console.log(data);
      
    })
    window.location.reload()
  }
}
