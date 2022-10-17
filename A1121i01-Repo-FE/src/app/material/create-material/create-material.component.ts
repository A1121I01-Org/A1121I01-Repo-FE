import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMaterial} from "../../model/material/imaterial";
import {Router} from "@angular/router";
import {MaterialServiceService} from "../../service/material/material-service.service";
import {IMaterialType} from "../../model/material/imaterial-type";
import {ICustomer} from "../../model/customer/icustomer";

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materialForm: FormGroup;
  listDataCus: ICustomer[] = [];
  listDataType: IMaterialType[] = [];

  constructor(
    private materialService: MaterialServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getListCus();
    this.getListType();
    this.materialForm = new FormGroup({
      materialCode: new FormControl('', [Validators.required, Validators.pattern('MVT-\\d{3}')]),
      materialName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      materialPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      materialQuantity: new FormControl('', [Validators.required, Validators.min(1)]),
      materialExpiridate: new FormControl('', [Validators.required]),
      materialDescribe: new FormControl('', [Validators.required]),
      materialUnit: new FormControl('', [Validators.required]),
      materialTypeId: new FormControl('', [Validators.required]),
      materialCustomerId: new FormControl('', [Validators.required]),
    });
  }

  getListType() {
    this.materialService.getListTypeMaterial().subscribe((res: IMaterialType[]) => {
      console.log(res)
      this.listDataType = res;
    })
  }

  getListCus() {
    this.materialService.getListCustomer().subscribe((response: ICustomer[]) => {
      this.listDataCus = response;
      console.log(this.listDataCus);

    })
  }


  createMaterial() {
    console.log(this.materialForm.value)
    this.materialService.create(this.materialForm.value).subscribe(
      () => {
      },
      (error) => {
        if (error.status === 500) {
          this.router.navigateByUrl('/auth/access-denied');
        }
      }
      , () => {
        alert("thêm mới vật tư");
      }
    );
  }

  // showPreview(event: any) {
  //   this.upLoadImage = event.target.files[0];
  //
  // }
}
