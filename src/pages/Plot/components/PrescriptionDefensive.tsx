import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import {
  asyncFetchApplicationData,
  asyncFetchAppliers,
} from '../../../stores/plot.store'
import { Applier } from '../../../models/Applier'
import { DefensivePrescriptionModal } from '../Modals/DefensivePrescriptionModal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'

export function PrescriptionDefensive({
  handleClose,
  selectedFarm,
}: {
  handleClose: any
  selectedFarm: any
}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [block, setBlock]: any = useState('')
  const [applicationType, setApplicationType] = useState('Terrestre')
  const [flowRate, setFlowRate] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [fullSyrup, setFullSyrup] = useState(0)
  const [tankNumbers, setTankNumbers] = useState(0)
  const [tankSyrup, setTankSyrup] = useState(0)
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const [area, setArea] = useState(0)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)

  const { plot, user } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const toast = useRef<Toast>(null)

  useEffect(() => {
    dispatch(
      asyncFetchAppliers({
        user_id: JSON.parse(sessionStorage.getItem('user')!).user_id,
      }),
    )
    dispatch(asyncFetchApplicationData())
  }, [])

  useEffect(() => {
    setFullSyrup(flowRate * area)
  }, [flowRate, area])

  useEffect(() => {
    setTankSyrup(fullSyrup / tankNumbers)
  }, [fullSyrup, tankNumbers])

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          accountable: '',
          dateTime: [],
          block: '',
          applicationType: 'Terrestre',
          flowRate: null,
          preassure: null,
          fullSyrup: null,
          tankNumbers: null,
          tankSyrup: null,
          selectedPlot: {},
          selectedApplier: {},
          area: null,
        }}
        validationSchema={Yup.object({
          accountable: Yup.string().required('Necessário preencher'),
          dateTime: Yup.string().required('Necessário preencher'),
          block: Yup.string().required('Necessário preencher'),
          applicationType: Yup.string().required('Necessário preencher'),
          flowRate: Yup.string().required('Necessário preencher'),
          preassure: Yup.string().required('Necessário preencher'),
          fullSyrup: Yup.string().required('Necessário preencher'),
          tankNumbers: Yup.string().required('Necessário preencher'),
          tankSyrup: Yup.string().required('Necessário preencher'),
          selectedPlot: Yup.string().required('Necessário preencher'),
          selectedApplier: Yup.string().required('Necessário preencher'),
          area: Yup.string().required('Necessário preencher')
        })}
        onSubmit={(values, { setSubmitting }) => {
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
            </Row>
            <Row>
              {' '}
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
                      max={selectedPlot?.total_area * 100}
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
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Data</Form.Label>
                  <DatePicker
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    selected={dateTime}
                    onChange={(date: Date) => setDateTime(date)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Selecione um tipo
                  </Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setApplicationType(e.target.value)
                    }}
                  >
                    <option value={'Terrestre'}>Terrestre</option>
                    <option value={'Aéreo'}>Aéreo</option>
                    <option value={'Fertirrigação'}>Fertirrigação</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {applicationType == 'Terrestre' ||
              applicationType == 'Fertirrigação' ? (
                <Col>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>
                      Selecione um tipo
                    </Form.Label>
                    <Form.Select
                      aria-label=""
                      onChange={(e) => {
                        return setBlock(e.target.value)
                      }}
                    >
                      <option value={''}>Selecione um bico</option>
                      <option value={'DL015'}>DL015</option>
                      <option value={'LS015'}>LS015</option>
                      <option value={'CN015'}>CN015</option>
                      <option value={'XPAIR015'}>XPAIR015</option>
                      <option value={'DL0134'}>DL0134</option>
                      <option value={'CN01'}>CN01</option>
                      <option value={'LS01'}>LS01</option>
                      <option value={'LSD0134'}>LSD0134</option>
                      <option value={'Micron'}>Micron</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              ) : (
                <div></div>
              )}
              {applicationType == 'Terrestre' ||
              applicationType == 'Fertirrigação' ? (
                <Col>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>
                      Pressão (Pa)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => {
                        return setPressure(Number(e.target.value))
                      }}
                    />
                  </Form.Group>
                </Col>
              ) : (
                <div></div>
              )}
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Vazão (L/ha)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      return setFlowRate(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Calda total (L)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={fullSyrup}
                    onChange={(e) => {
                      return setFullSyrup(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Nª de tanques
                  </Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => {
                      return setTankNumbers(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Calda/tanque (L)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={tankSyrup}
                    onChange={(e) => {
                      return setTankSyrup(Number(e.target.value))
                    }}
                  />
                </Form.Group>
              </Col>
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
      <DefensivePrescriptionModal
        show={showNewPrescriptionModal}
        handleClose={handleClose}
        accountable={accountable}
        area={area}
        applier={selectedApplier}
        date={dateTime.toISOString()}
        applicationType={applicationType}
        selectedFarm={selectedFarm}
        selectedPlot={selectedPlot}
        flowRate={flowRate}
        block={block}
        pressure={pressure}
        tankNumbers={tankNumbers}
        tankSyrup={tankSyrup}
        fullSyrup={fullSyrup}
      ></DefensivePrescriptionModal>
    </div>
  )
}
