import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from '../../../model/customer/icustomer';
import {IEmployee} from '../../../model/employee/iemployee';
import {IImport} from '../../../model/iimport';
import {IMaterialType} from '../../../model/material/imaterial-type';
import {IMaterial} from '../../../model/material/imaterial';
import {IAccount} from '../../../model/account/iaccount';
import {ImportServiceService} from '../../../service/import/import-service.service';
import {NotifierService} from 'angular-notifier';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-import-material-form',
  templateUrl: './import-material-form.component.html',
  styleUrls: ['./import-material-form.component.css']
})
export class ImportMaterialFormComponent implements OnInit {
  importForm2: FormGroup;
  importUpdateForm: FormGroup;
  date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
  importListString: string[] = [];
  importExistCreate = '';
  importExistUpdate = '';
  checkFormEdit = false;
  customerList: ICustomer[] = [];
  employeeList: IEmployee[] = [];
  materialList: IMaterial[] = [];
  customerId: ICustomer = {};
  materialTypeList: IMaterialType[] = [];
  importList: IImport[] = [];
  importDelete: IImport = {};
  importBeforeUpdate: IImport = {
    importAccountId: {},
    importMaterialId: {}
  };
  importUpdate: IImport = {
    importAccountId: {},
    importMaterialId: {}
  };
  accountTempUpdateImport: IAccount = {};
  importIdTemp: number;
  importCreate: IImport = null;
  materialCreate: IMaterial = {
    materialTypeId: {},
    materialCustomerId: {}
  };
  totalPageList: number[] = [];

  page = 1;
  totalPages: number;

  constructor(private importService: ImportServiceService,
              private notification: NotifierService) {
  }

  ngOnInit(): void {
    this.notification.notify('default', 'Vui nhập thông tin nhập kho');
    this.getAllImportString();
    this.getCustomerList();
    this.getEmployeeList();
    this.getImportList();
    this.getImportListNotPagination();
    this.getMaterialTypeImportList();
    this.importForm2 = new FormGroup({
      importCode: new FormControl(null, [Validators.required, Validators.pattern('HDN-\\d{3}')]),
      importStartDate: new FormControl(this.date1, [Validators.required]),
      importQuantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      importAccountId: new FormControl(null, [Validators.required]),
      materialCode: new FormControl(null, [Validators.required]),
      materialName: new FormControl(null, [Validators.required]),
      materialPrice: new FormControl(null, [Validators.required]),
      materialExpiridate: new FormControl(null, [Validators.required]),
      materialUnit: new FormControl(null, [Validators.required]),
      materialTypeId: new FormControl(null, [Validators.required]),
      materialCustomerId: new FormControl(null, [Validators.required])
    });

    this.importUpdateForm = new FormGroup({
      importCodeUpdate: new FormControl(null, [Validators.required, Validators.pattern('HDN-\\d{3}')]),
      importStartDateUpdate: new FormControl(null, [Validators.required]),
      importQuantityUpdate: new FormControl(null, [Validators.required,  Validators.min(0)]),
      importAccountIdUpdate: new FormControl(null, [Validators.required]),
      importMaterialCodeUpdate: new FormControl(null, [Validators.required]),
      importMaterialNameUpdate: new FormControl(null, [Validators.required]),
      importMaterialUnitUpdate: new FormControl(null, [Validators.required])
    });
  }

  // +++++++++++++++lấy dữ liệu++++++++++++++++
  getCustomerList() {
    this.importService.findAllCustomerImport().subscribe((data: ICustomer[]) => {
      this.customerList = data;
      this.customerId = data[0];
    });
  }

  getAllImportString() {
    this.importService.findAllImportString().subscribe(data => {
      this.importListString = data;
    });
  }

  getEmployeeList() {
    this.importService.findAllEmployeeImport().subscribe((data: IEmployee[]) => {
      this.employeeList = data;
      console.log(data);
    });
  }

  getImportList() {
    this.importService.findAllImport((this.page * 5) - 5).subscribe((data: IImport[]) => {
      this.importList = data;
    });
  }

  getMaterialTypeImportList() {
    this.importService.findAllMaterialTypeImport().subscribe((data: IMaterialType[]) => {
      this.materialTypeList = data;
    });
  }

  getMaterialImportListByCustomerId() {
    this.importService.findAllMaterialImport(this.customerId.customerId).subscribe((data: IMaterial[]) => {
      this.materialList = data;
    });
  }

  showMaterialList(customerId: any) {
    this.customerId = customerId;
    this.getMaterialImportListByCustomerId();
  }

  // ++++++++++++phân trang+++++++++++
  getImportListNotPagination() {
    this.importService.findAllImportNotPagination().subscribe((data: IImport[]) => {
        this.totalPages = (Math.ceil(data.length / 5) + 1);

        this.totalPageList = [];
        for (let i = 1; i < this.totalPages; i++) {
          this.totalPageList.push(i);
        }
      }, () => {
      },
      () => {
        if (this.page >= this.totalPages) {
          this.page--;
        }
        this.getImportList();
      });
  }


  getPreviousPage() {
    this.page--;
    if (this.page >= this.totalPages) {
      this.page--;
    }
    this.importService.findAllImport((this.page * 5) - 5).subscribe((data: IImport[]) => {
      this.importList = data;
    });
  }

  getNextPage() {
    this.page++;
    if (this.page >= this.totalPages) {
      this.page--;
    }
    this.importService.findAllImport((this.page * 5) - 5).subscribe((data: IImport[]) => {
      this.importList = data;
    });
  }

  getNumberPage(pageNumber: number) {
    if (this.page >= this.totalPages) {
      this.page--;
    }
    this.page = pageNumber;
    this.importService.findAllImport((this.page * 5) - 5).subscribe((data: IImport[]) => {
      this.importList = data;
    });
  }

