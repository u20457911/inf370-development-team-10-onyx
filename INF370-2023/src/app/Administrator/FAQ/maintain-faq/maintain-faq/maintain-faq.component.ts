import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from 'src/app/Dialog/input-dialog/input-dialog/input-dialog.component';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';
import { SearchDialogComponent } from 'src/app/Dialog/search-dialog/search-dialog/search-dialog.component';
import { FAQ } from 'src/app/Models/faq.model';
import { FAQService } from 'src/app/Services/faq.service';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maintain-faq',
  templateUrl: './maintain-faq.component.html',
  styleUrls: ['./maintain-faq.component.scss']
})
export class MaintainFaqComponent implements OnInit {
  questionFormControl = new FormControl('', [Validators.required]);
  answerFormControl = new FormControl('', [Validators.required]);

  faq!: FAQ;
 faqlist!: FAQ[];
  public dataSource = new MatTableDataSource<FAQ>();

  constructor(
    public router: Router,
    private location: Location,
    private dialog: MatDialog,
    private service: FAQService,
    private titleservice: Title,
    public toastr: ToastrService,
    private snack: MatSnackBar
  ) { this.titleservice.setTitle('FAQ');}

  ngOnInit(): void {
    this.faq = JSON.parse( sessionStorage['faq'] );
  }

  onBack(): void {
    this.location.back();
  }

  refreshList() {
    this.service.GetFAQs().subscribe((result) => {
      this.dataSource.data = result as FAQ[];
    });
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
      const title = 'Confirm update FAQ';
      const message = 'Are you sure you want to save changes to the FAQ?';
      const popupMessage = 'FAQ changes successful!';
      this.showDialog(title, message, popupMessage);
    }
  }

  showDialog(title: string, message: string, popupMessage: string): void {
    const dialogReference = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: title,
        dialogMessage: message,
        dialogPopupMessage: popupMessage,
        operation: 'add',
        faqData: this.faq,
      }, //^captured department info here for validation
      height: '30vh',
      width: '50vw',
    });

    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.service
          .UpdateFAQ(this.faq.ID, this.faq)
          .subscribe((result:any) => {
            if (result.Status === 200 ) 
            {
                  this.snack.open('FAQ updated successfully', 'OK', {
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  duration: 3000,
                });
                this.router.navigate(['admin/read-faq'])
            }
            else if(result.Status===404)
            {
              const dialogReference = this.dialog.open(
                ExistsDialogComponent,
                {
                  data: {
                    dialogTitle: 'FAQ Exists',
                    dialogMessage: 'Enter a different question',
                    operation: 'ok',
                  },
                  width: '25vw',
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
          });
      }
    });
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

}
