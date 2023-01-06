import { Row, Col, ProgressBar } from "react-bootstrap";
import { TotalBalance } from "../Financial/Balance/components/TotalBalance";
import { WalletBalance } from "../Financial/Balance/components/WalletBalance";
import phoneImg from "../../assets/images/home_image.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchExpensesInvoicesData } from "../../stores/financial.store";
import { Results } from "./components/Results";
import { Productivity } from "./components/Productivity";
import { Cashflow } from "../Financial/Balance/components/Cashflow";
import { RootState } from "../..";
import { costTypesList } from "../../utils/costTypes";
import { HomeWallets } from "./components/HomeWallets";

export function Home() {
    const { financial } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchExpensesInvoicesData());
    }, [])
    return <div className="balance-content">
        <Row>
            <Col md={8}>
                {/* <WalletBalance></WalletBalance> */}
                <HomeWallets></HomeWallets>
            </Col>
            <Col md={4}>
                <img src={phoneImg} alt="" />
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col md={8}>
                {/* <Results></Results> */}
                <Cashflow></Cashflow>
            </Col>
            <Col>
                {/* <Productivity></Productivity> */}
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
        </Row>
    </div>
}
