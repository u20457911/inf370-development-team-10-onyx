import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';
import { SearchDialogComponent } from 'src/app/Dialog/search-dialog/search-dialog/search-dialog.component';
import { InputDialogComponent } from 'src/app/Dialog/input-dialog/input-dialog/input-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Department } from 'src/app/Models/department.model';
import { DepartmentService } from 'src/app/Services/department.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  dialogMessage: string;
}

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);
  department!:Department;

  constructor(
    public router: Router,
    private location: Location,
    private dialog: MatDialog,
    private service: DepartmentService,
    public toastr: ToastrService,
    private _snack:MatSnackBar,
    private titleservice: Title
  ) { this.titleservice.setTitle('Departments');}

  ngOnInit(): void {
    this.refreshForm();
  }

  refreshForm() {
    this.department = {
      DepartmentID: 0,
      DepartmentName: '',
      DepartmentDescription:''
    };
  }

  onSubmit() {
    const isInvalid = this.validateFormControls();
    if (isInvalid == true) {
      this.dialog.open(InputDialogComponent, {
        data: {
          dialogTitle: "Input Error",
          dialogMessage: "Correct Errors"
        },
        width: '50vw',
        height: '30vh',
      });
    } else {
      const title = 'Confirm New Department';
      const message = 'Are you sure you want to add the new department?';
      this.showDialog(title, message);
    }
  }

  validateFormControls(): boolean {
    if (
      this.nameFormControl.hasError('required') == false &&
      this.descFormControl.hasError('required') == false
    )
    {return false}
    else
    {return true}
  }

  onArrowBack(): void {
    this.location.back();
  }

  onBack() {
    this.location.back();
  }

  showDialog(title: string, message: string): void {
    const dialogReference = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: title,
        dialogMessage: message,
        operation: 'add',
        departmentData: this.department,
      }, //^captured department info here for validation
      height: '30vh',
      width: '50vw',
    });

    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.service.AddDepartment(this.department).subscribe(
          (result:any) => {
            console.log(result);
            if(result.Status===200)
            {
              this._snack.open(
                'Department added successfully!',
                      'OK',
                      {
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        duration: 3000,
                      }
              );
              this.router.navigate(['admin/read-department']);
            }

            else if(result.Status===400)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Error',
                    dialogMessage: 'Invalid data request, please ensure data body is valid',
                    operation: 'ok',
                  },
                  width: '50vw',
                  height:'30vh'
                }
              );
            }

            else if(result.Status===401)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Error',
                    dialogMessage: 'Department Name exists in database, please enter a different name.',
                    operation: 'ok',
                  },
                  width: '50vw',
                  height:'30vh'
                }
              );
            }

            else
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Error',
                    dialogMessage: 'Can not establish connection. Please try again',
                    operation: 'ok',
                  },
                  width: '50vw',
                  height:'30vh'
                }
              );
            }

            
          }
        );
      }
    });
  }

}
