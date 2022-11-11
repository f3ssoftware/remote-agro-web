import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export function NewPlot() {
    const [propName,setPropName] = useState('')
    const [totalArea,setTotalArea] = useState(0)
    const [productivity,setProductivity] = useState(0)
    const [value,setValue] = useState(0)
    
    useEffect(()=>{
      console.log(value)
  },[propName,totalArea,productivity,value]);

  return (
    <Row style={{ marginTop: '2%' }}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome para o talhão
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setPropName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
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
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Produtividade esperada (saca/ha)
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setProductivity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Preço de venda esperada da saca (R$/saca)
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setValue(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Row>
  )
}
