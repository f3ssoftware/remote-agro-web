export class PlanningCost {
    constructor(
        public administrative_amount: number,
        public arla_amount: number,
        public canteen_amount: number,
        public conservation_amount: number,
        public diesel_amount: number,
        public gasoline_amount: number,
        public labor_amount: number,
        public maintenance_amount: number,
        public mouth: number,
        public others_amount: number,
        public outsource_amount: number,
        public rent_amount: number,
        public storage_amount: number,
        public year: string
    ) { }
}