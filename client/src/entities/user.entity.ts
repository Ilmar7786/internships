export interface SpecialityFieldEducation {
    id: number;
    code: string;
    title: string;
}

export interface SpecialityEnlargedGroup {
    id: number;
    code: string;
    title: string;
}

export interface SpecialityLevelEducation {
    id: number;
    code: string;
    title: string;
}

export interface SpecialityProfession {
    id: number;
    code: string;
    title: string;
}

export interface Specialty {
    id: number;
    specialityFieldEducation: SpecialityFieldEducation;
    specialityEnlargedGroup: SpecialityEnlargedGroup;
    specialityLevelEducation: SpecialityLevelEducation;
    specialityProfession: SpecialityProfession;
}

export interface User {
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    specialty: Specialty;
}


