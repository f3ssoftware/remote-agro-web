import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { asyncNewTank } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'
import { Tank } from '../../../../models/Tank'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'
import { Dialog } from 'primereact/dialog'

export function NewTankModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [name, setName] = useState('')
  const [fuel, setFuel] = useState('')
  const dispatch = useDispatch<any>()

  const register = () =>{
    const tank: Tank = {
      name: name,
      fuel: fuel
    }
    dispatch(asyncNewTank(tank))
  }
  return (
    <Container>
      <Dialog
      header="Cadastrar Tanque"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      
          <div>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Combustível</Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setFuel(e.target.value)
                    }}
                  >
                    <option value={''}></option>
                    <option value={'Gasolina'}>Gasolina</option>
                    <option value={'Diesel'}>Diesel</option>
                    <option value={'Arla'}>Arla</option>
                  </Form.Select>
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
    </Dialog>
      {/* <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Cadastrar Tanque</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        </Modal.Body>
      </Modal> */}
    </Container>
  )
}


