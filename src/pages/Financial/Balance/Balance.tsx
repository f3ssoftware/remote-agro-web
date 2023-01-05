import { useEffect, useState } from "react";
import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../..";
import { costTypesList } from "../../../utils/costTypes";
import "./Balance.scss"
import { BankAccounts } from "./components/BankAccounts";
import { Cashflow } from "./components/Cashflow";
import { TotalBalance } from "./components/TotalBalance";
import { Transactions } from "./components/Transactions";
import { WalletBalance } from "./components/WalletBalance";

export function Balance() {
    const [inputsPercentual, setInputsPercentual] = useState(0);
    const [maintenancePercentual, setMaintenancePercentual] = useState(0);
    const [administrativePercentual, setAdministrativePercentual] = useState(0);

    const { financial } = useSelector((state: RootState) => state);

    useEffect(() => {
        setInputsPercentual((financial.expensesRevenue.filter(exp => exp.cost_type === 'Insumos').length / financial.expensesRevenue.length) * 100)
        setMaintenancePercentual((financial.expensesRevenue.filter(exp => exp.cost_type === 'Manutenção').length / financial.expensesRevenue.length) * 100);
        setAdministrativePercentual((financial.expensesRevenue.filter(exp => exp.cost_type === 'Administrativo').length / financial.expensesRevenue.length) * 100)
    }, [financial])
    return (
        <div className="balance-content">
            <Row>
                <Col md={12}>
                    <WalletBalance></WalletBalance>
                </Col>
                {/* <Col md={4}>
                    <TotalBalance></TotalBalance>
                </Col> */}
            </Row>
            <Row>
                <Col md={12}>
                    <Transactions></Transactions>
                </Col>
                {/* <Col md={4}>
                    <BankAccounts></BankAccounts>
                </Col> */}
            </Row>
            {/* <Row style={{ marginTop: '2%' }}>
                <Col md={8}>
                    <Cashflow></Cashflow>
                </Col>
                <Col md={4}>
                    <div style={{ height: '300px', overflowY: 'scroll' }}>
                        {costTypesList.map(costType => {
                            return <Row>
                                <Col md={2}>

                                </Col>
                                <Col>
                                    <Row>
                                        <Col md={10}>
                                            <ProgressBar variant="success" now={(financial.expensesRevenue.filter(exp => exp.cost_type === costType.value).length / financial.expensesRevenue.length) * 100} />
                                        </Col>
                                        <Col md={2}>
                                            <span className="percentage-span">{`${((financial.expensesRevenue.filter(exp => exp.cost_type === costType.value).length / financial.expensesRevenue.length) * 100).toFixed(1)}%`}</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '2%' }}>
                                        <Col>
                                            <span style={{ color: '#fff' }}>{costType.label}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        })}
                    </div>

                </Col>
            </Row> */}
        </div>
    )
}