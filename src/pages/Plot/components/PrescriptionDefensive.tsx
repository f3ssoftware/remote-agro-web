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
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

interface Type {
  name: string;
  value: string;
}

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
  const [preassure, setPreassure] = useState(0)
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
  const type: Type[] = [
    { name: "Terrestre", value: "Terrestre" },
    { name: "Aéreo", value: "Aéreo" },
    { name: "Fertirrigação", value: "Fertirrigação" },
  ];
  const blockType: Type[] = [
    { name: "LS015", value: "LS015" },
    { name: "DL015", value: "DL015" },
    { name: "CN015", value: "CN015" },
    { name: "XPAIR015", value: "XPAIR015" },
    { name: "DL0134", value: "DL0134" },
    { name: "CN01", value: "CN01" },
    { name: "LS01", value: "LS01" },
    { name: "LSD0134", value: "LSD0134" },
    { name: "Micron", value: "Micron" },
  ];


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
              <span className="p-float-label">
                  <Calendar
                    onChange={(e: any) => {
                      formik.setFieldValue('dateTime', e.target.value)
                      setDateTime(e.value!)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.dateTime &&
                        formik.errors.dateTime,
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
                  value={formik.values.applicationType}
                  onChange={(e) => {
                    formik.setFieldValue("applicationType", e.target.value);
                    setApplicationType(e.target.value);
                  }}
                  options={type}
                  optionLabel="name"
                  optionValue="value"
                  placeholder="Selecione um tipo de aplicação"
                  style={{ width: '100%' }}
                />
                {formik.touched.applicationType && formik.errors.applicationType ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formik.errors.applicationType}
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row>
              {applicationType == 'Terrestre' ||
              applicationType == 'Fertirrigação' ? (
                <Col>
                  <Dropdown
                  value={formik.values.block}
                  onChange={(e) => {
                    formik.setFieldValue("block", e.target.value);
                    setBlock(e.target.value);
                  }}
                  options={blockType}
                  optionLabel="name"
                  optionValue="value"
                  placeholder="Selecione um bico"
                  style={{ width: '100%' }}
                />
                {formik.touched.block && formik.errors.block ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formik.errors.block}
                  </div>
                ) : null}
                </Col>
              ) : (
                <div></div>
              )}
              {applicationType == 'Terrestre' ||
              applicationType == 'Fertirrigação' ? (
                <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="preassure"
                    value={formik.values.preassure}
                    onValueChange={(e) => {
                      formik.setFieldValue('preassure', e.target.value)
                      setPreassure(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.preassure && formik.errors.preassure,
                    })}
                  />
                  {formik.touched.preassure && formik.errors.preassure ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.preassure}
                    </div>
                  ) : null}
                  <label htmlFor="preassure">Pressão (Pa)</label>
                </span>
                </Col>
              ) : (
                <div></div>
              )}
            </Row>
            <Row>
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
                      'p-invalid': formik.touched.flowRate && formik.errors.flowRate,
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
                  <label htmlFor="preassure">Vazão (L/ha)</label>
                </span>
                
              </Col>
              <Col>
              <span className="p-float-label">
                  <InputNumber
                    id="fullSyrup"
                    value={formik.values.fullSyrup}
                    onValueChange={(e) => {
                      formik.setFieldValue('fullSyrup', e.target.value)
                      setFullSyrup(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.fullSyrup && formik.errors.fullSyrup,
                    })}
                  />
                  {formik.touched.fullSyrup && formik.errors.fullSyrup ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.fullSyrup}
                    </div>
                  ) : null}
                  <label htmlFor="preassure">Calda total (L)</label>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
              <span className="p-float-label">
                  <InputNumber
                    id="tankNumbers"
                    value={formik.values.tankNumbers}
                    onValueChange={(e) => {
                      formik.setFieldValue('tankNumbers', e.target.value)
                      setTankNumbers(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.tankNumbers && formik.errors.tankNumbers,
                    })}
                  />
                  {formik.touched.tankNumbers && formik.errors.tankNumbers ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.tankNumbers}
                    </div>
                  ) : null}
                  <label htmlFor="preassure">Nª de tanques</label>
                </span>
              </Col>
              <Col>
              <span className="p-float-label">
                  <InputNumber
                    id="tankSyrup"
                    value={formik.values.tankSyrup}
                    onValueChange={(e) => {
                      formik.setFieldValue('tankSyrup', e.target.value)
                      setTankSyrup(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.tankSyrup && formik.errors.tankSyrup,
                    })}
                  />
                  {formik.touched.tankSyrup && formik.errors.tankSyrup ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.tankSyrup}
                    </div>
                  ) : null}
                  <label htmlFor="preassure">Calda/tanque (L)</label>
                </span>
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
        preassure={preassure}
        tankNumbers={tankNumbers}
        tankSyrup={tankSyrup}
        fullSyrup={fullSyrup}
      ></DefensivePrescriptionModal>
    </div>
  )
}
