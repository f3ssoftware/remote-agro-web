export class Good {
    constructor(
        public createdAt?: string,
        public deleted_at?: string,
        public id?: number,
        public insurance_ends_at?: string,
        public insurance_policy?: any,
        public ipva?: any,
        public ipva_ends_at?: string,
        public is_insured?: boolean,
        public machine_id?: null,
        public name?: string,
        public type?: string,
        public updatedAt?: string,
        public user_id?: number
    ) { }
}