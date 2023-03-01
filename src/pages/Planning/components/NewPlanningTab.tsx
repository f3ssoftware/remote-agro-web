import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { PlanningCost } from '../../../models/PlanningCost'

export function NewPlanningTab({
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


  return (
    <div>
                <Row style={{ marginTop: '2%' }}>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Manutenção
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setMaintenance(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Diesel</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setDiesel(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setGas(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Arla</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setArla(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setAdministrative(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setConservation(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setLabor(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setStorage(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setRestaurant(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Diversos</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setDiverse(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Arrendo</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setRent(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
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
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setOutsourced(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Outros</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          if (isNaN(Number(e.currentTarget.value))) {
                              e.currentTarget.value = '';
                          } else {
                              setOthers(Number(e.currentTarget.value));
                              e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                          }
  
                      }} onKeyUp={(e) => {
                          if (e.key === 'Backspace') {
                              e.currentTarget.value = '';
                          }
                      }}/>
                    </Form.Group>
                  </Col>
                </Row>
    </div>
  )
}


