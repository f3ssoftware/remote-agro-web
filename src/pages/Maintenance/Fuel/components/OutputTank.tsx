import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { asyncFuel } from '../../../../stores/maintenance.store'
import { useDispatch, useSelector } from 'react-redux'
import { Fuel } from '../../../../models/Fuel'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../../..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'

export function OutputTank({
  id,
  index,
  onHandleUpdate,
  onHandleRemove,
}: {
  id: number
  index: number
  onHandleUpdate: any
  onHandleRemove: any
}) {
  const [quantity, setQuantity] = useState(0)
  const [accountable, setAccountable] = useState('')
  const [kilometers, setKilometers] = useState<number | null>(null)
  const [date, setDate] = useState(new Date())
  const [good, setGood] = useState({ id: 0 })
  const [motorHour, setMotorHour] = useState(0)
  const { maintenance } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [goodList, setGoodList] = useState<any[]>([])
  const toast = useRef<Toast>(null)

  const save = () => {
    const fuel: Fuel = {
      quantity: quantity,
      kilometers: Number(kilometers),
      good_id: good.id,
      motor_hours: motorHour,
      accountable: accountable,
      date: date.toISOString(),
      tank_id: id,
      type: 'Saida',
    }
    onHandleUpdate(fuel, index)
    dispatch(asyncFuel(fuel))
  }

  const fetchGoods = () => {
    return maintenance?.goods?.map((goods: any) => {
      return { id: goods.id, label: goods.name, ...goods }
    })
  }

  const autoCompleteGoods = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = goodList.filter((good) =>
      good.name.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setGoodList(resultSet)
    } else {
      setGoodList(fetchGoods())
    }
  }

  return (
    <Container>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          good: '',
          date: null,
          quantity: null,
          motorHour: null
        }}
        validationSchema={Yup.object({
          good: Yup.mixed().required('Necessário preencher'),
          date: Yup.date().required('Necessário preencher'),
          quantity: Yup.number().required('Necessário preencher'),
          motorHour: Yup.number().required('Necessário preencher'),
        })}
        onSubmit={() => {
          save()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Row style={{ marginTop: '2%' }}>
                <Col>
                  <span className="p-float-label">
                    <AutoComplete
                      field="label"
                      value={formik.values.good}
                      suggestions={goodList}
                      completeMethod={autoCompleteGoods}
                      onChange={(e: any) => {
                        formik.setFieldValue('good', e.target.value)
                        setGood(e.value)
                      }}
                      className={classNames({
                        'p-invalid': formik.touched.good && formik.errors.good,
                      })}
                      dropdown
                      forceSelection
                      style={{ width: '100%' }}
                    />
                    {formik.touched.good && formik.errors.good ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.good}
                      </div>
                    ) : null}
                    <label htmlFor="parts" style={{ color: 'black' }}>
                      Bem
                    </label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Bem</Form.Label>
              <Typeahead
                id="good"
                onChange={(selected: any) => {
                  if (selected.length > 0) {
                    setGoodId({ id: selected[0].id })
                  }
                }}
                options={maintenance.goods.map((input) => {
                  return { id: input.id, label: input?.name }
                })}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      onChange={(e: any) => {
                        formik.setFieldValue('date', e.target.value)
                        setDate(e.value!)
                      }}
                      className={classNames({
                        'p-invalid': formik.touched.date && formik.errors.date,
                      })}
                      locale="en"
                      value={date}
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.date}
                      </div>
                    ) : null}
                    <label htmlFor="date">Data</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Data</Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date: Date) => setDate(date)}
              />
            </Form.Group> */}
                </Col>
                <Col>
                <span className="p-float-label">
          <InputNumber
            value={formik.values.motorHour}
            onChange={(e) => {
              formik.setFieldValue('motorHour', e.value!)
              setMotorHour(e.value!)
            }}
            className={classNames({
                'p-invalid': formik.touched.motorHour && formik.errors.motorHour,
              })}
            inputStyle={{ width: '100%' }}
            mode="decimal"
            locale="pt-BR"
            minFractionDigits={0}
            maxFractionDigits={3}
          ></InputNumber>
          {formik.touched.motorHour && formik.errors.motorHour ? (
            <div
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Roboto',
              }}
            >
              {formik.errors.motorHour}
            </div>
          ) : null}
          <label htmlFor="motorHour">Motor/hora</label>
        </span>
                  {/* <Form.Group className="mb-2" controlId="">
              <Form.Label style={{ color: '#fff' }}>Motor/hora</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setMotorHour(Number(e.target.value))
                }}
              />
            </Form.Group> */}
                </Col>

                <Col>
                  <span className="p-float-label">
                    <InputNumber
                      value={formik.values.quantity}
                      onChange={(e) => {
                        setQuantity(e.value!)
                        formik.setFieldValue('quantity', e.value!)
                      }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.quantity && formik.errors.quantity,
                      })}
                      inputStyle={{ width: '100%' }}
                      mode="decimal"
                      locale="pt-BR"
                      minFractionDigits={0}
                      maxFractionDigits={3}
                    ></InputNumber>
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.quantity}
                      </div>
                    ) : null}
                    <label htmlFor="quantity">Litros</label>
                  </span>
                  {/* <Form.Group className="mb-2" controlId="">
              <Form.Label style={{ color: '#fff' }}>Litros</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setQuantity(Number(e.target.value))
                }}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <InputNumber
                      value={Number(kilometers)}
                      onChange={(e) => {
                        setKilometers(e.value!)
                      }}
                      mode="decimal"
                      locale="pt-BR"
                      style={{ width: '100%' }}
                      minFractionDigits={0}
                      maxFractionDigits={3}
                    />

                    <label htmlFor="kilometer">Quilometragem</label>
                  </span>
                  {/* <Form.Group className="mb-2" controlId="">
                    <Form.Label style={{ color: '#fff' }}>
                      Quilometragem
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => {
                        setKilometers(Number(e.target.value))
                      }}
                    />
                  </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <InputText
                      value={accountable}
                      onChange={(e) => {
                        setAccountable(e.target.value)
                      }}
                      style={{ width: '100%' }}
                    />

                    <label htmlFor="accountable">Responsável</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>
                      Responsável
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setAccountable(e.target.value)}
                    />
                  </Form.Group> */}
                </Col>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: '1%',
                  }}
                >
                  <Button variant="success" type="submit">
                    Salvar
                  </Button>

                  {index !== 0 ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        onHandleRemove(index)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </Row>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  )
}
