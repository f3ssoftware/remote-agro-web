import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab, Modal } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Planning } from '../../../models/Planning'
import { asyncFetchEditPlannings, asyncNewPlannings } from '../../../stores/planning.store'
import { PlanningCost } from '../../../models/PlanningCost'
import {EditPlanningTab} from './EditPlanningTab'

export function EditPlanningCost({
  show,
  handleClose,
  id
}: {
  show: boolean,
  handleClose: any,
  id: number
}) {
  const [referenceName, setReferenceName] = useState('')
  const [key, setKey] = useState('')
  const [plannings, setPlannings] = useState([new PlanningCost()])
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
  const { planning } = useSelector((state: RootState) => state)
  const [outcomeYear, setOutcomeYear] = useState('')
  const month = [
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
  ]

  const edit = () => {
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
    setOutcomeYear(planning.editPlannings.season_year!)
    setReferenceName(planning.editPlannings.name!)
  }, [planning])

  useEffect(()=>{
    dispatch(asyncFetchEditPlannings(id))
  },[])

const onUpdateItem = (planning: PlanningCost, index: number) => {
  const planningArr = [...plannings];
  planningArr.splice(index, 1);
  planningArr.push(planning);
  setPlannings(planningArr);
}

  return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
            <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Planejamento - {planning.editPlannings.name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
            <Form.Control
              type="text"
              value={referenceName}
              onChange={(e) => {
                setReferenceName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Ano agrícola</Form.Label>
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
                    {season.year}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="mb-3"
        >
          {month.map((month, index) => {
            return (
              <Tab eventKey={index} title={month} >
                  <EditPlanningTab index={index} onHandleUpdate={onUpdateItem}></EditPlanningTab>
              </Tab>
            )
          })}
        </Tabs>

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
            edit()
          }}
        >
          Editar
        </Button>
      </div>
    </div>
  </Modal.Body>
  </Modal>
}


