import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { PlanningCost } from '../../../models/PlanningCost'
import { RootState } from '../../..'
import { useSelector } from 'react-redux'
import { PlanningInput } from '../../../models/PlanningInput'

export function EditPlanningTab({
  index,
  onHandleUpdate,
}: {
  index: number
  onHandleUpdate: any
}) {
  const [maintenance, setMaintenance] = useState(0)
  const [diesel, setDiesel] = useState(0)
  const [gas, setGas] = useState(0)
  const [arla, setArla] = useState(0)
  const [administrative, setAdministrative] = useState(0)
  const [conservation, setConservation] = useState(0)
  const [labor, setLabor] = useState(0)
  const [storage, setStorage] = useState(0)
  const [restaurant, setRestaurant] = useState(0)
  const [diverse, setDiverse] = useState(0)
  const [rent, setRent] = useState(0)
  const [outsourced, setOutsourced] = useState(0)
  const [others, setOthers] = useState(0)
  const { planning } = useSelector((state: RootState) => state)
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedYear, setSelectedYear] = useState('')
  const currentYear = new Date().getFullYear()
  const futureYearsCount = 20 // You can adjust this to your desired range.

  const years = Array.from({ length: futureYearsCount }, (_, index) => {
    const year = currentYear + index
    return year.toString()
  })

  useEffect(() => {
    const p: PlanningCost = {
      administrative_amount: administrative,
      arla_amount: arla,
      canteen_amount: restaurant,
      conservation_amount: conservation,
      diesel_amount: diesel,
      diverse_amount: diverse,
      gasoline_amount: gas,
      labor_amount: labor,
      maintenance_amount: maintenance,
      month: selectedMonth,
      others_amount: others,
      outsource_amount: outsourced,
      rent_amount: rent,
      storage_amount: storage,
      year: selectedYear,
    }
    onHandleUpdate(p, index)
  }, [
    administrative,
    arla,
    restaurant,
    conservation,
    diesel,
    gas,
    labor,
    maintenance,
    others,
    outsourced,
    rent,
    storage,
  ])

  useEffect(() => {
    planning.editPlannings?.plannings_indirect_costs?.map(
      (cost: any, index) => {
        setAdministrative(cost.administrative_amount!)
        setMaintenance(cost.maintenance_amount!)
        setDiesel(cost.diesel_amount!)
        setGas(cost.gasoline_amount!)
        setArla(cost.arla_amount!)
        setConservation(cost.conservation_amount!)
        setLabor(cost.labor_amount!)
        setStorage(cost.storage_amount!)
        setRestaurant(cost.canteen_amount!)
        setOthers(cost.others_amount!)
        setDiverse(cost.diesel_amount!)
        setRent(cost.rent_amount!)
        setOutsourced(cost.outsource_amount!)
        setSelectedMonth(cost.month!)
        setSelectedYear(cost.year!)
      },
    )
  }, [planning])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
      <Col>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="year-dropdown">
              {selectedYear || 'Select a Year'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {years.map((year) => (
                <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="">
              <Form.Select
                aria-label=""
                onChange={(e) => {
                  return setSelectedMonth(Number(e.target.value))
                }}
              >
                <option value={1}>Janeiro</option>
                <option value={2}>Fevereiro</option>
                <option value={3}>Março</option>
                <option value={4}>Abril</option>
                <option value={5}>Maio</option>
                <option value={6}>Junho</option>
                <option value={7}>Julho</option>
                <option value={8}>Agosto</option>
                <option value={9}>Setembro</option>
                <option value={10}>Outubro</option>
                <option value={11}>Novembro</option>
                <option value={12}>Dezembro</option>
              </Form.Select>
            </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Manutenção</Form.Label>
            <Form.Control
              type="number"
              value={maintenance}
              onChange={(e) => {
                setMaintenance(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Diesel</Form.Label>
            <Form.Control
              type="number"
              value={diesel}
              onChange={(e) => {
                setDiesel(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Gasolina</Form.Label>
            <Form.Control
              type="number"
              value={gas}
              onChange={(e) => {
                setGas(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Arla</Form.Label>
            <Form.Control
              type="number"
              value={arla}
              onChange={(e) => {
                setArla(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Administrativo</Form.Label>
            <Form.Control
              type="number"
              value={administrative}
              onChange={(e) => {
                setAdministrative(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Conservação</Form.Label>
            <Form.Control
              type="number"
              value={conservation}
              onChange={(e) => {
                setConservation(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Mão-de-obra</Form.Label>
            <Form.Control
              type="number"
              value={labor}
              onChange={(e) => {
                setLabor(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Armazenagem</Form.Label>
            <Form.Control
              type="number"
              value={storage}
              onChange={(e) => {
                setStorage(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Cantina</Form.Label>
            <Form.Control
              type="number"
              value={restaurant}
              onChange={(e) => {
                setRestaurant(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Diversos</Form.Label>
            <Form.Control
              type="number"
              value={diverse}
              onChange={(e) => {
                setDiverse(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Arrendo</Form.Label>
            <Form.Control
              type="number"
              value={rent}
              onChange={(e) => {
                setRent(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Terceirizados</Form.Label>
            <Form.Control
              type="number"
              value={outsourced}
              onChange={(e) => {
                setOutsourced(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Outros</Form.Label>
            <Form.Control
              type="number"
              value={others}
              onChange={(e) => {
                setOthers(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}
