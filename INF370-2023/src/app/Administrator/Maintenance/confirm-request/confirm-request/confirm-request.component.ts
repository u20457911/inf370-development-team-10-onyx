import { SecurityService } from 'src/app/Services/security.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VERSION, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { Maintenance } from 'src/app/Models/maintenance.model';
import { MaintenanceService } from 'src/app/Services/maintenance.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExistsDialogComponent } from 'src/app/Dialog/exists-dialog/exists-dialog/exists-dialog.component';

@Component({
  selector: 'app-confirm-request',
  templateUrl: './confirm-request.component.html',
  styleUrls: ['./confirm-request.component.scss']
})
export class ConfirmRequestComponent implements OnInit {
  currentMaintenance: any;
  maintenanceList!: Maintenance[];
  maintainPriorityName!: string;
  maintainTypeName!: string;
  check: boolean = true;
  dataimage: any;

  constructor(
    public router: Router,
    private location: Location,
    private service: MaintenanceService,
    private dialog: MatDialog,
    private titleservice: Title,
    private security: SecurityService,
    private toastr: ToastrService,
    private snack:MatSnackBar
  ) { this.titleservice.setTitle('Maintenance'); }

  ngOnInit(): void {
    this.currentMaintenance = JSON.parse(sessionStorage['MaintenanceRequest']);
    this.dataimage = this.currentMaintenance.Image;
    this.maintainTypeName = this.currentMaintenance.MaintenanceType;
    this.maintainPriorityName = this.currentMaintenance.MaintenancePriority;
    //this.MaintainViewed();

    if(this.currentMaintenance.MaintenanceStatusID == 1 || this.currentMaintenance.MaintenanceStatusID == 2 )
    {
      this.check = true;
    }
    else{
      this.check = false;
    }

   

  }

  MaintainViewed(){
    if(this.currentMaintenance.MaintenanceStatusID == 1)
    {
      this.service.MaintenanceReviewed(this.currentMaintenance.MaintenanceID).subscribe((res:any) => {
        console.log(res);
        if(res.Status === 200)
        {
          this.snack.open(
            'Request reviewed, user will be notified shortly!',
                  'OK',
                  {
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    duration: 3000,
                  }
          );
        }
        else 
        {
          this.snack.open(
            'Internal server error',
                  'OK',
                  {
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    duration: 3000,
                  }
          );
        }
      })
    }
    else{
      console.log('nvm');
    }
  }
  onBack() {
    this.location.back();
  }


  onArrowBack() {
    this.location.back();
  }

  onSubmit() {
    const dialogReference = this.dialog.open(
      ConfirmDialogComponent,
      {
        height: '27vh',
        width: '30vw',
        data: {
          dialogTitle: 'Confirm maintenance request ',
          operation: 'add',
          dialogMessage: 'Are you sure you want to confirm the maintenance request?',
          dialogPopupMessage: 'Request confirmed successfully',
        },
      }
    );
    dialogReference.afterClosed().subscribe((result) => {
      if (result == true) {
        this.service.ConfirmMaintenanceRequest(this.currentMaintenance.MaintenanceID).subscribe((res:any) => {
        console.log(res);
        if(res.Status === 200)
        {
          this.snack.open(
            'Request resolved!',
                  'OK',
                  {
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    duration: 3000,
                  }
          );
          this.router.navigate(['admin/read-maintenance-requests']);
        }
        else
        {
          const dialogReference = this.dialog.open(
            ExistsDialogComponent,
            {
              data: {
                dialogTitle: 'Error',
                dialogMessage: 'Internal server error. Please try again',
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


  
}
