import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

export function MensalExpense() {
    const [paymentDate, setPaymentDate] = useState(new Date());
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
    </Row>
}