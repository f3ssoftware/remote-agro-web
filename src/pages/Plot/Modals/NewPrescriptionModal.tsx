import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { NewPrescription } from '../components/NewPrescription'

export function NewPrescriptionModal({
  show,
  handleClose,
  accountable,
  area,
  applier,
  date,
  applicationType,
  selectedFarm,
  selectedPlot,
}: {
  show: boolean
  handleClose: any
  accountable: string
  area: number
  applier: any
  date: string
  applicationType: string
  selectedFarm: any
  selectedPlot: any
}) {
  const [applicationTables, setApplicationTables]: any[] = useState([])

  const onHandleRemove = (index: number) => {
    const newApplicationTable = [...applicationTables]
    newApplicationTable.splice(index, 1)
    setApplicationTables(newApplicationTable)
  }

  const onHandleUpdate = (
    index: number,
    applicationTable: ApplicationTable,
  ) => {
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
      <Row>
          <Col>
          <Row><span style={{ color: '#fff' }}>Fazenda: {selectedFarm?.name}</span></Row>
          <Row><span style={{ color: '#fff' }}>Talhões: {selectedPlot?.name}</span></Row>
          <Row><span style={{ color: '#fff' }}>Data: {date}</span></Row>
          <Row><span style={{ color: '#fff' }}>Aplicador: {applier?.name}</span></Row>
          </Col>
          <Col>
          <Row><span style={{ color: '#fff' }}>Aplicação: {applicationType}</span></Row>
          <Row><span style={{ color: '#fff' }}>Área aplicada: {area}</span></Row>
          <Row><span style={{ color: '#fff' }}>Responsável: {accountable}</span></Row>
          </Col>
        </Row>
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
              <Button variant="success" onClick={() => addLine()}>
                Adicionar linha
              </Button>
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
