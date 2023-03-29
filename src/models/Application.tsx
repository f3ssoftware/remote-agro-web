import {Fields} from './Fields'

export class Application {
  accountable?: string
  application_type?: string
  applier_id?: string
  area?: number
  block?: string
  createdAt?: string
  date?: string
  farm_id?: number
  fertilizer_id?: number
  fertilizer_quantity?: number
  fertilizer_total_quantity?: number
  flow_rate?: number
  id?: number
  is_pms?: boolean
  lines_spacing?: number
  number?: number
  number_of_tanks?: number
  pressure?: number
  seed_area?: number
  seed_id?: number
  seed_quantity?: number
  seed_total_quantity?: number
  type?: string
  updatedAt?: string
  user_fertilizer_id?: number
  user_id?: number
  user_seed_id?: number
  correct_decimals?: boolean
  fields?: Fields[]
}
