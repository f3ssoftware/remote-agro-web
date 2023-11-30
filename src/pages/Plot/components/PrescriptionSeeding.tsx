import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Applier } from '../../../models/Applier'
import { Product } from '../../../models/Product'
import {
  asyncFetchApplicationData,
  asyncFetchAppliers,
  asyncPrescription,
} from '../../../stores/plot.store'
import { asyncFetchInput } from '../../../stores/input.store'
import { Application } from '../../../models/Application'
import { SeedingPrescriptionModal } from '../Modals/SeedingPrescriptionModal'
import { Formik } from 'formik'
import { Toast } from 'primereact/toast'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'

interface Type {
  name: string
  value: string
}

export function PrescriptionSeeding({
  handleClose,
  selectedFarm,
}: {
  handleClose: any
  selectedFarm: any
}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [fertilizing, setFertilizing] = useState('')
  const [seedQuantity, setSeedQuantity] = useState(0)
  const [lineSpacing, setLineSpacing] = useState(0)
  const [jet, setJet] = useState('')
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot, input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [seed, setSeed] = useState({ id: 0 })
  const [flowRate, setFlowRate] = useState(0)
  const [product, setProduct] = useState({ id: 0 })
  const [area, setArea] = useState(0)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)
  const [productQuantity, setProductQuantity] = useState(0)
  const toast = useRef<Toast>(null)
  const type: Type[] = [
    { name: 'Sim', value: 'Sim' },
    { name: 'Não', value: 'Não' },
  ]
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>();


  useEffect(() => {
    dispatch(
      asyncFetchAppliers({
        user_id: JSON.parse(sessionStorage.getItem('user')!).user_id,
      }),
    )
    dispatch(asyncFetchApplicationData())
    dispatch(asyncFetchInput())
  }, [])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const resultSet = input.generalProductsList.filter(product => product.name.includes(event.query));
    setProductList(resultSet);

    useEffect(() => {
      if (input.inputs) {
          setProductList(input.inputs
            .filter((product: Product) => {
              return (
                  product.product?.class !== "SEMENTE"
              );
          })
            .map((input) => {
              return {
                id: input.id,
                label: `${input?.product?.name}`,
              }
            }))
      }
  }, [input])
}

  // const next = () => {
  //   const seeding: Application = {
  //     type: 'Semeadura',
  //     accountable: accountable,
  //     area: area,
  //     applier_id: selectedApplier.id,
  //     date: dateTime.toISOString(),
  //     fertilizer_id: product.id,
  //     fertilizer_quantity: productQuantity,
  //     seed_id: seed.id,
  //     seed_quantity: seedQuantity,
  //     lines_spacing: lineSpacing,
  //     flow_rate: flowRate,
  //     farm_id: selectedFarm.id,
  //     correct_decimals: true,
  //     fields: [{ id: selectedPlot.id, area: area }],
  //   }
  //   dispatch(asyncPrescription(seeding))
  // }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          accountable: '',
          dateTime: '',
          productQuantity: null,
          seedQuantity: null,
          lineSpacing: null,
          flowRate: null,
          jet: '',
          fertilizing: '',
        }}
        validationSchema={Yup.object({
          accountable: Yup.string().required('Necessário preencher'),
          dateTime: Yup.string().required('Necessário preencher'),
          productQuantity: Yup.string().required('Necessário preencher'),
          seedQuantity: Yup.string().required('Necessário preencher'),
          lineSpacing: Yup.string().required('Necessário preencher'),
          flowRate: Yup.string().required('Necessário preencher'),
          jet: Yup.string().required('Necessário preencher'),
          fertilizing: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          handleClose()
          setShowNewPrescriptionModal(true)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="accountable"
                    name="accountable"
                    value={formik.values.accountable}
                    onChange={(e) => {
                      formik.setFieldValue('accountable', e.target.value)
                      setAccountable(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.accountable && formik.errors.accountable,
                    })}
                  />
                  {formik.touched.accountable && formik.errors.accountable ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.accountable}
                    </div>
                  ) : null}
                  <label htmlFor="accountable">Responsável</label>
                </span>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Talhões</Form.Label>
                  {selectedFarm?.fields?.length > 0 ? (
                    <Typeahead
                      id="field"
                      selected={selectedFarm?.fields?.filter(
                        (field: any) => field?.id === selectedPlot?.id,
                      )}
                      labelKey={(selected: any) => selected?.name}
                      isInvalid={!selectedPlot?.id}
                      onChange={(selected: any) => {
                        setSelectedPlot(selected[0])
                      }}
                      options={selectedFarm?.fields?.map((field: any) => {
                        return { id: field.id, label: field.name, ...field }
                      })}
                    />
                  ) : (
                    <></>
                  )}
                </Form.Group>
                {selectedPlot?.total_area > 0 ? (
                  <>
                    <Form.Range
                      min={0}
                      max={selectedPlot?.total_area}
                      value={area}
                      onChange={(e) => {
                        return setArea(Number(e.target.value))
                      }}
                    />
                    <Form.Label>Área aplicada: {area}</Form.Label>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              {' '}
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Aplicador</Form.Label>
                  <Typeahead
                    id="applier"
                    onChange={(selected: any) => {
                      setSelectedApplier(selected[0])
                    }}
                    selected={plot?.appliers?.filter(
                      (applier: any) => applier?.id === selectedApplier?.id,
                    )}
                    labelKey={(selected: any) => {
                      return `${selected?.name}`
                    }}
                    isInvalid={!selectedApplier?.id}
                    options={plot?.appliers?.map((applier: Applier) => {
                      return { id: applier.id, label: applier.name, ...applier }
                    })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="p-float-label">
                  <Calendar
                    onChange={(e: any) => {
                      formik.setFieldValue('dateTime', e.target.value)
                      setDateTime(e.value!)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.dateTime && formik.errors.dateTime,
                    })}
                    locale="en"
                    dateFormat="dd/mm/yy"
                  />
                  {formik.touched.dateTime && formik.errors.dateTime ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.dateTime}
                    </div>
                  ) : null}
                  <label htmlFor="date">Data de plantio</label>
                </span>
              </Col>
              <Col>
              <Dropdown
                    value={formik.values.fertilizing}
                    onChange={(e) => {
                      formik.setFieldValue('fertilizing', e.target.value)
                      setFertilizing(e.target.value)
                    }}
                    options={type}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Possui adubação?"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.fertilizing && formik.errors.fertilizing ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.fertilizing}
                    </div>
                  ) : null}
              </Col>
              {fertilizing == 'Sim' ? (
                <>
                <Col>
                <span className="p-float-label">
                    <AutoComplete field="label" value={selectedProduct} suggestions={productList} completeMethod={autoComplete} onChange={(e: any) => {
                        setSelectedProduct(e.value);
                    }} dropdown style={{ width: '100%' }} />
                    <label htmlFor="endDate">Produto</label>
                </span>
            </Col>
                  {/* <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Produtos
                      </Form.Label>
                      <Typeahead
                        id="product_input"
                        onChange={(selected: any) => {
                          if (selected.length > 0) {
                            setProduct({ id: selected[0].id })
                          }
                        }}
                        options={input.inputs
                          .filter((i) => i.product?.class !== 'SEMENTE')
                          .map((input) => {
                            return {
                              id: input.id,
                              label: `${input?.product?.name}`,
                            }
                          })}
                      />
                    </Form.Group>
                  </Col> */}
                  <Col>
                    <span className="p-float-label">
                      <InputNumber
                        id="productQuantity"
                        value={formik.values.productQuantity}
                        onValueChange={(e) => {
                          formik.setFieldValue(
                            'productQuantity',
                            e.target.value,
                          )
                          setProductQuantity(Number(e.value))
                        }}
                        className={classNames({
                          'p-invalid':
                            formik.touched.productQuantity &&
                            formik.errors.productQuantity,
                        })}
                      />
                      {formik.touched.productQuantity &&
                      formik.errors.productQuantity ? (
                        <div
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            fontFamily: 'Roboto',
                          }}
                        >
                          {formik.errors.productQuantity}
                        </div>
                      ) : null}
                      <label htmlFor="productQuantity">Dose/ha (Kg)</label>
                    </span>
                  </Col>
                </>
              ) : (
                <div></div>
              )}
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Semente/Cultivar
                  </Form.Label>
                  <Typeahead
                    id="seed"
                    onChange={(selected: any) => {
                      if (selected.length > 0) {
                        setSeed({ id: selected[0].id })
                      }
                    }}
                    options={input.inputs
                      .filter((product: Product) => {
                        return (
                          product.product?.class === 'SEMENTE' &&
                          product.treatment !== 'EXTERNO'
                        )
                      })
                      .map((input) => {
                        return {
                          id: input.id,
                          label: `${input?.product?.name} - ${input.treatment}`,
                        }
                      })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="seedQuantity"
                    value={formik.values.seedQuantity}
                    onValueChange={(e) => {
                      formik.setFieldValue('seedQuantity', e.target.value)
                      setSeedQuantity(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.seedQuantity && formik.errors.seedQuantity,
                    })}
                  />
                  {formik.touched.seedQuantity && formik.errors.seedQuantity ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.seedQuantity}
                    </div>
                  ) : null}
                  <label htmlFor="seedQuantity">População (sementes/ha)</label>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
              <span className="p-float-label">
                    <InputNumber
                      id="lineSpacing"
                      value={formik.values.lineSpacing}
                      onValueChange={(e) => {
                        formik.setFieldValue('lineSpacing', e.target.value)
                        setLineSpacing(Number(e.value))
                      }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.lineSpacing && formik.errors.lineSpacing,
                      })}
                    />
                    {formik.touched.lineSpacing && formik.errors.lineSpacing ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.lineSpacing}
                      </div>
                    ) : null}
                    <label htmlFor="lineSpacing">Espaçamento entre linhas</label>
                  </span>
              </Col>
              <Col>
              <Dropdown
                    value={formik.values.jet}
                    onChange={(e) => {
                      formik.setFieldValue('jet', e.target.value)
                      setJet(e.target.value)
                    }}
                    options={type}
                    optionLabel="name"
                    optionValue="value"
                    placeholder="Possui jato dirigido?"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.jet && formik.errors.jet ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.jet}
                    </div>
                  ) : null}
              </Col>
              {jet == 'Sim' ? (
                <Col>
                <span className="p-float-label">
                    <InputNumber
                      id="flowRate"
                      value={formik.values.flowRate}
                      onValueChange={(e) => {
                        formik.setFieldValue('flowRate', e.target.value)
                        setFlowRate(Number(e.value))
                      }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.flowRate && formik.errors.flowRate,
                      })}
                    />
                    {formik.touched.flowRate && formik.errors.flowRate ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.flowRate}
                      </div>
                    ) : null}
                    <label htmlFor="flowRate">Vazão (L/ha)</label>
                  </span>
                </Col>
              ) : (
                <div></div>
              )}
            </Row>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: '2%',
              }}
            >
              <Button
                style={{ backgroundColor: '#A5CD33', color: '#000' }}
                variant="success"
                type="submit"
              >
                Avançar
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <SeedingPrescriptionModal
        show={showNewPrescriptionModal}
        handleClose={handleClose}
        accountable={accountable}
        area={area}
        applier={selectedApplier}
        date={dateTime.toISOString()}
        selectedFarm={selectedFarm}
        selectedPlot={selectedPlot}
        fertilizing={fertilizing}
        seedQuantity={seedQuantity}
        lineSpacing={lineSpacing}
        jet={jet}
        seed={seed}
        flowRate={flowRate}
        product={product}
        productQuantity={productQuantity}
      ></SeedingPrescriptionModal>
    </div>
  )
}
