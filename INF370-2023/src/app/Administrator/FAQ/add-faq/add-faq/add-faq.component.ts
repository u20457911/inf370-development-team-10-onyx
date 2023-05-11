import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from 'src/app/Dialog/input-dialog/input-dialog/input-dialog.component';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';
import { FAQ } from 'src/app/Models/faq.model';
import { FAQService } from 'src/app/Services/faq.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  questionFormControl = new FormControl('', [Validators.required]);
  answerFormControl = new FormControl('', [Validators.required]);

faq!:FAQ;

  constructor(
    public router: Router,
    private location: Location,
    private dialog: MatDialog,
    private service: FAQService,
    public toastr: ToastrService,
    private titleservice: Title,
    private snack:MatSnackBar
  ) { this.titleservice.setTitle('Add FAQ');}

  ngOnInit(): void {
    this.refreshForm();
  }

  refreshForm() {
    this.faq = {
      ID: 0,
      Question: '',
      Answer: '',
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
      const title = 'Confirm New FAQ';
      const message = 'Are you sure you want to add the new FAQ?';
      this.showDialog(title, message);
    }
  }

  validateFormControls(): boolean {
    if (
      this.questionFormControl.hasError('required') == false &&
      this.answerFormControl.hasError('required') == false
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
        faqData: this.faq,
      }, //^captured department info here for validation
      height: '30vh',
      width: '50vw',
    });

    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.service.AddFAQ(this.faq).subscribe(
          (result:any) => {
            if(result.Status===200)
            {
              this.snack.open(
                'FAQ added successfully!',
                      'OK',
                      {
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                        duration: 3000,
                      });
                      this.router.navigate(['admin/read-faq']);
            }
            else if(result.Status===400)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'Error',
                    dialogMessage: 'Invalid data format, please correct',
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
                    dialogTitle: 'Error',
                    dialogMessage: 'FAQ Exists, please enterS a different FAQ',
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
                    dialogMessage: 'Internal server error, please try again',
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

}
