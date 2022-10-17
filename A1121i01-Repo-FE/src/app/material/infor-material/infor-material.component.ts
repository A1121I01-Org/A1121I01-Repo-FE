import { Component, OnInit } from '@angular/core';
import {MaterialServiceService} from '../../service/material/material-service.service';
import {IMaterial} from '../../model/material/imaterial';
import {ActivatedRoute} from '@angular/router';




@Component({
  selector: 'app-infor-material',
  templateUrl: './infor-material.component.html',
  styleUrls: ['./infor-material.component.css']
})
export class InforMaterialComponent implements OnInit {
  materialList: IMaterial[] = [];
  materials: IMaterial = {};
  id: number;
  thePageNumber = 1;
  thePageSize = 6;
  theTotalElements: number;
  itemPerPage = 1;
  keywordSearch: undefined;
  constructor(private materialService: MaterialServiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getListMaterial1();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = Number(paramMap.get('id'));
      this.materialService.findMaterialById(this.id).subscribe(material => {
        this.materials = material;
      });
    });
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
