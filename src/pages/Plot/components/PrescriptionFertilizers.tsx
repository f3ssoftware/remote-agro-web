import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import {
  asyncFetchApplicationData,
  asyncFetchAppliers,
  asyncPrescription,
} from '../../../stores/plot.store'
import { Applier } from '../../../models/Applier'
import { FertilizerPrescriptionModal } from '../Modals/FertilizerPrescriptionModal'
import { Application } from '../../../models/Application'
import { Formik } from 'formik'
import { Toast } from 'primereact/toast'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { Slider, SliderChangeEvent } from 'primereact/slider'

interface Type {
  name: string
  value: string
}

export function PrescriptionFertilizers({
  handleClose,
  selectedFarm,
}: {
  handleClose: any
  selectedFarm: any
}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [applicationType, setApplicationType] = useState('A lanço')
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot, user } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [area, setArea] = useState(0)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)
  const toast = useRef<Toast>(null)
  const type: Type[] = [
    { name: 'A lanço', value: 'A lanço' },
    { name: 'Incorporado', value: 'Aéreo' },
    { name: 'Fertirrigação', value: 'Fertirrigação' },
    { name: 'Cocho', value: 'Cocho' },
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
    const resultSet = applierList.filter((p: any) =>
      p?.label?.includes(event.query),
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

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          accountable: '',
          applicationType: '',
          dateTime: null,
          plot: null,
          applier: null,
        }}
        validationSchema={Yup.object({
          accountable: Yup.string().required('Necessário preencher'),
          dateTime: Yup.string().required('Necessário preencher'),
          applicationType: Yup.string().required('Necessário preencher'),
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
                      'p-invalid':
                        formik.touched.plot && formik.errors.plot,
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
                  <label htmlFor="plot">Talhões</label>
                </span>
                {selectedPlot?.total_area > 0 ? (
                  <>
                    <span  style={{marginTop: '5%'}}>
                      <Slider
                       style={{marginTop: '7%'}}
                        value={area}
                        max={selectedPlot?.total_area}
                        min={0}
                        onChange={(e: SliderChangeEvent) => {
                          return setArea(Number(e.value))
                        }}
                        className="w-full"
                      />
                      <label  style={{marginTop: '5%', color: 'white'}} htmlFor="area">Área aplicada: {area}</label>
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
                  <label htmlFor="applier">Aplicador</label>
                </span>
              </Col>
            </Row>
            <Row>
              {' '}
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
                  <label htmlFor="date">Data de plantio</label>
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
                  placeholder="Selecione um tipo"
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
      <FertilizerPrescriptionModal
        show={showNewPrescriptionModal}
        accountable={accountable}
        area={area}
        handleClose={handleClose}
        applier={selectedApplier}
        date={dateTime.toISOString()}
        applicationType={applicationType}
        selectedFarm={selectedFarm}
        selectedPlot={selectedPlot}
      ></FertilizerPrescriptionModal>
    </div>
  )
}
