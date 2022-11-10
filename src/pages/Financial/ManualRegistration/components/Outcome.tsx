import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OutcomeForm } from './OutcomeForm'

export function Outcome() {
  const [outcomeType, setOutcomeType] = useState(0)

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Tipo de despesa</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setOutcomeType(Number(e.target.value))
              }}
            >
              <option value={0}>Insumos</option>
              <option value={1}>Manutenção</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
            {outcomeType === 1 ? <div>formselect subcustos</div> : <div></div>}
        </Col>
      </Row>
      <Row style={{marginTop: '2%'}}>
              <OutcomeForm></OutcomeForm>
      </Row>


    </div>
  )
}
