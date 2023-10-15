import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Planning } from '../../../models/Planning'
import { asyncNewPlannings } from '../../../stores/planning.store'
import { PlanningCost } from '../../../models/PlanningCost'
import {NewPlanningTab} from './NewPlanningTab'

export function NewPlanningCost({
  show,
  handleClose,
}: {
  show: boolean,
  handleClose: any
}) {
  const [referenceName, setReferenceName] = useState('')
  const [plannings, setPlannings] = useState<any[]>([])
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
  const [outcomeYear, setOutcomeYear] = useState('')


  const register = () => {
    const planning: Planning = {
        name: referenceName,
        season_year: outcomeYear,
        type: 'Custos Indiretos',
        plannings: plannings
    }
    dispatch(asyncNewPlannings(planning));
    handleClose();
  }

  useEffect(() => {
    setOutcomeYear(seasons.selectedSeason.year)
  }, [])

const onUpdateItem = (planning: PlanningCost, index: number) => {
  const planningArr = [...plannings];
  planningArr.splice(index, 1);
  planningArr.push(planning);
  setPlannings(planningArr);
}

const onRemoveItem = (index: number) => {
  const planningsArr = [...plannings]
  planningsArr.splice(index, 1)
  setPlannings(planningsArr)
}

  return (
    <>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setReferenceName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color: "#fff"}}>Ano agrícola</Form.Label>
            <Form.Select
              value={outcomeYear}
              aria-label=""
              onChange={(e) => {
                return setOutcomeYear(e.target.value)
              }}
            >
              {' '}
              {seasons.seasons.map((season, index) => {
                return (
                  <option value={season.year} key={index}>
                    {season.type} - {season.year}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <div style={{backgroundColor: '#7C5529'}}>
      
          {plannings.map((month, index) => {
            return (
             
                  <NewPlanningTab index={index} onHandleUpdate={onUpdateItem} onHandleRemove={onRemoveItem}></NewPlanningTab>
              
            )
          })}
        
      </div>
        
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        <Button
          variant="success"
          onClick={() => {
            register()
          }}
        >
          Registrar
        </Button>
        <Button variant="primary" onClick={() => setPlannings([...plannings, new PlanningCost()])}>Adicionar Linha</Button>
      </div>
    </>
  )
}


