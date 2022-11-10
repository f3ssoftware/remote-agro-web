import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt-BR";

export function OutcomeForm() {
  const [outcomeYear, setOutcomeYear] = useState(0)
  const [reference, setReference] = useState('')
  const [value, setValue] = useState(0)
  const [observation, setObservation] = useState('')
  const [number, setNumber] = useState(0)
  const [plan, setPlan] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState(0)
  const [expirationDate,setExpirationDate] = useState(new Date())

  useEffect(()=>{
    console.log(expirationDate)
},[outcomeYear,reference,value,observation,number,plan,paymentMethod,expirationDate]);

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Ano agrícola</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setOutcomeYear(Number(e.target.value))
              }}
            >
              <option value={0}>2020/2021</option>
              <option value={1}>2021/2022</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Referência</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                return setReference(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Valor</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setValue(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                return setObservation(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Number</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setValue(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Vincular Planejamento
            </Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setPlan(Number(e.target.value))
              }}
            >
              <option value={0}>select</option>
              <option value={1}>teste1</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Método de pagamento
            </Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setPaymentMethod(Number(e.target.value))
              }}
            >
              <option value={0}>select</option>
              <option value={1}>Á vista</option>
              <option value={2}>A prazo</option>
              <option value={3}>Gasto mensal</option>
              <option value={4}>Sem necessidade de pagamento</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={expirationDate}
              onChange={(date: Date) => setExpirationDate(date)}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}
