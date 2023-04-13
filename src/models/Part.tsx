export class Part {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public code: number,
        public unit_price: number,
        public quantity: number,
        public position: number,
        public deleted_at: string,
        public createdAt: string,
        public updatedAt: string
    ) { }
}