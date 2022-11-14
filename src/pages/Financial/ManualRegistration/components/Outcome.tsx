import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OutcomeForm } from './OutcomeForm'
import { costTypesList } from '../../../../utils/costTypes'

export function Outcome() {
  const [outcomeType, setOutcomeType] = useState('')
  const [costAction, setCostAction] = useState('');

  const returnSubCosts = () => {
    switch (outcomeType) {
      case 'Arla':
      case 'Gasolina':
      case 'Diesel': {
        return <Form.Group className="mb-3" controlId="">
          <Form.Label>Sub Custo</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setCostAction(e.target.value);
            }}
          />
        </Form.Group>
      }
      case 'Administrativo': {
        return <Form.Group className="mb-3" controlId="">
          <Form.Label>Sub Custo</Form.Label>
          <Form.Select
            aria-label=""
            onChange={(e) => {
              setCostAction(e.target.value);
            }}
          ><option>Não Vincular</option>
            <option value="Assessoria">Assesoria</option>
            <option value="Energia">Energia</option>
            <option value="Impostos">Impostos</option>
            <option value="Juros">Juros</option>
            <option value="Seguros">Seguros</option>
            <option value="Tarifas">Tarifas</option>
            <option value="Outros">Outros</option>
          </Form.Select>
        </Form.Group>
      }
      case 'Venda': {
        return <Form.Group className="mb-3" controlId="">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              setCostAction(e.target.value);
            }}
          />
        </Form.Group>
      }
    }
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Tipo de despesa</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setOutcomeType(e.target.value)
              }}
            >
              {costTypesList.map((costType, index) => {
                return <option value={costType.value}>{costType.label}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          {returnSubCosts()}
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <OutcomeForm costType={outcomeType.toString()} costAction={costAction}></OutcomeForm>
      </Row>


    </div>
  )
}
