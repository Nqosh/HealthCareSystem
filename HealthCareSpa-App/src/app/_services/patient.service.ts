import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { Patient } from '../_models/patient';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getPatients(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginationResult<Patient[]>> {
  const paginationResult: PaginationResult<Patient[]> = new PaginationResult<Patient[]>();

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
  return this.http.get<Patient[]>(this.baseUrl + 'patients', { observe: 'response', params}).
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

getPatient(id): Observable<Patient> {
  return this.http.get<Patient>(this.baseUrl + 'patients/' + id);
}

createPatient(patient: Patient) {
  return this.http.post(this.baseUrl + 'patients', patient, {});
}

updatePatient(id: number, patient: Patient) {
  return this.http.put(this.baseUrl + 'patients/' + id, patient);
}

deletePatient(id: number) {
return this.http.delete(this.baseUrl + 'patients/' + id);
}

}
