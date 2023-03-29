import { SendCultivarsDTO } from "./SendCultivars.dto"

export class RegisterPlotDTO {
    farm_id?: number;
    planting_type?: string;
    planting_date?: string;
    total_area?: number;
    cultivares?: SendCultivarsDTO[];
    productivity?: number;
    season_id?: number;
    is_active?: boolean;
    cultivation_name?:string;
    name?: string;
    expected_unit_price?: number;
    cultivation_id?: number;
    expenses_weight?: number;
}