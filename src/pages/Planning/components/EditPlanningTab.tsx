import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { PlanningCost } from '../../../models/PlanningCost'
import { RootState } from '../../..'
import { useSelector } from 'react-redux'

export function EditPlanningTab({
  index,
  onHandleUpdate
}: {
  index: number,
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


  useEffect(() => {
    const p: PlanningCost = {
        administrative_amount: administrative,
        arla_amount: arla,
        canteen_amount: restaurant,
        conservation_amount: conservation,
        diesel_amount: diesel,
        diverse_amount:diverse,
        gasoline_amount: gas,
        labor_amount: labor,
        maintenance_amount: maintenance,
        month: 0,
        others_amount: others,
        outsource_amount: outsourced,
        rent_amount: rent,
        storage_amount: storage,
        year: ''

    };
    onHandleUpdate(p, index);
}, [administrative, arla, restaurant,conservation,diesel,gas,labor,maintenance,others,outsourced,rent,storage]);

useEffect(() => {
    
}, [planning])


  return (
    <div>
                <Row style={{ marginTop: '2%' }}>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Manutenção
                      </Form.Label>
                      <Form.Control
                        type="number"
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
                        onChange={(e) => {
                          setDiesel(Number(e.target.value))
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Gasolina
                      </Form.Label>
                      <Form.Control
                        type="number"
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
                      <Form.Label style={{ color: '#fff' }}>
                        Administrativo
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setAdministrative(Number(e.target.value))
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Conservação
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setConservation(Number(e.target.value))
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Mão-de-obra
                      </Form.Label>
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setLabor(Number(e.target.value))
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Armazenagem
                      </Form.Label>
                      <Form.Control
                        type="number"
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
                        onChange={(e) => {
                          setRent(Number(e.target.value))
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Terceirizados
                      </Form.Label>
                      <Form.Control
                        type="number"
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


