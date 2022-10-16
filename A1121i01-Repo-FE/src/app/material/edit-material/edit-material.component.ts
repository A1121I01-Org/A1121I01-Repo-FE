import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IMaterial} from "../../model/material/imaterial";
import {IMaterialType} from "../../model/material/imaterial-type";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialServiceService} from "../../service/material/material-service.service";
import {ICustomer} from "../../model/customer/icustomer";


@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  formEdit = new FormGroup({});
  material: IMaterial;
  listDataCus:ICustomer[] =[];
  listDataType: IMaterialType[] =[];
  materialType: IMaterialType[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private materialService: MaterialServiceService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getListCus();
    this.getListType();
    this.initForm();
    // this.formEdit = this.formBuilder.group({
    //   materialCode: [],
    //   materialName: [],
    //   materialPrice: [],
    //   materialQuantity: [],
    //   materialExpiridate: [],
    //   materialUnit: [],
    //   materialImage: [],
    //   materialDescribe: [],
    //   materialTypeId: [],
    //   materialCustomerId: []
    // });
    // this.activatedRoute.paramMap.subscribe(
    //   (param) => {
    //     const id = param.get('id');
    //     this.materialService.findById(id).subscribe(
    //       data => {
    //         this.material = data;
    //         console.log(data);
    //         this.formEdit.setValue(this.material);
    //       });
    //   });

    this.activatedRoute.paramMap.subscribe(
      (param) => {
        const id = param.get('id');
        this.materialService.findById(id).subscribe(
          data => {
            this.material = data;
            console.log(data)
            console.log(this.material.materialTypeId)
            this.initForm(data);
          });
      });
  }
  initForm(data?:any){
    this.formEdit = this.formBuilder.group({
      materialId: new FormControl(data?data.materialId:[],[Validators.required]),
      materialCode: new FormControl(data?data.materialCode:[],[Validators.required,Validators.pattern('MVT-\\d{3}')]),
      materialName: new FormControl(data?data.materialName:[],[Validators.required]),
      materialPrice: new FormControl (data?data.materialPrice:[],[Validators.required,Validators.min(1)]),
      materialQuantity: new FormControl(data?data.materialQuantity:[],[Validators.required,Validators.min(1)]),
      materialExpiridate: new FormControl(data?data.materialExpiridate:[],[Validators.required]),
      materialUnit: new FormControl(data?data.materialUnit:[],[Validators.required]),
      materialImage: new FormControl(data?data.materialImage:[],[Validators.required]),
      materialDescribe:  new FormControl(data?data.materialDescribe:[],[Validators.required]),
      materialFlag:  new FormControl(data?data.materialFlag:[],[Validators.required]),
      materialTypeId: new FormControl(data?.materialTypeId,[Validators.required]),
      materialCustomerId: new FormControl(data?data.materialCustomerId:[],[Validators.required]),
    });
  }

  getListType(){
    this.materialService.getListTypeMaterial().subscribe((res: IMaterialType[])=> {
      console.log(res)
      this.listDataType = res;
    })
  }

  getListCus(){
    this.materialService.getListCustomer().subscribe((response: ICustomer[]) =>{
      this.listDataCus = response;
      console.log(this.listDataCus);

    })
  }

  compareFn(c1: IMaterialType, c2: IMaterialType): boolean {
    return c1 && c2 ? c1.materialTypeId === c2.materialTypeId : c1 === c2;
  }
  compareFn1(c1: ICustomer, c2: ICustomer): boolean {
    return c1 && c2 ? c1.customerId === c2.customerId : c1 === c2;
  }
  onSubmit() {
    if (this.formEdit.valid){
      this.materialService.update(this.formEdit.value).subscribe(
        () => {
          alert("chỉnh sửa thành công")
        }
      );
    }
  }
}
