import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { asyncFetchSoil } from "../../stores/soil.store";
import { TransactionDates } from "../Financial/Balance/modals/TransactionDates";

export function Soil(){

    const [showModalDates, setShowModalDates] = useState(false);
    const [startDate,setStartDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
    const [endDate, setEndDate] = useState(new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const [findSoil, setFindSoil] = useState('')
    const { soil } = useSelector((state: RootState) => state);
    const initialSoilAnalysis: any[] = []
    const [soilAnalysis, setSoilAnalysis] = useState(initialSoilAnalysis);

    // useEffect(() => {
        // dispatch(asyncFetchSoil());
    // }, [startDate, endDate]);

    // useEffect(() => {
    //     find();
    // }, [findSoil])

    // const find = () => {
    //     setSoilAnalysis(soil.?.filter((transaction: ExpensesRevenue) => {
    //         if (transaction?.reference?.toUpperCase().includes(findTransaction.toUpperCase())) {
    //             return transaction;
    //         }
    //         return null;
    //     }))
    // }
    
    return <div style={{ marginTop: '2%' }}>
        <Card className="ra-card">
            <Card.Body>
                <Row>
                    <Col>
                        <h4>Análises de solo</h4>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px' }} placeholder="Pesquisar" onChange={(console.log) }></Form.Control>
                        </Form>
                    </Col>
                </Row>
                <div className="flex-right" style={{ marginTop: '2%', marginBottom: '2%' }}>
                    <FontAwesomeIcon icon={faCalendar} onClick={() => setShowModalDates(true) } style={{ cursor: 'pointer' }}></FontAwesomeIcon>
                </div>
                <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: '300px' }}>
                    <Table striped bordered hover>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff', fontSize: '12px' }}>
                            <tr>
                                <th>Data</th>
                                <th>Fazenda</th>
                                <th>Talhões</th>
                                <th>Operador</th>
                                <th>Armostragem</th>
                                <th>Laboratório</th>
                                <th>Mapa de fertilidade</th>
                                <th>Mapa de aplicação</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#fff', color: '#000', fontSize: '12px' }}>
 
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
        <TransactionDates show={showModalDates} handleClose={() => setShowModalDates(false)} onUpdate={(startDate: any, endDate: any) => {
            setStartDate(startDate);
            setEndDate(endDate);
            setShowModalDates(false);
        }}></TransactionDates>
    </div >
}


