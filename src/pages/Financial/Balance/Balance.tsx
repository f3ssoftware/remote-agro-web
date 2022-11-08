import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import "./Balance.scss"
import { BankAccounts } from "./components/BankAccounts";
import { Cashflow } from "./components/Cashflow";
import { TotalBalance } from "./components/TotalBalance";
import { Transactions } from "./components/Transactions";
import { WalletBalance } from "./components/WalletBalance";

export function Balance() {
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
                <Col>
                    <Transactions></Transactions>
                </Col>
                <Col md={4}>
                    <BankAccounts></BankAccounts>
                </Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
                <Col md={8}>
                    <Cashflow></Cashflow>
                </Col>
                <Col md={4}>
                    <Row>
                        <Col md={2}>

                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <ProgressBar variant="success" now={60} />
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
                                <Col>
                                    <ProgressBar variant="success" now={60} />
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
                                <Col>
                                    <ProgressBar variant="success" now={60} />
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