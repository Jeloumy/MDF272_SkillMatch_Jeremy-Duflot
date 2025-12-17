export interface FreelancePayload {
    id: number;
    nom: string;
    email: string;
    skills: string[];
    tjm: number;
}

export interface CreateFreelanceDtoInputs {
    nom: string;
    email: string;
    skills: string[];
    tjm: number;
}