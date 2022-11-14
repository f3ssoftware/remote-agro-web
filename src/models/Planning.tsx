export class Planning {
    constructor(
        public id: number,
        public owner_id: number,
        public season_id: number,
        public season_year: string,
        public name: string,
        public user_id: number,
        public type: string,
        public deleted_at: string,
        public createdAt: string,
        public updatedAt: string,
        public season: null
    ) { }
}