import {Component, OnInit} from '@angular/core';
import {IMaterial} from '../../model/material/imaterial';
import {MaterialServiceService} from '../../service/material/material-service.service';

@Component({
    selector: 'app-list-material',
    templateUrl: './list-material.component.html',
    styleUrls: ['./list-material.component.css']
})
export class ListMaterialComponent implements OnInit {
    page = 1;
    size: number;
    totalItems: number;
    materialList: IMaterial[] = [];
    materialDelete: IMaterial;
    indexPage: number;
    searchVal: string;

    constructor(private materialService: MaterialServiceService) {
    }

    ngOnInit(): void {
        this.findAll(0, '');
    }

    findAll(page: number, search: string) {
        this.page = page;
        this.materialService.getAll(this.page - 1, search).subscribe(
            (data: any) => {
                console.log(data);
                this.materialList = data.content;
                this.size = data.size;
                this.totalItems = data.totalElements;
            }
        );
    }

    findMaterialDelete(id: number) {
        this.materialDelete = this.materialList.find(m => m.materialId === id); // di tim thang loi~ de xoa
    }

    delete() {
        this.materialService.delete(this.materialDelete.materialId).subscribe(
            next => {
                this.findAll(this.indexPage, '');
            }
        );
    }

    // previousPage() {
    //   if (this.indexPage === 0) { return; }
    //   this.indexPage--;
    //   this.findAll(this.indexPage, '');
    // }
    //
    // nextPage() {
    //   if (this.indexPage + 1 === this.totalPages) { return; }
    //   this.indexPage++;
    //   this.findAll(this.indexPage, '');
    // }

    search() {
        this.findAll(0, this.searchVal);
    }

    // getAllMaterial1(page: number) {
    //     this.page = page;
    //     this.materialService.getAllMaterial(this.page - 1).subscribe((data: any) => {
    //             console.log(data);
    //             this.materialList = data.content;
    //             this.size = data.size;
    //             this.totalItems = data.totalElements;
    //         }
    //     );
    // }
}
