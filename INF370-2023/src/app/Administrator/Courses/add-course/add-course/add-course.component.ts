import { Course } from 'src/app/Models/course.model';
import { CoursePrice } from 'src/app/Models/course.model';
import { EmployeeListForCourses } from 'src/app/Models/employee.model';
import { CourseService } from 'src/app/Services/course.service';
import { CourseCategoryService } from 'src/app/Services/course-category.service';
import { CourseCategory } from 'src/app/Models/CourseCategory.model';
import { CourseDetails } from 'src/app/Models/course-details.model';
import { Employee } from 'src/app/Models/employee.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from 'src/app/Dialog/input-dialog/input-dialog/input-dialog.component';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

nameFormControl = new FormControl('', [Validators.required]);
descriptionFormControl = new FormControl('', [Validators.required]);
imageFormControl = new FormControl('', [Validators.required]);
categoryFormControl = new FormControl('', [Validators.required]);
priceFormControl = new FormControl('', [Validators.required,Validators.required,Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?$')]);
assistantsFormControl = new FormControl('', [Validators.required]);
activeFormControl = new FormControl('',[Validators.required]);

course!: CourseDetails;
coursePrice!:CoursePrice;
SelectedCategoryID!: number;
SelectedActivityList!: any;
SelectedEmployees!:number[];
categoryList!:CourseCategory[];
employeeList!:EmployeeListForCourses[];
dataImage:any;

constructor(
  public router: Router,
  private location: Location,
  private titleservice: Title,
  private dialog: MatDialog,
  public toastr: ToastrService,
  private cService: CourseService,
  private catService: CourseCategoryService,
  private snack:MatSnackBar
) { this.titleservice.setTitle('Courses');}

  ngOnInit(): void {
    this.refreshForm();
    this.getCategoriesList();
    this.getEmployeesList();
  }

  getCategoriesList(){
    this.catService.GetCategories().subscribe((res)=>{
    console.log(res)
    this.categoryList = res as CourseCategory[];
    })
  }

  getEmployeesList(){
    this.cService.GetEmployeeList().subscribe((res)=>{
    this.employeeList = res as EmployeeListForCourses[];
     console.log(this.employeeList);
    })
  }

  refreshForm() {
    this.course = {
      CourseID: 0,
      Name: '',
      Description: '',
      Image: '',
      Active: '',
      Price:0,
      CourseAssistants:null,
      CategoryID:0
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
        width: '25vw',
        height: '27vh',
      });
    } else {
      const title = 'Confirm New Package';
      const message = 'Are you sure you want to add the new package?';
      this.showDialog(title, message);
    }
  }

  validateFormControls(): boolean {
    if (
      this.nameFormControl.hasError('required')== false &&
      this.descriptionFormControl.hasError('required')== false &&
      this.priceFormControl.hasError('pattern')==false &&
      this.priceFormControl.hasError('required')== false &&
      this.categoryFormControl.hasError('required')==false &&
      this.assistantsFormControl.hasError('required')==false &&
  this.activeFormControl.hasError('required')==false


    ){
      return false}
    else{return true}
  }

  onArrowBack(): void {
    this.location.back();
  }
  onBack() {
    this.router.navigate(['admin/read-courses']);
  }

  showDialog(title: string, message: string): void {
    const dialogReference = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: title,
        dialogMessage: message,
        operation: 'add',
      },
      height: '27vh',
      width: '25vw',
    });

    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.cService.AddCourse(this.course).subscribe(
          (result:any) => {
            console.log(result);
            if(result.Status===200)
            {
              this.snack.open(
                'Course added successfully!',
                      'OK',
                      {
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        duration: 3000,
                      }
              );
              this.router.navigate(['admin/read-courses']);
              this.refreshForm();
            }
            else if(result.Status===400)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Invalid data',
                    dialogMessage: 'Please ensure data is in proper format',
                    operation: 'ok',
                  },
                  width: '25vw',
                }
              );
            }
            else if(result.Status===401)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Price invalid',
                    dialogMessage: 'Ensure the price is rounded off to 2 decimal places with a "." seperating the whole number',
                    operation: 'ok',
                  },
                  width: '25vw',
                }
              );
            }
            else if(result.Status===404)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Course Name Exists',
                    dialogMessage: 'Enter a new course name',
                    operation: 'ok',
                  },
                  width: '25vw',
                }
              );
            }
            else{
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Error',
                    dialogMessage:'Internal server error, please try again',
                    operation: 'ok',
                  },
                  width: '25vw',
                }
              );
            }

          }
        );
      }
    });
  }

@ViewChild('fileInput') fileInput!: ElementRef;
fileAttr = ' ';

uploadFileEvt(imgFile: any) {
  if (imgFile.target.files && imgFile.target.files[0]) {
    this.fileAttr = '';
    Array.from(imgFile.target.files as FileList).forEach((file: File) => {
      this.fileAttr += file.name + ' - ';
    });

    // HTML5 FileReader API
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        let imgBase64Path = e.target.result;
        console.log(imgBase64Path);
        this.dataImage = imgBase64Path;
      };
    };
    reader.readAsDataURL(imgFile.target.files[0]);

  } else {
    this.fileAttr = 'Choose Image';
  }

  let imagesave = new FileReader();
  imagesave.readAsDataURL(imgFile.target.files[0]);
  imagesave.onload = () =>
    {
      let invalid:number = ((imagesave.result)!.toString()).indexOf(",");
      this.course.Image = (imagesave.result)!.slice(invalid+1);
    }
}
}
