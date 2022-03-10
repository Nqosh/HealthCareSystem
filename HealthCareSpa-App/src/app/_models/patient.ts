import { medicalRecord } from "./medicalrecords";

export interface Patient {
    id: number;
    name: string;
    surname: string;
    idNumber : string;
    gender: string;
    created: Date;
    updated: Date;
    dateOfBirth: Date;
    phoneNumber: number;
    city: string;
    age : number;
    country: string;
    email: string;
    allergies:string;
    currentlyUnderTreatment: boolean;
    medicalDescription: string;
    medicalRecords : Array<medicalRecord> ;

}