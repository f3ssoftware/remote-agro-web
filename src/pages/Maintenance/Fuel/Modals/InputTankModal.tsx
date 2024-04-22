import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { asyncFuel } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'
import { Fuel } from '../../../../models/Fuel'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { InputNumber } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'
import { Calendar } from 'primereact/calendar'

export function InputTankModal({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch<any>()
  const toast = useRef<Toast>(null)

  const register = () => {
    const fuel: Fuel = {
      quantity: quantity,
      date: date.toISOString(),
      tank_id: id,
      type: 'Entrada',
    }
    dispatch(asyncFuel(fuel))
  }
  return (
    <Container>
      <Dialog
        header="Tanques - Entrada"
        visible={show}
        style={{ width: '50vw' }}
        className="custom-dialog"
        onHide={handleClose}
        headerStyle={dialogHeaderStyle}
        contentStyle={dialogContentSyle}
      >
        <Toast ref={toast} />
        <Formik
          initialValues={{
            quantity: null,
            date: '',
          }}
          validationSchema={Yup.object({
            quantity: Yup.number().required('Necessário preencher'),
            date: Yup.date().required('Necessário preencher'),
          })}
          onSubmit={() => {
            register()
            handleClose()
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Row style={{ marginTop: '2%' }}>
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
                      <label htmlFor="quantity">Abastecimento</label>
                    </span>
                    {/* <Form.Group className="mb-2" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Abastecimento
                  </Form.Label>
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
                      <Calendar
                        onChange={(e: any) => {
                          formik.setFieldValue('date', e.target.value)
                          setDate(e.value!)
                        }}
                        className={classNames({
                          'p-invalid':
                            formik.touched.date && formik.errors.date,
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
                </Row>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '2%',
                }}
              >
                <Button variant="success" type="submit">
                  Registrar
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
      {/* <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Tanques</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        </Modal.Body>
      </Modal> */}
    </Container>
  )
}
