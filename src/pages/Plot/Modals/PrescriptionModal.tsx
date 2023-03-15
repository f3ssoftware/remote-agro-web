import { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { PrescriptionDefensive } from '../components/PrescriptionDefensive'
import { NewPrescriptionModal } from './NewPrescriptionModal'
import { PrescriptionFertilizers } from '../components/PrescriptionFertilizers'
import { PrescriptionSeeding } from '../components/PrescriptionSeeding'

export function PrescriptionModal({
  show,
  handleClose,
  selectedFarm
}: {
  show: boolean
  handleClose: any
  selectedFarm: any
}) {
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)
  const [prescriptionType, setPrescriptionType] = useState('Defensivos')
  return (
    <Container>
      <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Receituário</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
          <div>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Selecione um tipo
                  </Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setPrescriptionType((e.target.value))
                    }}
                  >
                    <option value={'Defensivos'}>Defensivos</option>
                    <option value={'Fertilizantes'}>Fertilizantes</option>
                    <option value={'Semeadura'}>Semeadura</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {prescriptionType === 'Defensivos' ? (
                  <PrescriptionDefensive selectedFarm={selectedFarm} handleClose={handleClose}></PrescriptionDefensive>
                ) : prescriptionType == 'Fertilizantes' ? (
                  <PrescriptionFertilizers selectedFarm={selectedFarm} handleClose={handleClose}></PrescriptionFertilizers>
                ) : (
                  <PrescriptionSeeding></PrescriptionSeeding>
                )}
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
              style={{ backgroundColor: '#A5CD33', color: '#000' }}
              variant="success"
              onClick={() => {
                handleClose(), setShowNewPrescriptionModal(true)
              }}
            >
              Avançar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <NewPrescriptionModal
        show={showNewPrescriptionModal}
        handleClose={() => setShowNewPrescriptionModal(false)}
      ></NewPrescriptionModal>
    </Container>
  )
}
