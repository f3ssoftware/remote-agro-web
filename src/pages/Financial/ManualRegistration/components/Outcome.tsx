import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { OutcomeForm } from './OutcomeForm'
import { costTypesList } from '../../../../utils/costTypes'
import { laborCostList } from '../../../../utils/laborCostTypes'
import { outsourcedCostList } from '../../../../utils/outsourcedCostTypes'
import { PrimeReactOutcomeForm } from '../forms/PrimeReactOutcomeForm'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { administrativeSubCosts } from '../../../../utils/administrative-sub-costs'

export function Outcome({ sefaz }: { sefaz?: any }) {
  const [outcomeType, setOutcomeType] = useState('Insumos')
  const [costAction, setCostAction] = useState('');

  const returnSubCosts = () => {
    switch (outcomeType) {
      case 'Arla':
      case 'Gasolina':
      case 'Diesel': {
        return <span className="p-float-label">
          <InputText value={costAction} onChange={(e) => {
            setCostAction(e.target.value);
          }} style={{ width: '100%' }}></InputText>
          <label htmlFor="subCost">Sub Custo</label>
        </span>
      }
      case 'Administrativo': {
        return <span className="p-float-label">
          <Dropdown value={costAction} onChange={(e) => {
            setCostAction(e.target.value);
          }} options={administrativeSubCosts} optionLabel="label" style={{ width: '100%' }} />
          <label htmlFor="subCost">Sub Custo</label>
        </span>
      }
      case 'Venda': {
        return <span className="p-float-label">
          <InputText value={costAction} onChange={(e) => {
            setCostAction(e.target.value);
          }} style={{ width: '100%' }}></InputText>
          <label htmlFor="subCost">Nome do Produto</label>
        </span>
      }
      case 'Mão-de-obra': {
        return <span className="p-float-label">
          <Dropdown value={costAction} onChange={(e) => {
            setCostAction(e.target.value);
          }} options={laborCostList} optionValue="value" optionLabel="label" style={{ width: '100%' }} />
          <label htmlFor="subCost">Tipos de custos</label>
        </span>
      }
      case 'Terceirizado': {
        return <span className="p-float-label">
          <Dropdown value={costAction} onChange={(e) => {
            setCostAction(e.target.value);
          }} options={outsourcedCostList} optionValue="value" optionLabel="label" style={{ width: '100%' }} />
          <label htmlFor="subCost">Tipos de custos</label>
        </span>
      }
    }
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col md={6}>
          <span className="p-float-label">
            <Dropdown value={outcomeType} onChange={(e) => {
              return setOutcomeType(e.target.value)
            }} options={costTypesList} optionLabel="label" style={{ width: '100%' }} />
            <label htmlFor="username">Tipo de despesa</label>
          </span>
          <Form.Group className="mb-3" controlId="">
            {/* <Form.Select
              aria-label=""
              onChange={(e) => {
                return setOutcomeType(e.target.value)
              }}
            >
              {costTypesList.map((costType, index) => {
                return <option value={costType.value}>{costType.label}</option>
              })}
            </Form.Select> */}
          </Form.Group>
        </Col>
        <Col md={6}>
          {returnSubCosts()}
        </Col>
      </Row>
      <Row>
        {/* <OutcomeForm costType={outcomeType.toString()} costAction={costAction} sefaz={sefaz}></OutcomeForm> */}
        <PrimeReactOutcomeForm costType={outcomeType.toString()} costAction={costAction} sefaz={sefaz}></PrimeReactOutcomeForm>
      </Row>


    </div>
  )
}
