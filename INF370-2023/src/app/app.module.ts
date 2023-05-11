import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Angular Material/Material';
import { AdminHomeComponent } from './Administrator/Admin-Home/admin-home/admin-home.component';
import { ViewEmployeeComponent } from './Administrator/Employees/View-Employee/view-employee/view-employee.component';
import { SudentHomeComponent } from './Student Portal/Student-Home/sudent-home/sudent-home.component';
import { HomePageComponent } from './Home Page/home-page/home-page.component';
import { ViewAllCoursesComponent } from './Student Portal/Courses/view-all-courses/view-all-courses.component';
import { CustomModule } from './Angular Material/custom.module';
import { ViewDepartmentComponent } from './Administrator/Department/view-department/view-department/view-department.component';
import { ReadDepartmentComponent } from './Administrator/Department/read-department/read-department/read-department.component';
import { MaintainDepartmentComponent } from './Administrator/Department/maintain-department/maintain-department/maintain-department.component';
import { AddDepartmentComponent } from './Administrator/Department/add-department/add-department/add-department.component';
import { InputDialogComponent } from './Dialog/input-dialog/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from './Dialog/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { ExistsDialogComponent } from './Dialog/exists-dialog/exists-dialog/exists-dialog.component';
import { SearchDialogComponent } from './Dialog/search-dialog/search-dialog/search-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AddQualificationComponent } from './Administrator/Qualification/add-qualification/add-qualification/add-qualification.component';
import { MaintainQualificationComponent } from './Administrator/Qualification/maintain-qualification/maintain-qualification/maintain-qualification.component';
import { ReadQualificationComponent } from './Administrator/Qualification/read-qualification/read-qualification/read-qualification.component';
import { ViewQualificationComponent } from './Administrator/Qualification/view-qualification/view-qualification/view-qualification.component';
import { AddSkillComponent } from './Administrator/Skill/add-skill/add-skill/add-skill.component';
import { MaintainSkillComponent } from './Administrator/Skill/maintain-skill/maintain-skill/maintain-skill.component';
import { ReadSkillComponent } from './Administrator/Skill/read-skill/read-skill/read-skill.component';
import { ViewSkillComponent } from './Administrator/Skill/view-skill/view-skill/view-skill.component';
import { AddSkillTypeComponent } from './Administrator/Skill Type/add-skill-type/add-skill-type/add-skill-type.component';
import { MaintainSkillTypeComponent } from './Administrator/Skill Type/maintain-skill-type/maintain-skill-type/maintain-skill-type.component';
import { ReadSkillTypeComponent } from './Administrator/Skill Type/read-skill-type/read-skill-type/read-skill-type.component';
import { ViewSkillTypeComponent } from './Administrator/Skill Type/view-skill-type/view-skill-type/view-skill-type.component';
import { AddFaqComponent } from './Administrator/FAQ/add-faq/add-faq/add-faq.component';
import { MaintainFaqComponent } from './Administrator/FAQ/maintain-faq/maintain-faq/maintain-faq.component';
import { ReadFaqComponent } from './Administrator/FAQ/read-faq/read-faq/read-faq.component';
import { ViewFaqComponent } from './Administrator/FAQ/view-faq/view-faq/view-faq.component';
import { MaintainUserRoleComponent } from './Administrator/UserRole/maintain-UserRole/maintain-user-role/maintain-user-role.component';
import { ReadUserRoleComponent } from './Administrator/UserRole/read-UserRole/read-user-role/read-user-role.component';
import { ViewUserRoleComponent } from './Administrator/UserRole/view-UserRole/view-user-role/view-user-role.component';
import { AddTrainingVideoComponent } from './Administrator/Training Videos/add-training-video/add-training-video/add-training-video.component';
import { MaintainTrainingVideoComponent } from './Administrator/Training Videos/maintain-training-video/maintain-training-video/maintain-training-video.component';
import { ReadTrainingVideoComponent } from './Administrator/Training Videos/read-training-video/read-training-video/read-training-video.component';
import { VimeoUrlPipe } from './vimeo.pipe';
import { VideoPipePipe } from './searchvideo.pipe';
import { ReadEmployeeComponent } from './Administrator/Employees/read-employee/read-employee/read-employee.component';
import { MaintainEmployeeComponent } from './Administrator/Employees/maintain-employee/maintain-employee/maintain-employee.component';
import { AddEmployeeComponent } from './Administrator/Employees/add-employee/add-employee/add-employee.component';
import { ViewSelectedEmployeeComponent } from './Administrator/Employees/view-selected-employee/view-selected-employee/view-selected-employee.component';
import { AddPriorityComponent } from './Administrator/Maintenance Priority/add-maintenance-priority/add-priority/add-priority.component';
import { MaintainPriorityComponent } from './Administrator/Maintenance Priority/maintain-priority/maintain-priority/maintain-priority.component';
import { ReadPriorityComponent } from './Administrator/Maintenance Priority/read-priority/read-priority/read-priority.component';
import { AddMaintenanceTypeComponent } from './Administrator/Maintenance Type/add-type/add-maintenance-type/add-maintenance-type.component';
import { MaintainMaintenanceTypeComponent } from './Administrator/Maintenance Type/maintain-type/maintain-maintenance-type/maintain-maintenance-type.component';
import { ReadMaintenanceTypesComponent } from './Administrator/Maintenance Type/read-types/read-maintenance-types/read-maintenance-types.component';
import { ReActivateUsersComponent } from './Administrator/Deactivated Users/Re-activate User/re-activate-users/re-activate-users.component';
import { AddCategoryComponent } from './Administrator/Course-Category/add-category/add-category/add-category.component';
import { MaintainCategoryComponent } from './Administrator/Course-Category/maintain-category/maintain-category/maintain-category.component';
import { ReadCategoryComponent } from './Administrator/Course-Category/read-category/read-category/read-category.component';
import { ViewCategoryComponent } from './Administrator/Course-Category/view-category/view-category/view-category.component';
//import { TermsAndConditionsComponent } from './Administrator/TermsAndConditions/terms-and-conditions/terms-and-conditions.component';
import { AddCourseComponent } from './Administrator/Courses/add-course/add-course/add-course.component';
import { MaintainCourseComponent } from './Administrator/Courses/maintain-course/maintain-course/maintain-course.component';
import { ReadCourseComponent } from './Administrator/Courses/read-course/read-course/read-course.component';
import { ViewCourseComponent } from './Administrator/Courses/view-course/view-course/view-course.component';
import { AddSectionComponent } from './Administrator/Sections/add-section/add-section/add-section.component';
import { MaintainSectionComponent } from './Administrator/Sections/maintain-section/maintain-section/maintain-section.component';
import { ReadSectionComponent } from './Administrator/Sections/read-sections/read-section/read-section.component';
import { ViewSectionComponent } from './Administrator/Sections/view-section/view-section/view-section.component';
import { AddLessonComponent } from './Administrator/Lessons/add-lesson/add-lesson/add-lesson.component';
import { MaintainLessonComponent } from './Administrator/Lessons/maintain-lesson/maintain-lesson/maintain-lesson.component';
import { ReadLessonsComponent } from './Administrator/Lessons/read-lessons/read-lessons/read-lessons.component';
import { ViewLessonComponent } from './Administrator/Lessons/view-lesson/view-lesson/view-lesson.component';
import { AddResourceComponent } from './Administrator/Lesson Resources/add-resource/add-resource/add-resource.component';
import { MaintainResourceComponent } from './Administrator/Lesson Resources/maintain-resource/maintain-resource/maintain-resource.component';
import { ReadResourcesComponent } from './Administrator/Lesson Resources/read-resources/read-resources/read-resources.component';
import { ViewResourceComponent } from './Administrator/Lesson Resources/view-resource/view-resource/view-resource.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EmployeeHomeComponent } from './Employee TA Portal/employee-home/employee-home.component';
import { ErrorAccessComponent } from './user/error access/error-access/error-access.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { AdminProfileUpdateComponent } from './update-profile/admin-profile-update/admin-profile-update/admin-profile-update.component';
import { EmployeeProfileUpdateComponent } from './update-profile/employee-profile-update/employee-profile-update/employee-profile-update.component';
import { StudentProfileUpdateComponent } from './update-profile/student-profile-update/student-profile-update/student-profile-update.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { EnterOtpComponent } from './enter-otp/enter-otp/enter-otp.component';
import { LogMaintenanceRequestComponent } from './user/maintenance-request/log-maintenance-request/log-maintenance-request.component';
import { ConfirmRequestComponent } from './Administrator/Maintenance/confirm-request/confirm-request/confirm-request.component';
import { MaintainRequestComponent } from './Administrator/Maintenance/maintain-request/maintain-request/maintain-request.component';
import { ReadRequestComponent } from './Administrator/Maintenance/read-request/read-request/read-request.component';
import { RequestUpdateComponent } from './Employee TA Portal/request-update/request-update/request-update.component';
import { MaintainUpdateRequestComponent } from './Administrator/update-request/maintain-update-request/maintain-update-request/maintain-update-request.component';
import { ReadUpdateRequestsComponent } from './Administrator/update-request/read-update-requests/read-update-requests/read-update-requests.component';
import { ReadTermsComponent } from './Administrator/TermsAndConditions/read-terms/read-terms.component';
import { MaintainTermsComponent } from './Administrator/TermsAndConditions/maintain-terms/maintain-terms/maintain-terms.component';
import { MaintainOTPComponent } from './Administrator/OTP/maintain-otp/maintain-otp/maintain-otp.component';
import { ReadOTPComponent } from './Administrator/OTP/read-otp/read-otp/read-otp.component';
import { AddVatComponent } from './Administrator/VAT/add-vat/add-vat/add-vat.component';
import { MaintainVATComponent } from './Administrator/VAT/maintain-vat/maintain-vat/maintain-vat.component';
import { ReadVATComponent } from './Administrator/VAT/read-vat/read-vat/read-vat.component';
import { ViewVATComponent } from './Administrator/VAT/view-vat/view-vat/view-vat.component';
//import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    ViewEmployeeComponent,
    SudentHomeComponent,
    HomePageComponent,
    ViewAllCoursesComponent,
   
    ViewDepartmentComponent,
    ReadDepartmentComponent,
    MaintainDepartmentComponent,
    AddDepartmentComponent,
    InputDialogComponent,
    ConfirmDialogComponent,
    ExistsDialogComponent,
    SearchDialogComponent,
    AddQualificationComponent,
    MaintainQualificationComponent,
    ReadQualificationComponent,
    ViewQualificationComponent,
    AddSkillComponent,
    MaintainSkillComponent,
    ReadSkillComponent,
    ViewSkillComponent,
    AddSkillTypeComponent,
    MaintainSkillTypeComponent,
    ReadSkillTypeComponent,
    ViewSkillTypeComponent,
    AddFaqComponent,
    MaintainFaqComponent,
    ReadFaqComponent,
    ViewFaqComponent,
    MaintainUserRoleComponent,
    ReadUserRoleComponent,
    ViewUserRoleComponent,
    AddTrainingVideoComponent,
    MaintainTrainingVideoComponent,
    ReadTrainingVideoComponent,
    VimeoUrlPipe,
    VideoPipePipe,
    ReadEmployeeComponent,
    MaintainEmployeeComponent,
    AddEmployeeComponent,
    ViewSelectedEmployeeComponent,
    AddPriorityComponent,
    MaintainPriorityComponent,
    ReadPriorityComponent,
    AddMaintenanceTypeComponent,
    MaintainMaintenanceTypeComponent,
    ReadMaintenanceTypesComponent,
    ReActivateUsersComponent,
    AddCategoryComponent,
    MaintainCategoryComponent,
    ReadCategoryComponent,
    ViewCategoryComponent,
    //TermsAndConditionsComponent,
    AddCourseComponent,
    MaintainCourseComponent,
    ReadCourseComponent,
    ViewCourseComponent,
    AddSectionComponent,
    MaintainSectionComponent,
    ReadSectionComponent,
    ViewSectionComponent,
    AddLessonComponent,
    MaintainLessonComponent,
    ReadLessonsComponent,
    ViewLessonComponent,
    AddResourceComponent,
    MaintainResourceComponent,
    ReadResourcesComponent,
    ViewResourceComponent,
    EmployeeHomeComponent,
    ErrorAccessComponent,
    LoginComponent,
    RegisterComponent,
    AdminProfileUpdateComponent,
    EmployeeProfileUpdateComponent,
    StudentProfileUpdateComponent,
    ResetPasswordComponent,
    EnterOtpComponent,
    LogMaintenanceRequestComponent,
    ConfirmRequestComponent,
    MaintainRequestComponent,
    ReadRequestComponent,
    RequestUpdateComponent,
    MaintainUpdateRequestComponent,
    ReadUpdateRequestsComponent,
    ReadTermsComponent,
    MaintainTermsComponent,
    MaintainOTPComponent,
    ReadOTPComponent,
    AddVatComponent,
    MaintainVATComponent,
    ReadVATComponent,
    ViewVATComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CustomModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    ToastrModule.forRoot(),
 //   ServiceWorkerModule.register('ngsw-worker.js', {
  //    enabled: environment,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
   //   registrationStrategy: 'registerWhenStable:30000'
  //  }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
