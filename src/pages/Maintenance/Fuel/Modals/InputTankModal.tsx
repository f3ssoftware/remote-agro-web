import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { asyncFuel } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'
import { Fuel } from '../../../../models/Fuel'

export function InputTankModal({
  show,
  handleClose,
  id
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch<any>()

  const register = () =>{
    const fuel: Fuel = {
      quantity: quantity,
      date: date.toISOString(),
      tank_id: id,
      type: 'Entrada'

    }
    dispatch(asyncFuel(fuel))
  }
  return (
    <Container>
      <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Tanques</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
          <div>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-2" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Abastecimento</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      setQuantity(Number(e.target.value))
                    }}
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
            </Row>
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
                handleClose()
              }}
            >
              Registrar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}


