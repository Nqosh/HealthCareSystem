import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { Patient } from '../_models/patient';
import { PatientService } from '../_services/patient.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PatientDetailResolver implements Resolve<Patient> {
    constructor(private patientService: PatientService,
        private router: Router, private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Patient> {
            return this.patientService.getPatient(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/patients']);
                    return of(null);
                })
            );
        }
}
