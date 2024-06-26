import { useEffect, useRef, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { ApplicationTable } from '../../../models/ApplicationTable'
import { Product } from '../../../models/Product'
import { Application } from '../../../models/Application'
import {
  asyncPrescription,
  asyncPrescriptionTable,
  setApplicationTablesCreated,
  setPrescription,
} from '../../../stores/plot.store'
import { useDispatch, useSelector } from 'react-redux'
import { NewDefensivePrescription } from '../components/NewDefensivePrescription'
import { Dialog } from 'primereact/dialog'
import { RootState } from '../../..'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { Toast } from 'primereact/toast'
import { useFormik } from 'formik'

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
  preassure,
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
  preassure: number
  tankNumbers: number
  tankSyrup: number
  fullSyrup: number
}) {
  const [applicationTables, setApplicationTables]: any[] = useState([])
  const dispatch = useDispatch<any>()
  const { plot } = useSelector((state: RootState) => state)
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [inputAddLineCompsValidation, setInputAddLineCompsValidation] =
    useState<any[]>([false])
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const toast = useRef<Toast>(null)
  const [ProductValidation, setProductValidation] = useState<any[]>([false])

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
      area: area * 100,
      applier_id: applier.id,
      date: date,
      application_type: applicationType,
      block: block,
      flow_rate: flowRate * 100,
      pressure: preassure * 100,
      number_of_tanks: tankNumbers,
      correct_decimals: true,
      farm_id: selectedFarm.id,
      fields: [{ id: selectedPlot.id, area: area * 100 }],
    }
    dispatch(asyncPrescription(defensive))
  }

  const confirm = () => {
    const request: ApplicationTable = {
      application_tables: applicationTables.map((appTable: any) => {
        return { ...appTable, application_id: plot.prescription.id }
      }),
    }
    dispatch(asyncPrescriptionTable(request))
    dispatch(setPrescription({}))
  }

  useEffect(() => {
    console.log(applicationTables)
  }, [applicationTables])

  useEffect(() => {
    if (plot?.prescription.id) {
      confirm()
    }

    if (plot.applicationTablesCreated == true) {
      handleClose()
      dispatch(setApplicationTablesCreated(false))
    }
  }, [plot])

  useEffect(() => {
    dispatch(setPrescription({}))
  }, [])

  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidationsInput = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationProduct = ProductValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )
    next()

    if (
      falseValidationsInput.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (falseValidationProduct.length === 0) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    }
  }

  const formik = useFormik({
    initialValues: {},
    onSubmit,
  })

  return (
    <Dialog
      header="Receituário"
      visible={show}
      style={{ width: '70vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <Toast ref={toast} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
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
              <span style={{ color: '#fff' }}>Pressão: {preassure}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>
                Número de Tanques: {tankNumbers}
              </span>
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
              area={area}
              tankNumbers={tankNumbers}
              isRegisterClicked={isRegisterClicked}
              inputAddLineCompsValidation={inputAddLineCompsValidation}
              setInputAddLineCompsValidation={setInputAddLineCompsValidation}
              inputAddLineValidation={inputAddLineValidation}
              setInputAddLineValidation={setInputAddLineCompsValidation}
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
                type="submit"
                onClick={() => {
                  setIsRegisterClicked(true)
                  setTimeout(() => {
                    setIsRegisterClicked(false)
                  }, 1000)
                }}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </Dialog>
  )
}
