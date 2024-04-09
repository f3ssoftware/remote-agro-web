import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { Good } from '../../../../models/Good'
import { asyncNewGoods } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'

interface Type {
  name: string
  value: any
}

export function NewRichesModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [name, setName] = useState('')
  const [goodType, setGoodType] = useState('')
  const [insurance, setInsurance] = useState<boolean>()
  const goodOptions: Type[] = [
    { name: 'Movel', value: 'Movel' },
    { name: 'Imovel', value: 'Imovel' },
  ]
  const insuranceOptions: Type[] = [
    { name: 'Sim', value: true },
    { name: 'Não', value: false },
  ]
  const [policyName, setPolicyName] = useState('')
  const [policyExpDate, setPolicyExpDate] = useState(new Date())
  const [ipva, setIpva] = useState('')
  const [ipvaExpDate, setIpvaExpDate] = useState(new Date())
  const dispatch = useDispatch<any>()
  const toast = useRef<Toast>(null)

  const register = () => {
    const good: Good = {
      name: name,
      type: goodType,
      is_insured: insurance,
      insurance_policy: policyName,
      insurance_ends_at: policyExpDate.toISOString(),
      ipva: ipva,
      ipva_ends_at: ipvaExpDate.toISOString(),
    }
    dispatch(asyncNewGoods(good))
  }
  return (
    <Container>
      <Dialog
        header="Cadastrar Bem"
        headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
        visible={show}
        style={{ width: '80vw' }}
        onHide={() => {
          handleClose()
        }}
      >
        <Toast ref={toast} />
        <Formik
          initialValues={{
            name: '',
            goodType: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Necessário preencher'),
            goodType: Yup.string().required('Necessário preencher'),
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
                  <Col md={3}>
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
                      <label htmlFor="name">Nome da bem</label>
                    </span>
                    {/* <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Nome do bem
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </Form.Group> */}
                  </Col>
                  <Col md={2}>
                    <Dropdown
                      value={formik.values.goodType}
                      onChange={(e) => {
                        setGoodType(e.target.value)
                        formik.setFieldValue('goodType', e.target.value)
                      }}
                      options={goodOptions}
                      optionLabel="name"
                      optionValue="value"
                      placeholder="Tipo do bem"
                      style={{ width: '100%' }}
                    />
                     {formik.touched.goodType && formik.errors.goodType ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.goodType}
                    </div>
                  ) : null}
                    {/* <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Tipo do bem
                      </Form.Label>
                      <Form.Select
                        aria-label=""
                        onChange={(e) => {
                          return setGoodType(e.target.value)
                        }}
                      >
                        <option value={''}></option>
                        <option value={'Imovel'}>Imovel</option>
                        <option value={'Movel'}>Movel</option>
                      </Form.Select>
                    </Form.Group> */}
                  </Col>
                  <Col md={2}>
                    <Dropdown
                      value={insurance}
                      onChange={(e) => {
                        setInsurance(e.target.value)
                      }}
                      options={insuranceOptions}
                      optionLabel="name"
                      optionValue="value"
                      placeholder="Segurado?"
                      style={{ width: '100%' }}
                    />
                    {/* <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Segurado
                      </Form.Label>
                      <Form.Select
                        aria-label=""
                        onChange={(e) => {
                          return setInsurance(Boolean(e.target.value))
                        }}
                      >
                        <option value={'false'}></option>
                        <option value={'true'}>Sim</option>
                        <option value={'false'}>Não</option>
                      </Form.Select>
                    </Form.Group> */}
                  </Col>
                </Row>
                {insurance === true ? (
                  <Row style={{ marginTop: '2%' }}>
                    <Col>
                      <span className="p-float-label">
                        <InputText
                          value={policyName}
                          onChange={(e) => {
                            setPolicyName(e.target.value)
                          }}
                          style={{ width: '100%' }}
                        ></InputText>
                        <label htmlFor="policyName">Apólice</label>
                      </span>
                    </Col>
                    <Col>
                      {/* <Form.Group className="mb-3" controlId="">
                          <Form.Label style={{ color: '#fff' }}>
                            Apólice
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              setPolicyName(e.target.value)
                            }}
                          />
                        </Form.Group> */}
                      <span className="p-float-label">
                        <Calendar
                          onChange={(e: any) => {
                            setPolicyExpDate(e.value!)
                          }}
                          locale="en"
                          value={policyExpDate}
                          dateFormat="dd/mm/yy"
                        />
                        <label htmlFor="date">
                          Data de vencimento do seguro
                        </label>
                      </span>

                      {/* <Form.Group className="mb-3" controlId="">
                          <Form.Label style={{ color: '#fff' }}>
                            Data de vencimento do seguro
                          </Form.Label>
                          <DatePicker
                            locale={pt}
                            dateFormat="dd/MM/yyyy"
                            selected={policyExpDate}
                            onChange={(date: Date) => setPolicyExpDate(date)}
                          />
                        </Form.Group> */}
                    </Col>
                  </Row>
                ) : (
                  <div></div>
                )}

                {goodType === 'Movel' ? (
                  <Row style={{ marginTop: '2%' }}>
                    <Col>
                      <span className="p-float-label">
                        <InputText
                          value={ipva}
                          onChange={(e) => {
                            setIpva(e.target.value)
                          }}
                          style={{ width: '100%' }}
                        ></InputText>
                        <label htmlFor="ipva">IPVA</label>
                      </span>
                      {/* <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>IPVA</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => {
                            setIpva(e.target.value)
                          }}
                        />
                      </Form.Group> */}
                    </Col>
                    <Col>
                      <span className="p-float-label">
                        <Calendar
                          onChange={(e: any) => {
                            setIpvaExpDate(e.value!)
                          }}
                          locale="en"
                          value={ipvaExpDate}
                          dateFormat="dd/mm/yy"
                        />
                        <label htmlFor="date">Data de vencimento do IPVA</label>
                      </span>
                      {/* <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>
                          Data de vencimento do IPVA
                        </Form.Label>
                        <DatePicker
                          locale={pt}
                          dateFormat="dd/MM/yyyy"
                          selected={ipvaExpDate}
                          onChange={(date: Date) => setIpvaExpDate(date)}
                        />
                      </Form.Group> */}
                    </Col>
                  </Row>
                ) : (
                  <div></div>
                )}
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
