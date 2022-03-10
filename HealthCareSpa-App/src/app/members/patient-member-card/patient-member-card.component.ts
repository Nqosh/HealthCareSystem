import { Component, Input, OnInit } from '@angular/core';

import { Patient } from 'src/app/_models/patient';

@Component({
  selector: 'app-patient-member-card',
  templateUrl: './patient-member-card.component.html',
  styleUrls: ['./patient-member-card.component.css']
})
export class PatientMemberCardComponent implements OnInit {

  @Input() patient: Patient;
  
  constructor() { }

  ngOnInit() {

    console.log(this.patient);
  }

}
