export interface User {
    id: string;
    firstName: string;
    lastName: string;
    type: string;
    profileImage: string;
    email: string;
    birthDate: Date;
    dni: string;
    os: string;
    specialities: string[];
    appointments: Appointment[];
    deleted: boolean;
    emailVerified: boolean;
    daysAvailable: string;
}
export interface Speciality {
    id: string;
    name: string;
    duration: number;
    days: string;
    ranges: string[];
}

export interface SpecialityDefinition {
    id: string;
    name: string;
    deleted: boolean;
}

export interface Appointment {
    id: string;
    user: User;
    speciality: SpecialityDefinition;
    date: Date;
    canceled: boolean;
    canceledDate: Date; 
    deleted: boolean;
}