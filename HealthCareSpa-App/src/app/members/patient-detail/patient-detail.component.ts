import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { Patient } from 'src/app/_models/patient';
import { PatientService } from 'src/app/_services/patient.service';
import { TabsetComponent } from '../../../../node_modules/ngx-bootstrap';
import { medicalRecord } from 'src/app/_models/medicalrecords';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patient : Patient;
  medicalRecords : Array<medicalRecord>;
  constructor(private patientService: PatientService, private alertify: AlertifyService, private router:Router,
    private route: ActivatedRoute) { }

    @ViewChild('memberTabs') memberTabs: TabsetComponent;

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.patient = data['patient'];
      this.medicalRecords = this.patient.medicalRecords;
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe(() => {
      this.alertify.success('patient deleted successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/patients']);
      });
   }
}
