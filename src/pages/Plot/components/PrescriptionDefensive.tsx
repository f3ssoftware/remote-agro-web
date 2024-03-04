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
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Slider, SliderChangeEvent } from 'primereact/slider'

interface Type {
  name: string
  value: string
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
    { name: 'Terrestre', value: 'Terrestre' },
    { name: 'Aéreo', value: 'Aéreo' },
    { name: 'Fertirrigação', value: 'Fertirrigação' },
  ]
  const blockType: Type[] = [
    { name: 'LS015', value: 'LS015' },
    { name: 'DL015', value: 'DL015' },
    { name: 'CN015', value: 'CN015' },
    { name: 'XPAIR015', value: 'XPAIR015' },
    { name: 'DL0134', value: 'DL0134' },
    { name: 'CN01', value: 'CN01' },
    { name: 'LS01', value: 'LS01' },
    { name: 'LSD0134', value: 'LSD0134' },
    { name: 'Micron', value: 'Micron' },
  ]
  const [plotList, setPlotList] = useState<any[]>([])
  const [applierList, setApplierList] = useState<any[]>([])

  const autoCompletePlots = (event: AutoCompleteCompleteEvent) => {
    const resultSet = plotList.filter((p: any) =>
      p?.label?.includes(event.query),
    )
    if (resultSet.length > 0) {
      setPlotList(resultSet)
    } else {
      setPlotList(fetchPlot())
    }
  }

  const autoCompleteApplier = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    const resultSet = applierList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setApplierList(resultSet)
    } else {
      setApplierList(fetchApplier())
    }
  }

  const fetchApplier = () => {
    return plot?.appliers?.map((applier: Applier) => {
      return { id: applier.id, label: applier.name, ...applier }
    })
  }

  const fetchPlot = () => {
    return selectedFarm?.fields?.map((field: any) => {
      return { id: field.id, label: field.name, ...field }
    })
  }

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
          dateTime: null,
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
          plot: null,
          applier: null,
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
          area: Yup.string().required('Necessário preencher'),
          plot: Yup.object().required('Necessário preencher'),
          applier: Yup.object().required('Necessário preencher'),
        })}
        onSubmit={() => {
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
                  <label htmlFor="accountable" style={{ color: 'black' }}>Responsável</label>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
              {' '}
              <Col>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.plot}
                    suggestions={plotList}
                    completeMethod={autoCompletePlots}
                    onChange={(e: any) => {
                      formik.setFieldValue('plot', e.target.value)
                      setSelectedPlot(e.value)
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.plot && formik.errors.plot,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.plot && formik.errors.plot ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.plot}
                    </div>
                  ) : null}
                  <label htmlFor="plot" style={{ color: 'black' }}>Talhões</label>
                </span>
                {selectedPlot?.total_area > 0 ? (
                  <>
                    <span style={{ marginTop: '5%' }}>
                      <Slider
                        style={{ marginTop: '7%' }}
                        value={area}
                        max={selectedPlot?.total_area}
                        min={0}
                        onChange={(e: SliderChangeEvent) => {
                          return setArea(Number(e.value))
                        }}
                        className="w-full"
                      />
                      <label
                        style={{ marginTop: '5%', color: 'white' }}
                        htmlFor="area"
                      >
                        Área aplicada: {area}
                      </label>
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </Col>
              <Col>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.applier}
                    suggestions={applierList}
                    completeMethod={autoCompleteApplier}
                    onChange={(e: any) => {
                      setSelectedApplier(e.value)
                      formik.setFieldValue('applier', e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.applier && formik.errors.applier,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.applier && formik.errors.applier ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.applier}
                    </div>
                  ) : null}
                  <label htmlFor="applier" style={{ color: 'black' }}>Aplicador</label>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
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
                    value={dateTime}
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
                  <label htmlFor="date" style={{ color: 'black' }}>Data de plantio</label>
                </span>
              </Col>
              <Col>
                <Dropdown
                  value={formik.values.applicationType}
                  onChange={(e) => {
                    formik.setFieldValue('applicationType', e.target.value)
                    setApplicationType(e.target.value)
                  }}
                  options={type}
                  optionLabel="name"
                  optionValue="value"
                  placeholder="Selecione um tipo de aplicação"
                  style={{ width: '100%' }}
                />
                {formik.touched.applicationType &&
                formik.errors.applicationType ? (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '12px',
                      fontFamily: 'Roboto',
                    }}
                  >
                    {formik.errors.applicationType}
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
              {applicationType == 'Terrestre' ||
              applicationType == 'Fertirrigação' ? (
                <Col>
                  <Dropdown
                    value={formik.values.block}
                    onChange={(e) => {
                      formik.setFieldValue('block', e.target.value)
                      setBlock(e.target.value)
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
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
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
                        'p-invalid':
                          formik.touched.preassure && formik.errors.preassure,
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
                    <label htmlFor="preassure" style={{ color: 'black' }}>Pressão (Pa)</label>
                  </span>
                </Col>
              ) : (
                <div></div>
              )}
            </Row>
            <Row style={{ marginTop: '2%' }}>
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
                  <label htmlFor="preassure" style={{ color: 'black' }}>Vazão (L/ha)</label>
                </span>
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="fullSyrup"
                    value={fullSyrup}
                    onValueChange={(e) => {
                      setFullSyrup(Number(e.value))
                    }}
                    disabled
                  />

                  <label htmlFor="preassure" style={{ color: 'black' }}>Calda total (L)</label>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
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
                      'p-invalid':
                        formik.touched.tankNumbers && formik.errors.tankNumbers,
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
                  <label htmlFor="preassure" style={{ color: 'black' }}>Nª de tanques</label>
                </span>
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="tankSyrup"
                    value={tankNumbers >0 ? tankSyrup : null}
                    onValueChange={(e) => {
                      setTankSyrup(Number(e.value))
                    }}
                    disabled
                  />
                  <label htmlFor="preassure" style={{ color: 'black' }}>Calda/tanque (L)</label>
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
                onClick={() => setShowNewPrescriptionModal(true)}
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
