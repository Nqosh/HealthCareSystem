import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AlertifyService } from '../_services/alertify.service';
import { Appointment } from '../_models/Appointment';
import { AppointmentService } from '../_services/appointment.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppointmentListResolver  implements Resolve<Appointment[]> {

    pageNumber = 1;
    pageSize = 5;

    constructor(private appointmentService: AppointmentService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Appointment[]> {
        return this.appointmentService.getAppointments(this.pageNumber, this.pageSize).pipe(
            catchError(() => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/patients']);
                return of (null);
            })
        );
    }
}
        