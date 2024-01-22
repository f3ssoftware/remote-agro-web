import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { NewFertilizerPrescription } from '../components/NewFertilizerPrescription'
import { Application } from '../../../models/Application'
import {
  asyncPrescription,
  asyncPrescriptionTable,
} from '../../../stores/plot.store'
import { useDispatch } from 'react-redux'
import { Dialog } from 'primereact/dialog'

export function FertilizerPrescriptionModal({
  show,
  accountable,
  area,
  applier,
  date,
  applicationType,
  selectedFarm,
  selectedPlot,
  handleClose,
}: {
  show: boolean
  accountable: string
  area: number
  applier: any
  date: string
  applicationType: string
  selectedFarm: any
  selectedPlot: any
  handleClose: any
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
    const fertilizer: Application = {
      type: 'Fertilizantes',
      accountable: accountable,
      area: area,
      applier_id: applier.id,
      date: date,
      application_type: applicationType,
      correct_decimals: true,
      farm_id: selectedFarm.id,
      fields: [{ id: selectedPlot.id, area: area }],
    }
    dispatch(asyncPrescription(fertilizer))
  }
  const confirm = () => {
    const request: ApplicationTable = {
      application_tables: applicationTables,
    }
    dispatch(asyncPrescriptionTable(request))
  }
  return (
    <Dialog
      header="Receituário"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={{ backgroundColor: '#7C5529' }}
      contentStyle={{ backgroundColor: '#7C5529' }}
    >
      <Row>
        <Col>
          <Row>
            <span style={{ color: '#fff' }}>Fazenda: {selectedFarm?.name}</span>
          </Row>
          <Row>
            <span style={{ color: '#fff' }}>Talhões: {selectedPlot?.name}</span>
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
            <span style={{ color: '#fff' }}>Aplicação: {applicationType}</span>
          </Row>
          <Row>
            <span style={{ color: '#fff' }}>Área aplicada: {area}</span>
          </Row>
          <Row>
            <span style={{ color: '#fff' }}>Responsável: {accountable}</span>
          </Row>
        </Col>
      </Row>
      {applicationTables?.map((p: Product, index: number) => {
        return (
          <NewFertilizerPrescription
            index={index}
            key={index}
            onHandleRemove={onHandleRemove}
            onHandleUpdate={onHandleUpdate}
          ></NewFertilizerPrescription>
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
    </Dialog>
  )
}
