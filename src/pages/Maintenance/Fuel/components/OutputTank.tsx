import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { asyncFuel } from '../../../../stores/maintenance.store'
import { useDispatch, useSelector } from 'react-redux'
import { Fuel } from '../../../../models/Fuel'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../../..'

export function OutputTank({
  id,
}: {
  id: number
}) {
  const [quantity, setQuantity] = useState(0)
  const [accountable, setAccountable] = useState('')
  const [kilometers, setKilometers] = useState(0)
  const [date, setDate] = useState(new Date())
  const [goodId, setGoodId] = useState({ id: 0 })
  const [motorHour, setMotorHour] = useState(0)
  const { maintenance } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  const save = () =>{
    const fuel: Fuel = {
      quantity: quantity,
      kilometers: kilometers,
      good_id: goodId.id,
      motor_hours: motorHour,
      accountable: accountable,
      date: date.toISOString(),
      tank_id: id,
      type: 'Saida'

    }
    dispatch(asyncFuel(fuel))
  }
  return (
    <Container>
          <div>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Bem</Form.Label>
                  <Typeahead
                    id="good"
                    onChange={(selected: any) => {
                      if (selected.length > 0) {
                        setGoodId({ id: selected[0].id })
                      }
                    }}
                    options={maintenance.goods.map((input) => {
                      return { id: input.id, label: input?.name }
                    })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Data</Form.Label>
                  <DatePicker
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Motor/hora</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setMotorHour(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Litros</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setQuantity(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-2" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Quilometragem
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setKilometers(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setAccountable(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <div
                  style={{
                    justifyContent: 'space-evenly',
                    marginTop: '25%',
                  }}
                >
                  <Button
                    variant="success"
                    onClick={() => {
                      save()
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
    </Container>
  )
}
