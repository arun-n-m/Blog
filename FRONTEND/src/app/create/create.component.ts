import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private apiservices: ApiService, private fb: FormBuilder) { }
  formdata = new FormData()
  creationForm = {
    title: '',
    image: '',
    content: '',
    category: '',
  }

  upload(event: any) {
    this.formdata.delete("blog_image")
    const file = event.target.files[0]
    this.formdata.append("blog_image", file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let img: any = reader.result
      this.creationForm.image = img
    }
  }
  categorys = [{ id: 1, value: "news" }, { id: 2, value: "food" }, { id: 3, value: "movie" },
  { id: 4, value: "sports" }, { id: 5, value: "game" }, { id: 6, value: "anime" }]
  selectBox(data: any) {
    this.creationForm.category = data.value
  }
  onSubmit() {
    this.formdata.append("title", this.creationForm.title);
    this.formdata.append("content", this.creationForm.content);
    this.formdata.append("category", this.creationForm.category)
    console.log("myform", this.creationForm);

    this.apiservices.postCreation(this.formdata).subscribe((data: any) => {
      console.log("res.data", data);

    })
    window.location.reload()
  }
}
