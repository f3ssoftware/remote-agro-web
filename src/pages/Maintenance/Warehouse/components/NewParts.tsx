import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Part } from '../../../../models/Part'
import { classNames } from 'primereact/utils'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'

export function NewParts({
  index,
  onHandleRemove,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineCompsValidation,
  setInputAddLineCompsValidation,
  newInvoiceValidation,
  inputAddLineValidation,
  setInputAddLineValidation,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
  isRegisterClicked: boolean
  inputAddLineCompsValidation: any
  setInputAddLineCompsValidation: Function
  newInvoiceValidation: boolean
  inputAddLineValidation: any
  setInputAddLineValidation: Function
}) {
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [initialCost, setInitialCost] = useState(0)
  const [observation, setObservation] = useState('')
  const [accountable, setAccountable] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState(0)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const p: Part = {
      unit_price: initialCost,
      quantity: initialQuantity,
      accountable: accountable,
      observations: observation,
      name: name,
      position: position,
      code: code,
    }
    console.log('p do lado do component:', p)
    onHandleUpdate(p, index)
  }, [
    name,
    position,
    code,
    initialQuantity,
    initialCost,
    observation,
    accountable,
  ])

  useEffect(() => {
    if (
      name !== '' &&
      initialCost !== null &&
      initialQuantity !== null &&
      code !== null
    ) {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: true } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    } else {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: false } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    }
  }, [name, index])

  useEffect(() => {
    const handleSubmitForm = () => {
      if (isRegisterClicked) {
        formik.handleSubmit()
      }
    }
    handleSubmitForm()
  }, [isRegisterClicked])

  const initialValues = {
    name: '',
    initialCost: null,
    initialQuantity: null,
    code: null,
    position: null,
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Necessário preencher'),
    initialCost: Yup.number().required('Necessário preencher'),
    initialQuantity: Yup.number().required('Necessário preencher'),
    code: Yup.number().required('Necessário preencher'),
    position: Yup.number().required('Necessário preencher'),
  })

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidations = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )

    if (
      newInvoiceValidation &&
      falseValidations.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (
      name !== null &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
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
              'p-invalid': formik.touched.name && formik.errors.name,
            })}
            style={{ width: '100%' }}
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
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputNumber
            inputId="currency-br"
            value={formik.values.initialCost}
            onValueChange={(e) => {
              formik.setFieldValue('initialCost', e.target.value)
              setInitialCost(Number(e.value))
            }}
            className={classNames({
              'p-invalid':
                formik.touched.initialCost && formik.errors.initialCost,
            })}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            style={{ width: '100%' }}
          />
          {formik.touched.initialCost && formik.errors.initialCost ? (
            <div
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Roboto',
              }}
            >
              {formik.errors.initialCost}
            </div>
          ) : null}
          <label htmlFor="initialCost">Valor</label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Preço Unitário</Form.Label>
          <Form.Control
            type="text"
            onBlur={(e) => {
              if (isNaN(Number(e.currentTarget.value))) {
                e.currentTarget.value = ''
              } else {
                setInitialCost(Number(e.currentTarget.value))
                e.currentTarget.value = Number(
                  e.currentTarget.value,
                ).toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                  useGrouping: true,
                })
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Backspace') {
                e.currentTarget.value = ''
              }
            }}
          />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputNumber
            value={formik.values.initialQuantity}
            onChange={(e) => {
              setInitialQuantity(e.value!)
              formik.setFieldValue('initialQuantity', e.value!)
            }}
            className={classNames({
              'p-invalid':
                formik.touched.initialQuantity && formik.errors.initialQuantity,
            })}
            inputStyle={{ width: '100%' }}
            mode="decimal"
            locale="pt-BR"
            minFractionDigits={0}
            maxFractionDigits={3}
          ></InputNumber>
          {formik.touched.initialQuantity && formik.errors.initialQuantity ? (
            <div
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Roboto',
              }}
            >
              {formik.errors.initialQuantity}
            </div>
          ) : null}
          <label htmlFor="initialQuantity">Quantidade</label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              setInitialQuantity(Number(e.target.value))
            }}
          />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputNumber
            inputStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            buttonLayout={'stacked'}
            value={formik.values.code}
            onValueChange={(e: InputNumberValueChangeEvent) => {
              formik.setFieldValue('code', e.value)
              setCode(e.value!)
            }}
            mode="decimal"
            min={0}
            useGrouping={false}
            className={classNames({
              'p-invalid': formik.touched.code && formik.errors.code,
            })}
          />
          {formik.touched.code && formik.errors.code ? (
            <div
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Roboto',
              }}
            >
              {formik.errors.code}
            </div>
          ) : null}
          <label style={{ color: 'black' }} htmlFor="code">
            Código
          </label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Código</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              setCode(Number(e.target.value))
            }}
          />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputNumber
            inputStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            buttonLayout={'stacked'}
            value={formik.values.position}
            onValueChange={(e: InputNumberValueChangeEvent) => {
              formik.setFieldValue('position', e.value)
              setPosition(e.value!)
            }}
            mode="decimal"
            min={0}
            useGrouping={false}
            className={classNames({
              'p-invalid': formik.touched.position && formik.errors.position,
            })}
          />
          {formik.touched.position && formik.errors.position ? (
            <div
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Roboto',
              }}
            >
              {formik.errors.position}
            </div>
          ) : null}
          <label style={{ color: 'black' }} htmlFor="position">
            Posição
          </label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Posição</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              setPosition(Number(e.target.value))
            }}
          />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputText
            style={{ width: '100%' }}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <label style={{ color: 'black' }} htmlFor="product">
            Observações
          </label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setObservation(e.target.value)}
          />
        </Form.Group> */}
      </Col>
      <Col>
        <span className="p-float-label">
          <InputText
            style={{ width: '100%' }}
            value={accountable}
            onChange={(e) => setAccountable(e.target.value)}
          />
          <label style={{ color: 'black' }} htmlFor="accountable">
            Responsável
          </label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setAccountable(e.target.value)}
          />
        </Form.Group> */}
      </Col>
      {index !== 0 ? (
        <Col md={1}>
          <Button
            variant="danger"
            onClick={() => {
              onHandleRemove(index)
            }}
            style={{ marginTop: '45%' }}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  )
}
