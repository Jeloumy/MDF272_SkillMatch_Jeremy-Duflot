export interface EntreprisePayload {
    id: number;
    nom: string;
    secteur: string;
}

export interface CreateEntrepriseDtoInputs {
    nom: string;
    secteur: string;
}

export interface CreateProjetDtoInputs {
    titre: string;
    description: string;
    budgetMaxTjm: number;
    skillsRequis: string[];
}