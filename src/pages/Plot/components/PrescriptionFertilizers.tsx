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
          dateTime: '',
        }}
        validationSchema={Yup.object({
          accountable: Yup.string().required('Necessário preencher'),
          dateTime: Yup.string().required('Necessário preencher'),
          applicationType: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          // handleClose()
          setShowNewPrescriptionModal(true)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
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
        applier={selectedApplier}
        date={dateTime.toISOString()}
        applicationType={applicationType}
        selectedFarm={selectedFarm}
        selectedPlot={selectedPlot}
      ></FertilizerPrescriptionModal>
    </div>
  )
}
