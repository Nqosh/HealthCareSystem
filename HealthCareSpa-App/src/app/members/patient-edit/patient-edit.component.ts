import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/_models/patient';
import { PatientService } from 'src/app/_services/patient.service';
import { medicalRecord } from 'src/app/_models/medicalrecords';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  patient : Patient;
  photoUrl: string;
  medicalRecords : Array<medicalRecord>;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private patientService: PatientService, private authService: AuthService) { }

  ngOnInit() {

      this.route.data.subscribe(data => {
      this.patient = data['patient'];
      this.medicalRecords = this.patient.medicalRecords;
    });

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }


  updatePatient() {
    this.patientService.updatePatient(this.authService.decodedToken.nameid, this.patient).
    subscribe(next => {
     this.alertify.success('profile updated successfully');
     this.editForm.reset(this.patient);
     
    }, error => {
     this.alertify.error(error);
    });
   }
}
