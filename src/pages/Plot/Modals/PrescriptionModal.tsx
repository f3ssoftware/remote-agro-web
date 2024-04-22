import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { PrescriptionDefensive } from '../components/PrescriptionDefensive'
import { PrescriptionFertilizers } from '../components/PrescriptionFertilizers'
import { PrescriptionSeeding } from '../components/PrescriptionSeeding'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { dialogContentSyle, dialogHeaderStyle } from '../../../utils/modal-style.util'
interface Type {
  name: string
  value: string
}

export function PrescriptionModal({
  show,
  handleClose,
  selectedFarm,

}: {
  show: boolean
  handleClose: any
  selectedFarm: any
}) {
  const [prescriptionType, setPrescriptionType] = useState('')
  const type: Type[] = [
    { name: 'Defensivos', value: 'Defensivos' },
    { name: 'Fertilizantes', value: 'Fertilizantes' },
    { name: 'Semeadura', value: 'Semeadura' },
  ]

  useEffect(() => {
    setPrescriptionType('')
  }, [])

  return (
    <Container>
      <Dialog
        header="Receituário"
        visible={show}
        headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle} 
        style={{ width: '50vw' }}
        className="custom-dialog"
        onHide={handleClose}
      >
        <div>
          <Row style={{ marginTop: '2%' }}>
            <Col>
              <Dropdown
                onChange={(e) => {
                  setPrescriptionType(e.target.value)
                }}
                options={type}
                value={prescriptionType}
                optionLabel="name"
                optionValue="value"
                placeholder="Selecione o tipo"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {prescriptionType === 'Defensivos' ? (
                <PrescriptionDefensive
                  selectedFarm={selectedFarm}
                  handleClose={handleClose}
                ></PrescriptionDefensive>
              ) : prescriptionType == 'Fertilizantes' ? (
                <PrescriptionFertilizers
                  selectedFarm={selectedFarm}
                  handleClose={handleClose}
                ></PrescriptionFertilizers>
              ) : prescriptionType == 'Semeadura' ? (
                <PrescriptionSeeding
                  selectedFarm={selectedFarm}
                  handleClose={handleClose}
                ></PrescriptionSeeding>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        </div>
      </Dialog>
    </Container>
  )
}
