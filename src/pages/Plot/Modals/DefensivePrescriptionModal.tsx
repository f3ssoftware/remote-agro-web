import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { Application } from '../../../models/Application'
import {
  asyncPrescription,
  asyncPrescriptionTable,
} from '../../../stores/plot.store'
import { useDispatch } from 'react-redux'
import { NewDefensivePrescription } from '../components/NewDefensivePrescription'

export function DefensivePrescriptionModal({
  show,
  handleClose,
  accountable,
  area,
  applier,
  date,
  applicationType,
  selectedFarm,
  selectedPlot,
  flowRate,
  block,
  pressure,
  tankNumbers,
  tankSyrup,
  fullSyrup,
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
  flowRate: number
  block: string
  pressure: number
  tankNumbers: number
  tankSyrup: number
  fullSyrup: number
}) {
  const [applicationTables, setApplicationTables]: any[] = useState([])
  const dispatch = useDispatch<any>()

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
  const next = () => {
    const defensive: Application = {
      type: 'Defensivos',
      accountable: accountable,
      area: area,
      applier_id: applier.id,
      date: date,
      application_type: applicationType,
      block: block,
      flow_rate: flowRate*1000,
      pressure: pressure*1000,
      number_of_tanks: tankNumbers,
      correct_decimals: true,
      farm_id: selectedFarm.id,
      fields: [{ id: selectedPlot.id, area: area }],
    }
    dispatch(asyncPrescription(defensive))
  }
  const confirm = () => {
    const request: ApplicationTable = {
      application_tables: applicationTables,
    }
    dispatch(asyncPrescriptionTable(request))
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
            <Row>
              <span style={{ color: '#fff' }}>
                Fazenda: {selectedFarm?.name}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>
                Talhões: {selectedPlot?.name}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Data: {date}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Aplicador: {applier?.name}</span>
            </Row>
          </Col>
          <Col>
            <Row>
              <span style={{ color: '#fff' }}>
                Aplicação: {applicationType}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Área aplicada: {area}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Responsável: {accountable}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Bico: {block}</span>
            </Row>
          </Col>
          <Col>
            <Row>
              <span style={{ color: '#fff' }}>
                Pressão: {pressure}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Número de Tanques: {tankNumbers}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Calda/tank: {tankSyrup}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Calda total: {fullSyrup}</span>
            </Row>
          </Col>
        </Row>
        {applicationTables?.map((p: Product, index: number) => {
          return (
            <NewDefensivePrescription
              index={index}
              key={index}
              onHandleRemove={onHandleRemove}
              onHandleUpdate={onHandleUpdate}
              flowRate={flowRate}
              area = {area}
              tankNumbers={tankNumbers}
            ></NewDefensivePrescription>
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
                  next()
                  confirm()
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