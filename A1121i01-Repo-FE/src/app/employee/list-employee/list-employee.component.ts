import { Component, OnInit } from '@angular/core';
import {IEmployee} from '../../model/employee/iemployee';
import {IPositionEmployee} from '../../model/employee/iposition-employee';
import {Router} from '@angular/router';
import {EmployeeServiceService} from '../../service/employee/employee-service.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employees: IEmployee[];
  employee: IEmployee;
  positionEmployees: IPositionEmployee[];
  positionEmployee: IPositionEmployee;

  totalPagination: Array<number>;
  page = 0;
  name: any;
  id: any;

  // setPage(i, event: any) {
  //   event.preventDefault();
  //   this.page = i * 5;
  //   this.getAllEmployeeWithPagination();
  // }


  constructor(private router: Router,
              private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe(employees => {
      this.employees = employees;
      console.log(this.employees);
      console.log('List employee success!');
    }, error => {
      console.log(error);
    });
  }

  // getAllEmployeeWithPagination() {
  //   this.employeeService.getAllEmployeeWithPagination(this.page).subscribe(
  //     (data) => {
  //       this.employees = data;
  //       console.log(data.length);
  //     });
  // }
  //
  // previous(event: any) {
  //   event.preventDefault();
  //   console.log(this.page);
  //   if (this.page <= 0) {
  //     this.page = 0;
  //     this.getAllEmployeeWithPagination();
  //   } else {
  //     this.page = this.page - 5;
  //     this.employeeService.getAllEmployeeWithPagination(this.page).subscribe((data: IEmployee[]) => {
  //       this.employees = data;
  //     });
  //   }
  // }
  // next(event: any) {
  //   event.preventDefault();
  //   this.page = this.page + 5;
  //   console.log(Math.round(this.totalPagination.length) * 5);
  //   if (this.page >= Math.round(this.totalPagination.length) * 5) {
  //     this.page = this.page - 5;
  //   }
  //   this.employeeService.getAllEmployeeWithPagination(this.page).subscribe((data: IEmployee[]) => {
  //     this.employees = data;
  //   });
  // }

  // sendEmployeeToDelete(employeeId: number, employeeName: string) {
  //   this.name = employeeName;
  //   this.id = employeeId;
  // }

  // previous($event: MouseEvent) {
  // }
}
