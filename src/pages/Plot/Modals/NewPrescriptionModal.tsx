import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { NewPrescription } from '../components/NewPrescription'

export function NewPrescriptionModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [applicationTables, setApplicationTables]: any[] = useState([])

  const onHandleRemove = (index: number) => {
    const newApplicationTable = [...applicationTables]
    newApplicationTable.splice(index, 1)
    setApplicationTables(newApplicationTable)
  }

  const onHandleUpdate = (index: number, applicationTable: ApplicationTable) => {
    const newApplicationTables = [...applicationTables]
    newApplicationTables.splice(index, 1)
    newApplicationTables.push(applicationTable)
    setApplicationTables(newApplicationTables)
    console.log(applicationTables)
  }

  const addLine = () => {
    const newApplicationTable = [...applicationTables]
    newApplicationTable.push({ product_id: 0, quantity: 0 })
    setApplicationTables(newApplicationTable)
  }
  return (
    <Modal show={show} onHide={handleClose} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>Receituário</span>
          <div>Info receituario anterior</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        {applicationTables?.map((p: Product, index: number) => {
          return (
            <NewPrescription
              index={index}
              key={index}
              onHandleRemove={onHandleRemove}
              onHandleUpdate={onHandleUpdate}
            ></NewPrescription>
          )
        })}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '2%',
          }}
        >
          <Row>
            <Col>
              <Button variant="success" onClick={() => addLine()}>Adicionar linha</Button>
            </Col>
            <Col>
              <Button
                style={{ backgroundColor: '#A5CD33', color: '#000' }}
                variant="success"
                onClick={() => {
                  handleClose()
                }}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  )
}
