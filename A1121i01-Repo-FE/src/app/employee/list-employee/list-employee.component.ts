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
  listEmployeeNotPagination: IEmployee[];


  constructor(private router: Router,
              private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.getAllEmployeeWithPagination();
    this.getAllEmployee();
  }

  getAllEmployeeWithPagination() {
    this.employeeService.getAllEmployeeWithPagination(this.page).subscribe(
      (data) => {
        this.employees = data;
        console.log(data.length);
      });
  }

  previous(event: any) {
    event.preventDefault();
    console.log(this.page);
    if (this.page <= 0) {
      this.page = 0;
      this.getAllEmployeeWithPagination();
    } else {
      this.page = this.page - 5;
      this.employeeService.getAllEmployeeWithPagination(this.page).subscribe((data: IEmployee[]) => {
        this.employees = data;
      });
    }
  }

  next(event: any) {
    event.preventDefault();
    this.page = this.page + 5;
    console.log(Math.round(this.totalPagination.length) * 5);
    if (this.page >= Math.round(this.totalPagination.length) * 5) {
      this.page = this.page - 5;
    }
    this.employeeService.getAllEmployeeWithPagination(this.page).subscribe((data: IEmployee[]) => {
      this.employees = data;
    });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i * 5;
    this.getAllEmployeeWithPagination();
  }

  sendEmployeeToDelete(employeeId: number, employeeName: string) {
    this.name = employeeName;
    this.id = employeeId;
  }

  deleteEmployeeById(id: number) {
    this.employeeService.deleteEmployeeById(id).subscribe(
      () => {},
      () => {},
      () => {
        this.getAllEmployeeWithPagination();
      }
    );
  }
  private getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(
      (data) => {
        this.listEmployeeNotPagination = data;
        console.log(Math.round(this.listEmployeeNotPagination.length / 5));
        if ((this.listEmployeeNotPagination.length % 5) !== 0) {
          this.totalPagination = new Array((Math.round(this.listEmployeeNotPagination.length / 5)) + 1 );
        }
        console.log(data.length);
      });
  }
}
