import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Patient } from 'src/app/_models/patient';
import { PatientService } from 'src/app/_services/patient.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  patient : Patient;
  createForm : FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private patientService: PatientService, private router:Router, private alertify: AlertifyService,private fb: FormBuilder) { }

  ngOnInit() {
    this.createPatientForm();
  }

  createPatientForm(){
    this.createForm = this.fb.group({
      gender: ['male'],
      firstName: ['',Validators.required],
      surname:  ['',Validators.required],
      idNumber: ['',  [Validators.required, Validators.minLength(13),Validators.maxLength(13)]],
      age: ['',Validators.required],
      dateOfBirth:  [null,Validators.required],
      email: ['',Validators.required],
      city:  ['',Validators.required],
      country:  ['',Validators.required],
      phoneNumber: ['',  [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      allergies : ['',Validators.required],
      medicalHistory : ['',Validators.required],
      radiology : ['',Validators.required],
      scripts : ['',Validators.required],
      medication : ['',Validators.required]
    })
  }

  create() {
    this.patient = Object.assign({},this.createForm.value);
    this.patientService.createPatient(this.patient).subscribe(() => {
    this.alertify.success('patient created successful');
    }, error => {
      this.alertify.error(error);
    }, () => {
        this.router.navigate(['/patients']);
    });
  }


  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
