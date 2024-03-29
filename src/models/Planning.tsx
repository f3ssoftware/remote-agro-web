import { PlanningCost } from "./PlanningCost";
import { PlanningInput } from "./PlanningInput";

export class Planning {
    constructor(
        public id?: number,
        public owner_id?: number,
        public season_id?: number,
        public season_year?: string,
        public name?: string,
        public user_id?: number,
        public type?: string,
        public deleted_at?: string,
        public createdAt?: string,
        public updatedAt?: string,
        public season?: null,
        public plannings_indirect_costs?: PlanningCost[],
        public plannings_products?: PlanningInput[],
        public plannings?: PlanningCost[] | PlanningInput[]
    ) { }
}