import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Tabs, Tab } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'

export function NewPlanningCost({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [referenceName, setReferenceName] = useState('')
  const [maintenance, setMaintenance] = useState(0)
  const [description, setDescription] = useState('')
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
  const [key, setKey] = useState('')
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
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

  const register = () => {
    console.log('teste')
  }

  useEffect(() => {
    setOutcomeYear(seasons.selectedSeason.year)
  }, [])

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
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="mb-3"
        >
          {month.map((month, index) => {
            return (
              <Tab eventKey={index} title={month}>
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
                      <Form.Label style={{ color: '#fff' }}>Outros</Form.Label>
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
            register()
          }}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}
