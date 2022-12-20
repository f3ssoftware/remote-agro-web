import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../..'
import { PlanningInput } from '../../../models/PlanningInput'
import { NewPlanningItem } from './NewPlanningItem'

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
  const [description, setDescription] = useState('')
  const [payDate, setPayDate] = useState(new Date())
  const [quantity,setQuantity] = useState (0)
  const [productId, setProductId] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('')
  // const { financial,seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [plannings, setPlannings] = useState([new PlanningInput()])
  const { seasons } = useSelector((state: RootState) => state)
  const [outcomeYear, setOutcomeYear] = useState('')
  const [observation, setObservation] = useState('')

  const register = () => {
    console.log('teste')
    handleClose();
  }

  const onRemoveItem = (index: number) => {
    const planningsArr = [...plannings];
    planningsArr.splice(index, 1);
    setPlannings(planningsArr);
}

  // useEffect(() => {
  //     dispatch(asyncFetchCultivations())
  //     setSelectedCultivations(financial?.cultivations[0])
  //   }, [])

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
      {plannings.map((newPlanning, index) => {
            return <NewPlanningItem onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={undefined}></NewPlanningItem>
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
