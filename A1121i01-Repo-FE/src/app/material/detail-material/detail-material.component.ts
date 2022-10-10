import {Component, OnInit} from '@angular/core';
import {IMaterial} from "../../model/material/imaterial";
import {MaterialServiceService} from "../../service/material/material-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.component.html',
  styleUrls: ['./detail-material.component.css']
})
export class DetailMaterialComponent implements OnInit {
  materials: IMaterial = {};
  id: number;
  materials2: IMaterial[] = [];


  constructor(private materialService: MaterialServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = Number(paramMap.get('id'));
      this.materialService.findMaterialById(this.id).subscribe(material => {
        this.materials = material;
      })
    })

    this.getTopMaterial();

  }

  getTopMaterial() {
    this.materialService.getTopNewMaterial().subscribe(data => {
      this.materials2 = data;
    })
  }


}
