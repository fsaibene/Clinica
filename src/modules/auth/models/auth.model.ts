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