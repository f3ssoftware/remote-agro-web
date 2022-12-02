import { SiloCultivar } from "./SiloCultivar";

export class Cultivation {
    id?: number;
    name?: string;
    description?: string;
    deleted_at?: string;
    createdAt?: string;
    updatedAt?: string;
    cultivares?: any[];
    silos?: any[];
    siloCultivar?: SiloCultivar[]
}