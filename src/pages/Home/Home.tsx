import { Row, Col } from "react-bootstrap";
import { TotalBalance } from "../Financial/Balance/components/TotalBalance";
import { WalletBalance } from "../Financial/Balance/components/WalletBalance";
import phoneImg from "../../assets/images/home_image.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncFetchExpensesInvoicesData } from "../../stores/financial.store";
import { Results } from "./components/Results";
import { Productivity } from "./components/Productivity";

export function Home() {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchExpensesInvoicesData());
    }, [])
    return <div className="balance-content">
        <Row>
            <Col md={8}>
                <WalletBalance></WalletBalance>
            </Col>
            <Col>
                <img src={phoneImg} alt="" />
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col md={8}>
                <Results></Results>
            </Col>
            <Col>
                <Productivity></Productivity>
            </Col>
        </Row>
    </div>
}
