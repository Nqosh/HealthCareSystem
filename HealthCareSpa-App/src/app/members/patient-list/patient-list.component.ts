import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';

import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { Patient } from 'src/app/_models/patient';
import { PatientService } from 'src/app/_services/patient.service';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

patients: Patient[];
user: User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParams: any = {};
collectionSize: number;
pagination: Pagination;

  constructor(private patientService: PatientService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.patients = data['patients'].result;
      this.pagination = data['patients'].pagination;
    });

    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPatients();
  }

  resetFilters() {

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadPatients();
  }

  search(value: string): void {
    this.patients = this.patients.filter((val) => val.name.includes(value));
    this.collectionSize = this.patients.length;
  }

  loadPatients() {
    this.patientService.getPatients(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe(
      (res: PaginationResult<Patient[]>) => {
    this.patients = res.result;
    this.pagination = res.pagination;
}, error => {
  this.alertify.error(error);
});

  }
}
