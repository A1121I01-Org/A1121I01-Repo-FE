import { Component, OnInit } from '@angular/core';
import {MaterialServiceService} from '../../service/material/material-service.service';
import {IMaterial} from '../../model/material/imaterial';




@Component({
  selector: 'app-infor-material',
  templateUrl: './infor-material.component.html',
  styleUrls: ['./infor-material.component.css']
})
export class InforMaterialComponent implements OnInit {
  materialList: IMaterial[] = [];
  thePageNumber = 1;
  thePageSize = 9;
  theTotalElements: number;
  itemPerPage = 1;
  keywordSearch: undefined;
  constructor(private materialService: MaterialServiceService) {
  }

  ngOnInit(): void {
    this.getListMaterial1();
  }

  getListMaterial1() {
    if (this.keywordSearch !== undefined) {
      this.search(this.keywordSearch);
    } else {
      this.getListMaterial2();
    }
  }
  getListMaterial2() {
    this.materialService.getAllMaterial(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }
  processResult() {
    return (data) => {
      this.materialList = data.content; //
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
      this.processItemPerPage();
    };
  }

  processItemPerPage() {
    if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
      this.itemPerPage = this.theTotalElements;
    } else {
      this.itemPerPage = this.thePageNumber * this.thePageSize;
    }
  }

  search(value: string) {
    console.log(value);
    this.materialService.getAllMaterialSearch(this.thePageNumber - 1, this.thePageSize, value).subscribe(this.processResult());
  }
}
