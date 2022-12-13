import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

export function MensalExpense({ onHandleUpdate }: { onHandleUpdate: any }) {
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [monthsQuantity, setMonthsQuantity] = useState(1);

    useEffect(() => {
        onHandleUpdate(paymentDate, monthsQuantity);
    }, [paymentDate, monthsQuantity]);

    return <Row>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label >Data de pagamento</Form.Label>
                <DatePicker
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={paymentDate}
                    onChange={(date: Date) => setPaymentDate(date)}
                />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label >Quantidade de meses</Form.Label>
                <Form.Control type="number" min={1} value={monthsQuantity} onChange={(e) => {
                    setMonthsQuantity(Number(e.target.value));
                }}></Form.Control>
            </Form.Group>
        </Col>
    </Row>
}