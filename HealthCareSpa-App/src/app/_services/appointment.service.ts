import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Appointment } from '../_models/Appointment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { Patient } from '../_models/patient';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }


getAppointments(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginationResult<Appointment[]>> {

  const paginationResult: PaginationResult<Appointment[]> = new PaginationResult<Appointment[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }
  return this.http.get<Appointment[]>(this.baseUrl + 'appointments', { observe: 'response', params}).
  pipe(
    map(response => {
      paginationResult.result = response.body;
      if(response.headers.get('Pagination') != null) {
        paginationResult.pagination = JSON.parse (response.headers.get('Pagination'));
      }
       return paginationResult;
    })
  );
}

getPatient(id): Observable<Appointment> {
  return this.http.get<Appointment>(this.baseUrl + 'appointments/' + id);
}

deleteAppointment(id: number) {
  return this.http.delete(this.baseUrl + 'appointments/' + id);
  }
}