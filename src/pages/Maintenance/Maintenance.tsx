import { Navigate, useLocation } from "react-router-dom";

import { ManualRegistration } from "../Financial/ManualRegistration/ManualRegistration";
import { SefazInvoice } from "../Financial/Sefaz/SefazInvoice";
import { Riches } from "./Riches/Riches";
import { Warehouse } from "./Warehouse/Warehouse";
import { Fuel } from "./Fuel/Fuel";

export function Maintenance() {
    const location = useLocation();
    switch (location.pathname.split("/")[2]) {
        case undefined:
        case "riches": {
            return <Riches></Riches>
        }
        case "warehouse": {
            return <Warehouse></Warehouse>
        }
        default: {
            return <Fuel></Fuel>
        }
    }
}