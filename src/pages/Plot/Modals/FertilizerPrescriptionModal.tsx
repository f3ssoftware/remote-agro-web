import { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { NewFertilizerPrescription } from '../components/NewFertilizerPrescription'
import { Application } from '../../../models/Application'
import {
  asyncPrescription,
  asyncPrescriptionTable,
  setApplicationTablesCreated,
  setPrescription,
} from '../../../stores/plot.store'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog } from 'primereact/dialog'
import { RootState } from '../../..'
import { dialogContentSyle, dialogHeaderStyle } from '../../../utils/modal-style.util'

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
  const { plot } = useSelector((state: RootState) => state);

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
      fertilizer_quantity: 0,
      flow_rate:0,
      pressure:0,
      fertilizer_total_quantity: 0,
      seed_quantity: 0,
      seed_total_quantity: 0,
      is_pms: false,
      lines_spacing: 0,
      accountable: accountable,
      area: area*100,
      applier_id: applier.id,
      date: date,
      application_type: applicationType,
      correct_decimals: true,
      farm_id: selectedFarm.id,
      fields: [{ id: selectedPlot.id, area: (area*100) }],
    }
    dispatch(asyncPrescription(fertilizer))
  }
  const confirm = () => {

    const request: ApplicationTable = {
      application_tables: applicationTables.map((appTable: any) => { return { ...appTable, application_id: plot.prescription.id } })
    }
    dispatch(asyncPrescriptionTable(request))
    dispatch(setPrescription({}));
  }

  useEffect(() => {
    if (plot?.prescription.id) {
      confirm();
    }
    
    if(plot.applicationTablesCreated == true) {
      handleClose()
      dispatch(setApplicationTablesCreated(false))
    }
  }, [plot])
  useEffect(() => {
    dispatch(setPrescription({}));
  }, [])
  
  return (
    <Dialog
      header="Receituário"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
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
                next()
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
