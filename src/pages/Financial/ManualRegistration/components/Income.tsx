import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IncomeContracts } from "./IncomeContracts";
import { IncomeOthers } from "./IncomeOther";
import { Dropdown } from "primereact/dropdown";
import { PrimeReactIncomeContracts } from "../forms/PrimeReactIncomeContracts";
import { PrimeReactIncomeOthers } from "../forms/PrimeReactIncomeOthers";

export function Income() {
    const [incomeType, setIncomeType] = useState(0);
    return <div>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <span className="p-float-label">
                    <Dropdown value={incomeType} onChange={(e) => {
                        setIncomeType(e.target.value);
                    }} options={[{ label: 'Outras Receitas', value: 0 }, { label: 'Contratos', value: 1 }]} optionValue="value" optionLabel="label" style={{ width: '100%' }} />
                    <label htmlFor="subCost">Tipos de custos</label>
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                {incomeType === 1 ? <PrimeReactIncomeContracts></PrimeReactIncomeContracts> : <PrimeReactIncomeOthers></PrimeReactIncomeOthers>}
            </Col>
        </Row>
    </div>
}