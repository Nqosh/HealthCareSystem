import { BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule } from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AlertifyService } from './_services/alertify.service';
import { AppComponent } from './app.component';
import { AppointmentListResolver } from './_resolvers/appointment-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorInterceptorProvide } from './_services/error.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ListResolver } from './_resolvers/list.resolver';
import { ListsComponent } from './lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { PatientCreateComponent } from './members/patient-create/patient-create.component';
import { PatientDetailComponent } from './members/patient-detail/patient-detail.component';
import { PatientDetailResolver } from './_resolvers/patient-detail.resolver';
import { PatientEditComponent } from './members/patient-edit/patient-edit.component';
import { PatientEditResolver } from './_resolvers/patient-edit.resolver';
import { PatientListComponent } from './members/patient-list/patient-list.component';
import { PatientListResolver } from './_resolvers/patient-list-resolver';
import { PatientMemberCardComponent } from './members/patient-member-card/patient-member-card.component';
import { PatientService } from './_services/patient.service';
import { PhamarcyComponent } from './phamarcy/phamarcy.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import {TimeAgoPipe} from 'time-ago-pipe';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [		
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      PatientListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      TimeAgoPipe,
      MemberMessagesComponent,
      PhamarcyComponent,
      PatientMemberCardComponent,
      PatientDetailComponent,
      PatientEditComponent,
      PatientCreateComponent,
      AppointmentsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
        config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ['localhost:44390'],
           blacklistedRoutes: ['localhost:44390/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvide,
      AlertifyService,
      AuthGuard,
      PreventUnsavedChanges,
      UserService,
      PatientService,
      MemberDetailResolver,
      MemberListResolver,
      ListResolver,
      AppointmentListResolver,
      MemberEditResolver,
      MessagesResolver,
      PatientListResolver,
      PatientDetailResolver,
      PatientEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
