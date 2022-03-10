export interface Appointment {
    id: number;
    patientName: string;
    patientSurname: string;
    description: string;
    startTime: Date;
    endTime: Date;
    roomNumber: number;
    recurrence: number;
    doctor: string;
}
