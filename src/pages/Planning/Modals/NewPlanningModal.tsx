import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { NewPlanning } from '../components/NewPlanning'
import { NewPlanningCost } from '../components/NewPlanningCost'
import { Dropdown } from 'primereact/dropdown'
import { Dialog } from 'primereact/dialog'

interface Type {
  name: string
  value: number
}

export function NewPlanningModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [registrationType, setRegistrationType] = useState(1)
  const option: Type[] = [
    { name: 'Insumos', value: 1 },
    { name: 'Outros custos', value: 2 },
  ]

  return (
    <Dialog
      header="Novo planejamento"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={{ backgroundColor: '#7C5529' }}
      contentStyle={{ backgroundColor: '#7C5529' }}
    >
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Dropdown
            value={registrationType}
            onChange={(e) => {
              setRegistrationType(e.target.value)
            }}
            options={option}
            optionLabel="name"
            optionValue="value"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      {registrationType === 1 ? (
        <NewPlanning
          show={false}
          handleClose={() => handleClose()}
        ></NewPlanning>
      ) : (
        <NewPlanningCost
          show={false}
          handleClose={() => handleClose()}
        ></NewPlanningCost>
      )}
    </Dialog>
  )
  
}
