import { useEffect, useState } from "react";
import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../..";
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
                <Col md={8}>
                    <WalletBalance></WalletBalance>
                </Col>
                <Col md={4}>
                    <TotalBalance></TotalBalance>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Transactions></Transactions>
                </Col>
                <Col md={4}>
                    <BankAccounts></BankAccounts>
                </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
                <Col md={8}>
                    <Cashflow></Cashflow>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col md={2}>

                        </Col>
                        <Col>
                            <Row>
                                <Col md={10}>
                                    <ProgressBar variant="success" now={inputsPercentual} />
                                </Col>
                                <Col md={2}>
                                    <span className="percentage-span">{`${inputsPercentual.toFixed(1)}%`}</span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '2%' }}>
                                <Col>
                                    Insumos
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>

                        </Col>
                        <Col>
                            <Row>
                                <Col md={10}>
                                    <ProgressBar variant="success" now={maintenancePercentual} />
                                </Col>
                                <Col md={2}>
                                    <span className="percentage-span">{`${maintenancePercentual.toFixed(1)}%`}</span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '2%' }}>
                                <Col>
                                    Manutenção
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>

                        </Col>
                        <Col>
                            <Row>
                                <Col md={10}>
                                    <ProgressBar variant="success" now={administrativePercentual} />
                                </Col>
                                <Col md={2}>
                                    <span className="percentage-span">{`${administrativePercentual.toFixed(1)}%`}</span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '2%' }}>
                                <Col>
                                    Administrativo
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}