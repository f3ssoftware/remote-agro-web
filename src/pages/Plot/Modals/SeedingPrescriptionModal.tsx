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
import { Dialog } from 'primereact/dialog'
import { RootState } from '../../..'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { NewSeedingPrescription } from '../components/NewSeedingPrescription'
import { Toast } from 'primereact/toast'
import { useFormik } from 'formik'

export function SeedingPrescriptionModal({
  show,
  handleClose,
  accountable,
  area,
  applier,
  date,
  selectedFarm,
  selectedPlot,
  fertilizing,
  seedQuantity,
  lineSpacing,
  jet,
  seed,
  flowRate,
  product,
  productQuantity,
}: {
  show: boolean
  handleClose: any
  accountable: string
  area: number
  applier: any
  date: string
  selectedFarm: any
  selectedPlot: any
  fertilizing: string
  seedQuantity: number
  lineSpacing: number
  jet: string
  seed: any
  flowRate: number
  product: any
  productQuantity: number
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
    console.log(applicationTables)
  }

  const addLine = () => {
    const newApplicationTable = [...applicationTables]
    newApplicationTable.push({ product_id: 0, quantity: 0 })
    setApplicationTables(newApplicationTable)
  }
  const next = () => {
    const seeding: Application = {
      type: 'Semeadura',
      pressure: 0,
      accountable: accountable,
      area: area * 100,
      is_pms: false,
      block: 'Não selecionado',
      applier_id: applier.id,
      date: date,
      user_fertilizer_id: product.id,
      fertilizer_quantity: productQuantity * 1000,
      fertilizer_total_quantity: productQuantity * 1000 * area,
      user_seed_id: seed.id,
      seed_quantity: seedQuantity * 1000,
      seed_total_quantity: seedQuantity * 1000 * area,
      lines_spacing: lineSpacing,
      flow_rate: flowRate * 100,
      farm_id: selectedFarm.id,
      correct_decimals: true,
      fields: [{ id: selectedPlot.id, area: area * 100 }],
    }
    dispatch(asyncPrescription(seeding))
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
      style={{ width: '50vw' }}
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
              <span style={{ color: '#fff' }}>Área aplicada: {area}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Responsável: {accountable}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>
                Possui adubação: {fertilizing}
              </span>
            </Row>
            {fertilizing == 'Sim' ? (
              <>
                <Row>
                  <span style={{ color: '#fff' }}>
                    Produtos: {product?.name}
                  </span>
                </Row>
                <Row>
                  <span style={{ color: '#fff' }}>
                    Dose/ha(kg): {productQuantity}
                  </span>
                </Row>
              </>
            ) : (
              <div></div>
            )}
          </Col>
          <Col>
            <Row>
              <span style={{ color: '#fff' }}>
                Semente/Cultivar: {seed.name}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>População: {seedQuantity}</span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>
                Espaçamento entre linhas: {lineSpacing}
              </span>
            </Row>
            <Row>
              <span style={{ color: '#fff' }}>Possui jato dirigido: {jet}</span>
            </Row>
            {jet == 'Sim' ? (
              <>
                <Row>
                  <span style={{ color: '#fff' }}>Vazão(L/ha): {flowRate}</span>
                </Row>
              </>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
        {applicationTables?.map((p: Product, index: number) => {
          return (
            <NewSeedingPrescription
              index={index}
              key={index}
              onHandleRemove={onHandleRemove}
              onHandleUpdate={onHandleUpdate}
              isRegisterClicked={isRegisterClicked}
              inputAddLineCompsValidation={inputAddLineCompsValidation}
              setInputAddLineCompsValidation={setInputAddLineCompsValidation}
              inputAddLineValidation={inputAddLineValidation}
              setInputAddLineValidation={setInputAddLineCompsValidation}
            ></NewSeedingPrescription>
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
