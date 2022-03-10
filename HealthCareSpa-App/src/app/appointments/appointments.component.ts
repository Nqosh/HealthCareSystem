import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from '../_models/pagination';

import { AlertifyService } from '../_services/alertify.service';
import { Appointment } from '../_models/Appointment';
import { AppointmentService } from '../_services/appointment.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  collectionSize: number;
  pagination: Pagination;
  selectedAppointment : Appointment;
  constructor(private appointmentService: AppointmentService, private alertify: AlertifyService, 
    private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.appointments = data['appointments'].result;
      this.pagination = data['appointments'].pagination;
    });

    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAppointments();
  }

  resetFilters() {

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadAppointments();
  }

  search(value: string): void {
    this.appointments = this.appointments.filter((val) => val.patientName.includes(value));
    this.collectionSize = this.appointments.length;
  }

  selectAppointment(selectedAppointment) {
    this.selectedAppointment = selectedAppointment;
  }

  deleteAppointment(selectedAppointment) {
    this.appointmentService.deleteAppointment(this.selectedAppointment.id).subscribe(() => {
      this.alertify.success('appointment deleted successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/appointments']);
      });
  }


  loadAppointments() {
    this.appointmentService.getAppointments(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe(
        (res: PaginationResult<Appointment[]>) => {
    this.appointments = res.result;
    this.pagination = res.pagination;
    }, error => {
    this.alertify.error(error);
  });

  }
}
