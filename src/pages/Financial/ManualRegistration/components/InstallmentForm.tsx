import { pt } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

export function InstallmentForm({ index, onUpdate, initialAmount, totalAmount }: { index: number, onUpdate: any, initialAmount: number, totalAmount: number }) {
    const [amount, setAmount] = useState(initialAmount);
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + index, new Date().getDate()));

    useEffect(() => {
        onUpdate({
            amount,
            due_date: selectedDate
        }, index);
    }, [amount, selectedDate]);

    // useEffect(() => {
    //     onUpdate({
    //         amount,
    //         due_date: selectedDate
    //     }, index);
    // }, []);

    return <Row>
        <Col>
            <Form.Group className="mb-3" controlId="">
                <Form.Label >Parcela {index + 1} </Form.Label>
                <Form.Control
                    value={amount}
                    type="text"
                    onChange={(e) => {
                        setAmount(Number(e.currentTarget.value));
                    }}
                    onBlur={(e) => {
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