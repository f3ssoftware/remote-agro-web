import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'


export function NewPrescription(handleClose: any) {
  const [product, setProduct] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [test,setTest] = useState(0)
  const [tank,setTank] = useState(0)


  useEffect(() => {
    console.log(quantity)
  }, [product,quantity,test,tank])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Produtos</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setProduct(Number(e.target.value))
              }}
            >
              <option value={0}>selecione</option>
              <option value={1}>teste</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Qtd/ha (L)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Teste (ml)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTest(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Tanque</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTank(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}
