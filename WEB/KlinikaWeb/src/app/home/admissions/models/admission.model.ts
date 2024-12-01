export interface Admission {
  id: number;
  admissionDateTime: string;  
  patientId: number;  
  doctorId: number;
  isEmergency: boolean;
  patientName:string;
  doctorDetails:string;
}