  // +++++++++++++xoá++++++++++++++
  showInfoImportDelete(importTable: IImport) {
    this.importDelete = importTable;
  }

  deleteImport(importId: number) {
    this.importService.deleteImport(importId).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.getImportList();
        this.getImportListNotPagination();
        this.notification.notify('success', 'Xoá lịch sử nhập kho thành công');
      });
  }

// +++++++++thêm mới__________
  createImport2() {
    this.materialCreate = {
      materialCode: this.importForm2.get('materialCode').value,
      materialName: this.importForm2.get('materialName').value,
      materialQuantity: 0,
      materialPrice: this.importForm2.get('materialPrice').value,
      materialExpiridate: this.importForm2.get('materialExpiridate').value,
      materialUnit: this.importForm2.get('materialUnit').value,
      materialTypeId: this.importForm2.get('materialTypeId').value,
      materialCustomerId: this.importForm2.get('materialCustomerId').value
    };

    this.importCreate = {
      importCode: this.importForm2.get('importCode').value,
      importStartDate: this.importForm2.get('importStartDate').value,
      importQuantity: this.importForm2.get('importQuantity').value,
      importAccountId: this.importForm2.get('importAccountId').value.employeeAccountId,
      importMaterialId: this.materialCreate
    };


    this.importService.createImport(this.importCreate).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.importForm2.reset();
        this.page = 1;
        this.getImportList();
        this.getImportListNotPagination();
        this.notification.notify('success', 'Thêm mới vật tư nhập kho thành công');
      }
    );
  }

  // ++++++++++++++PDF++++++++++++
  pdfImport() {
    this.importService.getPdfImport(this.importCreate).subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'invoice.pdf';
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  // +++++++++++Edit+++++++++++++
  compareFn(c1: IEmployee, c2: IAccount): boolean {
    return c1.employeeAccountId.accountId === c2.accountId;
  }

  close(b: boolean) {
    this.checkFormEdit = b;
  }

  showFormEdit(checkFormEdit: boolean, importId: number) {
    this.importForm2.reset();
    this.importIdTemp = importId;
    this.checkFormEdit = checkFormEdit;
    this.importService.findImportById(importId).subscribe((data) => {
        this.importUpdateForm = new FormGroup({
          importCodeUpdate: new FormControl(data.importCode, [Validators.required, Validators.pattern('HDN-\\d{3}')]),
          importStartDateUpdate: new FormControl(data.importStartDate, [Validators.required]),
          importQuantityUpdate: new FormControl(data.importQuantity, [Validators.required, Validators.min(0)]),
          importAccountIdUpdate: new FormControl(data.importAccountId, [Validators.required]),
          importMaterialCodeUpdate: new FormControl(data.importMaterialId.materialCode, [Validators.required]),
          importMaterialNameUpdate: new FormControl(data.importMaterialId.materialName, [Validators.required]),
          importMaterialUnitUpdate: new FormControl(data.importMaterialId.materialUnit, [Validators.required])
        });
        this.importBeforeUpdate = data;
      }
    );
  }

  updateImport() {
    if (this.importUpdateForm.get('importAccountIdUpdate').value.employeeAccountId !== undefined) {
      this.accountTempUpdateImport = this.importUpdateForm.get('importAccountIdUpdate').value.employeeAccountId;
    } else {
      this.accountTempUpdateImport = this.importBeforeUpdate.importAccountId;
    }
    this.checkFormEdit = false;
    this.importUpdate = {
      importId: this.importBeforeUpdate.importId,
      importCode: this.importUpdateForm.get('importCodeUpdate').value,
      importStartDate: this.importUpdateForm.get('importStartDateUpdate').value,
      importQuantity: this.importUpdateForm.get('importQuantityUpdate').value,
      importFlag: false,
      importAccountId: this.accountTempUpdateImport,
      importMaterialId: {
        materialId: this.importBeforeUpdate.importMaterialId.materialId,
        materialCode: this.importUpdateForm.get('importMaterialCodeUpdate').value,
        materialName: this.importUpdateForm.get('importMaterialNameUpdate').value,
        materialPrice: this.importBeforeUpdate.importMaterialId.materialPrice,
        materialQuantity: this.importBeforeUpdate.importMaterialId.materialQuantity,
        materialExpiridate: this.importBeforeUpdate.importMaterialId.materialExpiridate,
        materialImage: this.importBeforeUpdate.importMaterialId.materialImage,
        materialDescribe: this.importBeforeUpdate.importMaterialId.materialDescribe,
        materialFlag: false,
        materialUnit: this.importUpdateForm.get('importMaterialUnitUpdate').value,
        materialTypeId: this.importBeforeUpdate.importMaterialId.materialTypeId,
        materialCustomerId: this.importBeforeUpdate.importMaterialId.materialCustomerId
      }
    };
    console.log(this.importUpdate);
    this.importService.updateImport(this.importUpdate.importId, this.importUpdate).subscribe(
      () => {
      },
      () => {
      },
      () => {
        this.importForm2.reset();
        this.importUpdateForm.reset();
        this.getImportList();
        this.notification.notify('success', 'cập nhật đơn hàng nhập kho thành công');
      }
    );
  }

  checkImportCode(importString: any) {
    if (this.importListString.indexOf(importString.value) > -1) {
      this.importExistCreate = 'Mã nhập kho đã tồn tại';
    } else {
      this.importExistCreate = '';
    }
  }

  checkImportCodeUpdate(importString: any) {
    if (this.importListString.indexOf(importString.value) > -1 && importString.value !== this.importBeforeUpdate.importCode) {
      this.importExistUpdate = 'Mã nhập kho đã tồn tại';
    } else {
      this.importExistUpdate = '';
    }
  }
}
