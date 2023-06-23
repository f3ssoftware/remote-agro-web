import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../..'
import { PlanningInput } from '../../../models/PlanningInput'
import { NewPlanningItem } from './NewPlanningItem'
import { Planning } from '../../../models/Planning'
import { asyncNewPlannings } from '../../../stores/planning.store'

export function NewPlanning({
  show,
  handleClose,
  onHandleRemove,
  index
}: {
  show: boolean,
  handleClose: any,
  onHandleRemove: any,
  index: number
}) {
  const [referenceName, setReferenceName] = useState('')
  const dispatch = useDispatch<any>()
  const [plannings, setPlannings] = useState([new PlanningInput()])
  const { seasons } = useSelector((state: RootState) => state)
  const [selectedSeason, setSelectedSeason] = useState({ id: 0 })

  const register = () => {
    const p: Planning = {
      name: referenceName,
      season_id: selectedSeason.id,
      type: 'Insumos',
      plannings: plannings
    }
    dispatch(asyncNewPlannings(p));
    handleClose();
  }

  const onRemoveItem = (index: number) => {
    const planningsArr = [...plannings];
    planningsArr.splice(index, 1);
    setPlannings(planningsArr);
}

const onUpdateItem = (planning: PlanningInput, index: number) => {
  const planningsArr = [...plannings];
  planningsArr.splice(index, 1);
  planningsArr.push(planning);
  setPlannings(planningsArr);

}

  return (
    <div>
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
                  <Form.Label style={{ color: '#fff' }}>Selecione a temporada</Form.Label>
                  <Typeahead
                    id="season"
                    onChange={(selected: any) => {
                      if (selected.length > 0) {
                        setSelectedSeason({ id: selected[0].id })
                      }
                    }}
                    options={seasons.seasons.map((season) => {
                      return { id: season.id, label: `${season.type} - ${season.year}` }
                    })}
                  />
                </Form.Group>
              </Col>
      </Row>
      {plannings.map((newPlanning, index) => {
            return <NewPlanningItem onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewPlanningItem>
        })}
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        <Button variant="primary" onClick={() => setPlannings([...plannings, new PlanningInput()])}>Adicionar Linha</Button>
        <Button
          variant="success"
          onClick={() => {
            register()
          }}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}
