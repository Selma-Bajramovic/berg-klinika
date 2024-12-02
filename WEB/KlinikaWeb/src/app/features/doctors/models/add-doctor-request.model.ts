export interface DoctorModel{
    name:string;
    surname: string;
    jmbg: string;
    dateOfBirth: Date;
    gender: string;
    address?: string;
    phoneNumber?: string;
    title: string;
    isSpec:boolean;
}