import { NumberLiteralType } from "typescript";

export interface ProductListItem {
    id: number;
    name: string;
    description: string;
    maker: string;
    active_ingredient: string;
    specifications: string;
    owner_id: number;
    deleted_at: string
    createdAt: string;
    updatedAt: string;
    class: string;
}