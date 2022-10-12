import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../../model/customer/icustomer';
import {ImportServiceService} from '../../service/import/import-service.service';
import {IImport} from '../../model/iimport';
import {IEmployee} from '../../model/employee/iemployee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IMaterialType} from '../../model/material/imaterial-type';
import {IMaterial} from '../../model/material/imaterial';
import {IAccount} from '../../model/account/iaccount';

@Component({
  selector: 'app-import-manager',
  templateUrl: './import-manager.component.html',
  styleUrls: ['./import-manager.component.css']
})
export class ImportManagerComponent implements OnInit {
  importForm: FormGroup;
  importForm2: FormGroup;
  importForm3: FormGroup;
  checkForm = 1;
  importUpdateForm: FormGroup;
  checkProductForm = 1;
  checkCustomerForm = 1;
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
  importCreate: IImport = {
    importAccountId: {},
    importMaterialId: {}
  };
  materialCreate: IMaterial = {
    materialTypeId: {},
    materialCustomerId: {}
  };
  customerCreate: ICustomer = {
    customerTypeId: {}
  };


  totalPageList: number[] = [];

  page = 1;
  totalPages: number;

  constructor(
    private importService: ImportServiceService
  ) {
  }

  ngOnInit(): void {
    // this.onInsertCart();
    this.getCustomerList();
    this.getEmployeeList();
    this.getImportList();
    this.getImportListNotPagination();
    this.getMaterialTypeImportList();
    this.importForm = new FormGroup({
      importCode: new FormControl(null, [Validators.required]),
      importStartDate: new FormControl(null, [Validators.required]),
      importQuantity: new FormControl(null, [Validators.required]),
      importAccountId: new FormControl(null, [Validators.required]),
      importMaterialId: new FormControl(null, [Validators.required]),
      materialCustomerId: new FormControl(null, [Validators.required])
    });

    this.importForm2 = new FormGroup({
      importCode: new FormControl(null, [Validators.required]),
      importStartDate: new FormControl(null, [Validators.required]),
      importQuantity: new FormControl(null, [Validators.required]),
      importAccountId: new FormControl(null, [Validators.required]),
      importMaterialId: new FormControl(null, [Validators.required]),
      materialCode: new FormControl(null, [Validators.required]),
      materialName: new FormControl(null, [Validators.required]),
      materialPrice: new FormControl(null, [Validators.required]),
      materialExpiridate: new FormControl(null, [Validators.required]),
      materialUnit: new FormControl(null, [Validators.required]),
      materialTypeId: new FormControl(null, [Validators.required]),
      materialCustomerId: new FormControl(null, [Validators.required])
    });

    this.importForm3 = new FormGroup({
      importCode: new FormControl(null, [Validators.required]),
      importStartDate: new FormControl(null, [Validators.required]),
      importQuantity: new FormControl(null, [Validators.required]),
      importAccountId: new FormControl(null, [Validators.required]),
      importMaterialId: new FormControl(null, [Validators.required]),
      materialCode: new FormControl(null, [Validators.required]),
      materialName: new FormControl(null, [Validators.required]),
      materialPrice: new FormControl(null, [Validators.required]),
      materialExpiridate: new FormControl(null, [Validators.required]),
      materialUnit: new FormControl(null, [Validators.required]),
      materialTypeId: new FormControl(null, [Validators.required]),
      materialCustomerId: new FormControl(null, [Validators.required]),
      customerName: new FormControl(null, [Validators.required]),
      customerCode: new FormControl(null, [Validators.required]),
      customerAddress: new FormControl(null, [Validators.required]),
      customerPhone: new FormControl(null, [Validators.required]),
      customerEmail: new FormControl(null, [Validators.required])
    });

    this.importUpdateForm = new FormGroup({
      importCodeUpdate: new FormControl(null, [Validators.required]),
      importStartDateUpdate: new FormControl(null, [Validators.required]),
      importQuantityUpdate: new FormControl(null, [Validators.required]),
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

  getEmployeeList() {
    this.importService.findAllEmployeeImport().subscribe((data: IEmployee[]) => {
      this.employeeList = data;
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

  // ++++chuyển đổi form và khởi tạo form++++++++++
  changeProductForm(change: number) {
    this.checkProductForm = change;
    if (this.checkProductForm === 1) {
      this.importForm.reset();
      this.importForm2.reset();
      this.importForm3.reset();
      // this.importForm = new FormGroup({
      //   importCode: new FormControl(null, [Validators.required]),
      //   importStartDate: new FormControl(null, [Validators.required]),
      //   importQuantity: new FormControl(null, [Validators.required]),
      //   importAccountId: new FormControl(null, [Validators.required]),
      //   importMaterialId: new FormControl(null, [Validators.required]),
      //   materialCustomerId: new FormControl(null, [Validators.required])
      // });
      this.checkForm = 1;
      this.checkCustomerForm = 1;
      this.ngOnInit();
    }
    if (this.checkProductForm === 2 && this.checkCustomerForm === 1) {
      this.importForm.reset();
      this.importForm2.reset();
      this.importForm3.reset();
      this.checkForm = 2;
      this.ngOnInit();
      // this.importForm = new FormGroup({
      //   importCode: new FormControl(null, [Validators.required]),
      //   importStartDate: new FormControl(null, [Validators.required]),
      //   importQuantity: new FormControl(null, [Validators.required]),
      //   importAccountId: new FormControl(null, [Validators.required]),
      //   importMaterialId: new FormControl(null, [Validators.required]),
      //   materialCode: new FormControl(null, [Validators.required]),
      //   materialName: new FormControl(null, [Validators.required]),
      //   materialPrice: new FormControl(null, [Validators.required]),
      //   materialExpiridate: new FormControl(null, [Validators.required]),
      //   materialUnit: new FormControl(null, [Validators.required]),
      //   materialTypeId: new FormControl(null, [Validators.required]),
      //   materialCustomerId: new FormControl(null, [Validators.required])
      // });
    }
  }

  changeCustomerForm(change: number) {
    this.checkCustomerForm = change;
    if (this.checkCustomerForm === 2 && this.checkProductForm === 2) {
      this.importForm.reset();
      this.importForm2.reset();
      this.importForm3.reset();
      this.checkForm = 3;
      // this.importForm = new FormGroup({
      //   importCode: new FormControl(null, [Validators.required]),
      //   importStartDate: new FormControl(null, [Validators.required]),
      //   importQuantity: new FormControl(null, [Validators.required]),
      //   importAccountId: new FormControl(null, [Validators.required]),
      //   importMaterialId: new FormControl(null, [Validators.required]),
      //   materialCode: new FormControl(null, [Validators.required]),
      //   materialName: new FormControl(null, [Validators.required]),
      //   materialPrice: new FormControl(null, [Validators.required]),
      //   materialExpiridate: new FormControl(null, [Validators.required]),
      //   materialUnit: new FormControl(null, [Validators.required]),
      //   materialTypeId: new FormControl(null, [Validators.required]),
      //   materialCustomerId: new FormControl(null, [Validators.required]),
      //   customerName: new FormControl(null, [Validators.required]),
      //   customerCode: new FormControl(null, [Validators.required]),
      //   customerAddress: new FormControl(null, [Validators.required]),
      //   customerPhone: new FormControl(null, [Validators.required]),
      //   customerEmail: new FormControl(null, [Validators.required])
      // });
      this.ngOnInit();
    }
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
        alert('Xoá thành công');
      });
  }

// ++++++++++++++++++create+++++++++++++
  createImport() {
    // this.onInsertCart();

    if (this.checkCustomerForm === 2 && this.checkProductForm === 2) {
      this.customerCreate = {
        customerName: this.importForm.get('customerName').value,
        customerCode: this.importForm.get('customerCode').value,
        customerAddress: this.importForm.get('customerAddress').value,
        customerPhone: this.importForm.get('customerPhone').value,
        customerEmail: this.importForm.get('customerEmail').value,
        customerTypeId: {
          customerTypeId: 3,
          customerTypeName: 'nhà cung cấp',
          customerTypeFlag: false
        }
      };

      this.materialCreate = {
        materialCode: this.importForm.get('materialCode').value,
        materialName: this.importForm.get('materialName').value,
        materialQuantity: 0,
        materialPrice: this.importForm.get('materialPrice').value,
        materialExpiridate: this.importForm.get('materialExpiridate').value,
        materialUnit: this.importForm.get('materialUnit').value,
        materialTypeId: this.importForm.get('materialTypeId').value,
        materialCustomerId: this.customerCreate
      };

      this.importCreate = {
        importCode: this.importForm.get('importCode').value,
        importStartDate: this.importForm.get('importStartDate').value,
        importQuantity: this.importForm.get('importQuantity').value,
        importAccountId: this.importForm.get('importAccountId').value.employeeAccountId,
        importMaterialId: this.materialCreate
      };


      this.importService.createImport(this.importCreate).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.importForm.reset();
          this.page = 1;
          this.getImportList();
          this.getImportListNotPagination();
          alert('Thêm mới nhà cung cấp, vật tư nhập kho thành công');
        }
      );
    }

    if (this.checkProductForm === 2 && this.checkCustomerForm === 1) {
      this.materialCreate = {
        materialCode: this.importForm.get('materialCode').value,
        materialName: this.importForm.get('materialName').value,
        materialQuantity: 0,
        materialPrice: this.importForm.get('materialPrice').value,
        materialExpiridate: this.importForm.get('materialExpiridate').value,
        materialUnit: this.importForm.get('materialUnit').value,
        materialTypeId: this.importForm.get('materialTypeId').value,
        materialCustomerId: this.importForm.get('materialCustomerId').value
      };

      this.importCreate = {
        importCode: this.importForm.get('importCode').value,
        importStartDate: this.importForm.get('importStartDate').value,
        importQuantity: this.importForm.get('importQuantity').value,
        importAccountId: this.importForm.get('importAccountId').value.employeeAccountId,
        importMaterialId: this.materialCreate
      };


      this.importService.createImport(this.importCreate).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.importForm.reset();
          this.page = 1;
          this.getImportList();
          this.getImportListNotPagination();
          alert('Thêm mới vật tư nhập kho thành công');
        }
      );
    }

    if (this.checkProductForm === 1 && this.checkCustomerForm === 1) {
      this.importCreate = {
        importCode: this.importForm.get('importCode').value,
        importStartDate: this.importForm.get('importStartDate').value,
        importQuantity: this.importForm.get('importQuantity').value,
        importAccountId: this.importForm.get('importAccountId').value.employeeAccountId,
        importMaterialId: this.importForm.get('importMaterialId').value
      };

      this.importService.createImport(this.importCreate).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.importForm.reset();
          this.page = 1;
          this.getImportList();
          this.getImportListNotPagination();
          alert('Thêm mới số lượng vật tư nhập kho thành công');
        }
      );
    }
  }

  // +++++++++++Edit+++++++++++++
  compareFn(c1: IEmployee, c2: IAccount): boolean {
    return c1.employeeAccountId.accountId === c2.accountId;
  }

  showFormEdit(checkFormEdit: boolean, importId: number) {
    this.importForm.reset();
    this.importIdTemp = importId;
    this.checkFormEdit = checkFormEdit;
    this.importService.findImportById(importId).subscribe((data) => {
        this.importUpdateForm = new FormGroup({
          importCodeUpdate: new FormControl(data.importCode, [Validators.required]),
          importStartDateUpdate: new FormControl(data.importStartDate, [Validators.required]),
          importQuantityUpdate: new FormControl(data.importQuantity, [Validators.required]),
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
        this.importForm.reset();
        this.importUpdateForm.reset();
        this.getImportList();
        alert('cập nhật đơn hàng nhập kho thành công');
      }
    );
  }

  // ++++++++++++++PDF++++++++++++
  onInsertCart() {
    // this.cartService.insertCart(formCreate.value, this.listPayment).subscribe(
    //    (data: void) => {
    //      this.resetForm();
    //      this.listCartPayment = [];
    //      this.ngOnInit();
    //    },
    //    (error: HttpErrorResponse) => {
    //      alert(error.message);
    //    }
    //  );
    this.importService.findImportById(1).subscribe((data1) => {
      this.importService.getPdfImport(data1).subscribe(x => {
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
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
    });
  }

  createImport1() {

  }

  createImport2() {

  }

  createImport3() {

  }
}
