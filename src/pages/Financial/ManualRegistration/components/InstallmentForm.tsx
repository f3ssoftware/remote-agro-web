import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

export function InstallmentForm({ index, onUpdate }: { index: number, onUpdate: any }) {
    const [amount, setAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        onUpdate({
            amount,
            selectedDate
        }, index);
    }, [amount, selectedDate]);
    return <Row>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label >Parcela {index + 1} </Form.Label>
                <Form.Control
                    type="text"
                    onBlur={(e) => {
                        console.log(e.currentTarget.value);
                        if (isNaN(Number(e.currentTarget.value))) {
                            e.currentTarget.value = '';
                        } else {
                            setAmount(Number(e.currentTarget.value));
                            e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                        }
                    }} onKeyUp={(e) => {
                        if (e.key === 'Backspace') {
                            e.currentTarget.value = '';
                        }
                    }}
                />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label >Data</Form.Label>
                <DatePicker
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={selectedDate}
                    onChange={(date: Date) => setSelectedDate(date)}
                />
            </Form.Group>
        </Col>
    </Row>
}