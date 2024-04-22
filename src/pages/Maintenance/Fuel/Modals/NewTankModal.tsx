import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { asyncNewTank } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'
import { Tank } from '../../../../models/Tank'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'

interface Type {
  name: string
  value: any
}

export function NewTankModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [name, setName] = useState('')
  const [fuel, setFuel] = useState('')
  const fuelOptions: Type[] = [
    { name: 'Gasolina', value: 'Gasolina' },
    { name: 'Diesel', value: 'Diesel' },
    { name: 'Arla', value: 'Arla' },
  ]
  const dispatch = useDispatch<any>()
  const toast = useRef<Toast>(null)

  const register = () => {
    const tank: Tank = {
      name: name,
      fuel: fuel,
    }
    dispatch(asyncNewTank(tank))
  }
  return (
    <Container>
      <Dialog
        header="Cadastrar Tanque"
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
            name: '',
            fuel: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Necessário preencher'),
            fuel: Yup.string().required('Necessário preencher'),
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
                      <InputText
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => {
                          formik.setFieldValue('name', e.target.value)
                          setName(e.target.value)
                        }}
                        className={classNames({
                          'p-invalid':
                            formik.touched.name && formik.errors.name,
                        })}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            fontFamily: 'Roboto',
                          }}
                        >
                          {formik.errors.name}
                        </div>
                      ) : null}
                      <label htmlFor="name">Nome</label>
                    </span>
                    {/* <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </Form.Group> */}
                  </Col>
                  <Col>
                    <Dropdown
                      value={formik.values.fuel}
                      onChange={(e) => {
                        setFuel(e.target.value)
                        formik.setFieldValue('fuel', e.target.value)
                      }}
                      options={fuelOptions}
                      optionLabel="name"
                      optionValue="value"
                      placeholder="Combustível"
                      style={{ width: '100%' }}
                    />
                    {formik.touched.fuel && formik.errors.fuel ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.fuel}
                      </div>
                    ) : null}
                    {/* <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Combustível
                      </Form.Label>
                      <Form.Select
                        aria-label=""
                        onChange={(e) => {
                          return setFuel(e.target.value)
                        }}
                      >
                        <option value={''}></option>
                        <option value={'Gasolina'}>Gasolina</option>
                        <option value={'Diesel'}>Diesel</option>
                        <option value={'Arla'}>Arla</option>
                      </Form.Select>
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
    </Container>
  )
}
