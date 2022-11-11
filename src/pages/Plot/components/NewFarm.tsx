import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export function NewFarm() {
    const [propName,setPropName] = useState('')
    const [totalArea,setTotalArea] = useState(0)
    const [quantity,setQuantity] = useState(0)
    
  return (
    <Row style={{ marginTop: '2%' }}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome da proriedade
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setPropName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Área total (ha)
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTotalArea(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Quantidade de talhões
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Row>
  )
}
