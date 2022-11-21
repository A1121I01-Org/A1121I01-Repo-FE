import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-book-admin',
  templateUrl: './edit-book-admin.component.html',
  styleUrls: ['./edit-book-admin.component.css']
})
export class EditBookAdminComponent implements OnInit {

  setAvatar: number;
  upLoadImage: null;
  url = 'https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg';
  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(e) {
    this.setAvatar =  1;
    this.upLoadImage = e.target.files[0];
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        // this.form.controls.customerAvatar = event.target.result;
      };
    }
    console.log(this.url);
    // this.url = e.target.files[0];
  }

}
