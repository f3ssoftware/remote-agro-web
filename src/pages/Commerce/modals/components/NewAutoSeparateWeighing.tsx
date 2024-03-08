import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import {
  asyncFetchContractsData,
  asyncFetchCultivations,
} from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { calculateHumidityDiscount } from './weighingsHelpers'
import {
  asyncSeparateWeighing,
  asyncUpdateSeparateWeighing,
} from '../../../../stores/commerce.store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AutoConfirmationModal } from '../CommerceWeighingModal/AutoConfirmationModal'
import { SeparateWeighingRow } from '../../../../models/SepareteWeighingRow'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { Contract } from '../../../../models/Contract'
import { DeleteConfirmationModal } from '../CommerceWeighingModal/DeleteConfirmationModal'
import { GeneratePdf } from './GeneratePdf/GeneratePdf'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'

export function NewAutoSeparateWeighing({
  index,
  autoSeparateWeighing,
}: {
  index: number
  autoSeparateWeighing: SeparateWeighingRow
}) {
  const dispatch = useDispatch<any>()
  const { financial, commerce } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState(null)
  const [selectedContract, setSelectedContract]: any = useState(null)
  const [carPlate, setCarPlate] = useState('')
  const [driver, setDriver] = useState('')
  const [netWeighing, setNetWeighing] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [humidityDiscount, setHumidityDiscount] = useState(0)
  const [impurity, setImpurity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalWeighning, setTotalWeighning] = useState(0)
  const [observation, setObservation] = useState('')
  const [company, setCompany] = useState('')
  const [reference, setReference] = useState('')
  const [grossWeighing, setGrossWeighing] = useState(0)
  const [tare, setTare] = useState(0)
  const [showWeighingConfirmationModal, setShowWeighingConfirmationModal] =
    useState(false)
  const [showTareConfirmationModal, setShowTareConfirmationModal] =
    useState(false)
  const [grossWeightDate, setGrossWeightDate] = useState('')
  const [tareWeightDate, setTareWeightDate] = useState('')
  const [id, setId] = useState<number>()
  const [showAutoInputDeleteModal, setShowAutoInputDeleteModal] =
    useState(false)
  const [cultivationList, setCultivationList] = useState<any[]>([])
  const [contractList, setContractList] = useState<any[]>([])
  const toast = useRef<Toast>(null)

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchCultivations())
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing - tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity < 1 ? 0 : impurity - 1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(
      calculateHumidityDiscount(humidity, selectedCultivation?.id),
    )
  }, [humidity])

  useEffect(() => {
    fillFormEdit()
  }, [financial])

  useEffect(() => {
    setTotalDiscount(discount + humidityDiscount)
  }, [discount, humidityDiscount])

  useEffect(() => {
    setTotalWeighning(netWeighing * ((100 - totalDiscount) / 100))
  }, [netWeighing, totalDiscount])

  const fetchCultivation = () => {
    return financial?.cultivations?.map((cultivation: Cultivation) => {
      return { id: cultivation.id, label: cultivation.name, ...cultivation }
    })
  }

  const fetchContract = () => {
    return financial?.contracts?.map((contract: any) => {
      return { id: contract.id, label: contract.name, ...contract }
    })
  }

  const autoCompleteCultivations = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = cultivationList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setCultivationList(resultSet)
    } else {
      setCultivationList(fetchCultivation())
    }
  }

  const autoCompleteContracts = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = contractList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setContractList(resultSet)
    } else {
      setContractList(fetchContract())
    }
  }

  const fillFormEdit = () => {
    if (autoSeparateWeighing?.id) {
      setSelectedCultivation(
        financial?.cultivations?.filter(
          (cultivation: Cultivation) =>
            cultivation?.id === autoSeparateWeighing?.cultivation_id,
        )[0],
      )
      setSelectedContract(
        financial?.contracts.filter(
          (contract: Contract) =>
            contract?.id === autoSeparateWeighing?.contract_id,
        )[0],
      )
      setReference(autoSeparateWeighing?.reference!)
      setCarPlate(autoSeparateWeighing?.car_plate!)
      setDriver(autoSeparateWeighing?.car_driver!)
      setCompany(autoSeparateWeighing?.shipping_company!)
      setGrossWeighing(autoSeparateWeighing?.gross_weight!)
      setNetWeighing(autoSeparateWeighing?.net_weight!)
      setHumidity(autoSeparateWeighing?.humidity! / 100)
      setImpurity(autoSeparateWeighing?.impurity! / 100)
      setDiscount(autoSeparateWeighing?.discount! / 100)
      setTotalWeighning(autoSeparateWeighing?.final_weight!)
      setHumidityDiscount(Number(autoSeparateWeighing?.humidity_discount!))
      setTare(autoSeparateWeighing?.tare_weight!)
      setObservation(autoSeparateWeighing?.observations!)
    }
  }

  const Save = () => {
    const autoSeparate = {
      weighings: {
        contract_id: selectedContract.id,
        cultivation_id: selectedCultivation.id,
        reference: reference,
        gross_weight: grossWeighing,
        net_weight: netWeighing,
        humidity: humidity * 100,
        impurity: impurity * 100,
        discount: discount * 100,
        final_weight: totalWeighning * 1000,
        type: 'Única',
        shipping_company: company,
        humidity_discount: humidityDiscount.toString(),
        total_discount: totalDiscount.toString(),
        observations: observation,
        tare_weight: tare,
        mode: 'Automático',
        car_plate: carPlate,
        car_driver: driver,
        gross_weight_date: grossWeightDate,
        tare_weight_date: tareWeightDate,
        weighing_date: new Date().toISOString(),
      },
    }
    if (!autoSeparateWeighing.id) {
      dispatch(asyncSeparateWeighing(autoSeparate))
    } else {
      dispatch(
        asyncUpdateSeparateWeighing(
          autoSeparateWeighing?.id!,
          autoSeparate,
          index,
          WeighingRowType.AUTOMATIC,
        ),
      )
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          cultivation: selectedCultivation ? selectedCultivation?.name : '',
          contract: selectedContract ? selectedContract?.name : '',
        }}
        validationSchema={Yup.object({
          cultivation: Yup.string().required('Necessário preencher'),
          contract: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          Save()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={reference}
                    onChange={(e) => {
                      setReference(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />

                  <label htmlFor="reference">Referência</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Referência</Form.Label>
            <Form.Control
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
              <Col md={2}>
              <span className="p-float-label">
                  <AutoComplete
                    field="name"
                    value={formik.values.cultivation}
                    suggestions={cultivationList}
                    completeMethod={autoCompleteCultivations}
                    onChange={(e: any) => {
                      formik.setFieldValue('cultivation', e.target.value)
                      setSelectedCultivation(e.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.cultivation && formik.errors.cultivation,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.cultivation && formik.errors.cultivation ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.cultivation as ReactNode}
                    </div>
                  ) : null}
                  <label htmlFor="farm">Cultivo</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{color:'#000'}}>Cultura</Form.Label>
            <Typeahead
              id="cultivation"
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0]);
              }}
              options={financial.cultivations.map((cultivation: Cultivation) => {
                return { id: cultivation.id, label: cultivation.name, ...cultivation }
              })}
            />
          </Form.Group> */}
              </Col>
              <Col md={2}>
              <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.contract}
                    suggestions={contractList}
                    completeMethod={autoCompleteContracts}
                    onChange={(e: any) => {
                      setSelectedContract(e.value)
                      formik.setFieldValue('contract', e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.contract && formik.errors.contract,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.contract && formik.errors.contract ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contract as ReactNode}
                    </div>
                  ) : null}
                  <label htmlFor="farm">Contratos</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Contratos</Form.Label>
            <Typeahead
              id="contract"
              onChange={(selected: any) => {
                setSelectedContract(selected[0])
              }}
              options={financial?.contracts?.map((contract: any) => {
                return { id: contract.id, label: contract.name, ...contract }
              })}
            />
          </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={carPlate}
                    onChange={(e) => {
                      setCarPlate(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />

                  <label htmlFor="carPlate">Placa</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Placa</Form.Label>
            <Form.Control
              type="text"
              value={carPlate}
              onChange={(e) => {
                setCarPlate(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={driver}
                    onChange={(e) => {
                      setDriver(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />

                  <label htmlFor="driver">Motorista</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Motorista</Form.Label>
            <Form.Control
              type="text"
              value={driver}
              onChange={(e) => {
                setDriver(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />

                  <label htmlFor="company">Transportadora</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Transportadora</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Peso Bruto</Form.Label>
                  {grossWeighing == 0 ? (
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowWeighingConfirmationModal(true)
                      }}
                    >
                      Receber
                    </Button>
                  ) : (
                    <Form.Control
                      type="number"
                      disabled
                      value={grossWeighing}
                    />
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Tara</Form.Label>
                  {tare == 0 ? (
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowTareConfirmationModal(true)
                      }}
                    >
                      Receber
                    </Button>
                  ) : (
                    <Form.Control type="number" disabled value={tare} />
                  )}
                </Form.Group>
              </Col>
              <Col style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputNumber
                    value={netWeighing}
                    onValueChange={(e) => {
                      setNetWeighing(Number(e.value))
                    }}
                    disabled
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="netWeigh">Peso líquido</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso líquido</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={netWeighing}
              onChange={(e) => {
                setNetWeighing(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={humidity}
                    onValueChange={(e) => {
                      setHumidity(Number(e.value))
                    }}
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">UMID (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>UMID (%)</Form.Label>
            <Form.Control
              type="number"
              value={humidity}
              onChange={(e) => {
                setHumidity(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={humidityDiscount}
                    onValueChange={(e) => {
                      setHumidityDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto UMID (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Desconto UMID (%)</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={humidityDiscount}
              onChange={(e) => {
                setHumidityDiscount(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={impurity}
                    onValueChange={(e) => {
                      setImpurity(Number(e.value))
                    }}
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Impureza (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Impureza (%)</Form.Label>
            <Form.Control
              type="number"
              value={impurity}
              onChange={(e) => {
                setImpurity(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={discount}
                    onValueChange={(e) => {
                      setDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Desconto (%)</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={discount}
              onChange={(e) => {
                setDiscount(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputNumber
                    value={totalDiscount}
                    onValueChange={(e) => {
                      setTotalDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto total (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>
              Desconto total (%)
            </Form.Label>
            <Form.Control
              type="number"
              disabled
              value={totalDiscount}
              onChange={(e) => {
                setTotalDiscount(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputNumber
                    value={totalWeighning}
                    onValueChange={(e) => {
                      setTotalWeighning(Number(e.value))
                    }}
                    disabled
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="netWeigh">Peso Final</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso final</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={totalWeighning}
              onChange={(e) => {
                setTotalWeighning(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Col style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputText
                    value={observation}
                    onChange={(e) => {
                      setObservation(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />

                  <label htmlFor="observation">Observações</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Observações</Form.Label>
            <Form.Control
              type="text"
              value={observation}
              onChange={(e) => {
                setObservation(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
            </Row>
            <AutoConfirmationModal
              setValue={setGrossWeighing}
              show={showWeighingConfirmationModal}
              handleClose={() => setShowWeighingConfirmationModal(false)}
              setWeightDate={setGrossWeightDate}
            ></AutoConfirmationModal>
            <AutoConfirmationModal
              setValue={setTare}
              show={showTareConfirmationModal}
              handleClose={() => setShowTareConfirmationModal(false)}
              setWeightDate={setTareWeightDate}
            ></AutoConfirmationModal>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: '2%',
              }}
            >
              <Button
                variant="danger"
                onClick={() => {
                  setId(autoSeparateWeighing?.id!)
                  setShowAutoInputDeleteModal(true)
                }}
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </Button>
              <Button
                variant="success"
                type='submit'
                // onClick={() => {
                //   Save()
                // }}
              >
                {autoSeparateWeighing?.id ? 'Atualizar' : 'Salvar'}
              </Button>
              {autoSeparateWeighing?.id ? (
                <GeneratePdf
                  weighing={autoSeparateWeighing}
                  contractsList={financial?.contracts}
                  cultivationsList={financial?.cultivations}
                  profile={JSON.parse(sessionStorage.getItem('user')!)}
                ></GeneratePdf>
              ) : (
                <></>
              )}
              <DeleteConfirmationModal
                show={showAutoInputDeleteModal}
                handleClose={() => setShowAutoInputDeleteModal(false)}
                id={id!}
                index={index}
                weighingType={autoSeparateWeighing.type!}
              ></DeleteConfirmationModal>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
