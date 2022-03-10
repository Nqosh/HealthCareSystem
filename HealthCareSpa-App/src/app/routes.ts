import { AppointmentListResolver } from './_resolvers/appointment-list.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListResolver } from './_resolvers/list.resolver';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MessagesComponent } from './messages/messages.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { PatientCreateComponent } from './members/patient-create/patient-create.component';
import { PatientDetailComponent } from './members/patient-detail/patient-detail.component';
import { PatientDetailResolver } from './_resolvers/patient-detail.resolver';
import { PatientEditComponent } from './members/patient-edit/patient-edit.component';
import { PatientEditResolver } from './_resolvers/patient-edit.resolver';
import { PatientListComponent } from './members/patient-list/patient-list.component';
import { PatientListResolver } from './_resolvers/patient-list-resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            { path: 'patients', component: PatientListComponent, resolve: {patients: PatientListResolver}},
            { path: 'patients/:id', component: PatientDetailComponent, resolve: { patient: PatientDetailResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            { path: 'member/edit', component: MemberEditComponent,
            resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'patient/edit/:id', component: PatientEditComponent,
            resolve: { patient: PatientEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent, resolve:{messages: MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: {users: ListResolver}},
            { path: 'appointments', component: AppointmentsComponent, resolve: {appointments: AppointmentListResolver}},
            { path: 'patient/create', component: PatientCreateComponent}
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'},
];
