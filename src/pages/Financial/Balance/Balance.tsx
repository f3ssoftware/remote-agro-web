import { Button, Card, Col, Row } from "react-bootstrap";
import "./Balance.scss"
import { TotalBalance } from "./components/TotalBalance";
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
        </div>
    )
}