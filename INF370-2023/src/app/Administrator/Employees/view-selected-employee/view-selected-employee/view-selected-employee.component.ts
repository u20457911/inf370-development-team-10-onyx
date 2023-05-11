import { UserRoleService } from 'src/app/Services/user-role.service';
import { EmployeeDetails } from 'src/app/Models/employee-details.model';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from 'src/app/Dialog/input-dialog/input-dialog/input-dialog.component';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';
import { SearchDialogComponent } from 'src/app/Dialog/search-dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/app/Models/department.model';
import { DepartmentService } from 'src/app/Services/department.service';
import { Skill } from 'src/app/Models/skill.model';
import { UserRole } from 'src/app/Models/UserRole.model';
import { Titles } from 'src/app/Models/title.model';
import { TitleService } from 'src/app/Services/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-selected-employee',
  templateUrl: './view-selected-employee.component.html',
  styleUrls: ['./view-selected-employee.component.scss']
})
export class ViewSelectedEmployeeComponent implements OnInit {
  test!: EmployeeDetails;
  employeeList!: EmployeeDetails[];
  id: any;
  titleName!:string;
  deptName!: string;
  EmployeeSkillList!: any[];
  EmployeeQualificationList!: any[];
  roleName!: string;
  dataImage:any;

  constructor(
    public router: Router,
    private location: Location,
    private serviceD: DepartmentService,
    private service: EmployeeService,
    private serviceR: UserRoleService,
    private serviceT:TitleService,
    private dialog: MatDialog,
    private titleservice: Title,
    private snack:MatSnackBar
  ) { this.titleservice.setTitle('Employee');}

  ngOnInit(): void {

    this.test = JSON.parse( sessionStorage['employee'] );
    this.getDeptName();
    this.getEmployeeSkillList();
    this.getEmployeeQualificationList();
    this.getUserRole();
    this.getTitleName();
    this.dataImage = this.test.Employee.Image;
  }


  getDeptName(){
    this.serviceD.GetDepartmentID(this.test.Employee.DepartmentID).subscribe((result) =>{
      let data = result as Department;
      this.deptName = data.DepartmentName;
      console.log(this.deptName)
     });
  }

  getTitleName(){
    this.serviceT.GetTitleID(this.test.Employee.TitleID).subscribe((result)=>{
let data=result as Titles;
this.titleName = data.TitleName;
console.log(this.titleName)
    });
  }

  getEmployeeSkillList() {
    this.service.GetEmployeeSkills(this.test.Employee.EmployeeID).subscribe((result) => {
      this.EmployeeSkillList = result as any[];
      console.log(this.EmployeeSkillList)
    });
  }

  getEmployeeQualificationList() {
    this.service.GetEmployeeQualifications(this.test.Employee.EmployeeID).subscribe((result) => {
      this.EmployeeQualificationList = result as any[];
      console.log(this.EmployeeQualificationList)
    });
  }

  getUserRole(){
    this.serviceR.GetUserRoleID(this.test.Employee.UserRoleID).subscribe((result) => {
       let data = result as any;
       this.roleName = data.RoleName;
       console.log(this.roleName)
    });
  }

  onBack() {
    this.location.back();
  }

  onArrowBack() {
    this.location.back();
  }

  onEdit() {
    this.test;
    this.router.navigate(['admin/maintain-employee']);
  }

  onDelete() {
    this.id = this.test.Employee.EmployeeID;

    const title = 'Confirm Delete Employee ';
    const popupMessage = 'Employee was deleted successfully';
    const message = 'Are you sure you want to delete the Employee?';

    const dialogReference = this.dialog.open(
      ConfirmDialogComponent,
      {
        height: '27vh',
        width: '25vw',
        data: {
          dialogTitle: title,
          operation: 'delete',
          dialogMessage: message,
          dialogPopupMessage: popupMessage
        },
      }
    );
    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.service.DeleteEmployee(this.id).subscribe((res:any) => 
        {
          if(res.Status===200)
          {
            this.snack.open(
              'Employee deactivated successfully!',
                    'OK',
                    {
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom',
                      duration: 3000,
                    }
            );
            this.router.navigate(['admin/read-employees'])
          }
          else if(res.Status===404)
          {
            const dialogReference = this.dialog.open(ExistsDialogComponent, {
              data: {
                dialogTitle: 'Error',
                dialogMessage: 'This is the last activated administrator, please ensure there are a minimum of 2 admins.',
                operation: 'ok',
              },
              width: '25vw',
            });
          }
          else if(res.Status===400)
          {
            const dialogReference = this.dialog.open(ExistsDialogComponent, {
              data: {
                dialogTitle: 'Error',
                dialogMessage: 'Invalid data',
                operation: 'ok',
              },
              width: '25vw',
            });
          }
          else
          {
            const dialogReference = this.dialog.open(ExistsDialogComponent, {
              data: {
                dialogTitle: 'Error',
                dialogMessage: 'Internal server error, please try again',
                operation: 'ok',
              },
              width: '25vw',
            });
          }
        });
      }
    });
  }




}
