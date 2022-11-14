import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

export function IncomeOthers() {
  const [reference, setReference] = useState('')
  const [totalValue, setTotalValue] = useState(0)
  const [receiveDate, setReceiveDate] = useState(new Date())
  const [description, setDescription] = useState('')

  useEffect(() => {
    console.log(receiveDate)
  }, [reference, totalValue, receiveDate, description])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Referência</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                return setReference(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Valor Total</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTotalValue(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Valor Total</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTotalValue(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >
              Inicio do contrato
            </Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={receiveDate}
              onChange={(date: Date) => setReceiveDate(date)}
            />
          </Form.Group>
        </Col>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label >
                Descrição adicional
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  return setDescription(e.target.value)
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Row>
    </div>
  )
}
