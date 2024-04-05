import { pt } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Tab } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Part } from '../../../../models/Part'
import { NewParts } from './NewParts'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { classNames } from 'primereact/utils'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'

export function NewInputParts({
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
  const { maintenance } = useSelector((state: RootState) => state)
  const [product, setProduct] = useState({ id: 0 })
  const [productList, setProductList] = useState<any[]>([])
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [initialCost, setInitialCost] = useState(0)
  const [observation, setObservation] = useState('')
  const [accountable, setAccountable] = useState('')
  const [showNewPartsModal, setShowNewPartsModal] = useState(false)

  useEffect(() => {
    const p: Part = {
      id: product.id,
      part_id: product.id.toString(),
      unit_price: initialCost,
      quantity: initialQuantity,
      accountable: accountable,
      observations: observation,
    }
    console.log('p do lado do component:', p)
    onHandleUpdate(p, index)
  }, [product, initialQuantity, initialCost, observation, accountable])

  const autoCompleteParts = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = productList.filter((product) =>
      product.name.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setProductList(resultSet)
    } else {
      setProductList(fetchParts())
    }
  }

  const fetchParts = () => {
    return maintenance?.parts?.map((parts: any) => {
      return { id: parts.id, label: parts.name, ...parts }
    })
  }

  useEffect(() => {
    if (product !== null) {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: true } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    } else {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: false } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    }
  }, [product, index])

  useEffect(() => {
    const handleSubmitForm = () => {
      if (isRegisterClicked) {
        formik.handleSubmit()
      }
    }
    handleSubmitForm()
  }, [isRegisterClicked])

  const initialValues = {
    product: null,
  }

  const validationSchema = Yup.object({
    product: Yup.mixed().required('Necessário preencher'),
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
      product !== null &&
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
    <>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <AutoComplete
              field="label"
              value={formik.values.product}
              suggestions={productList}
              completeMethod={autoCompleteParts}
              onChange={(e: any) => {
                formik.setFieldValue('plot', e.target.value)
                setProduct(e.value)
              }}
              className={classNames({
                'p-invalid': formik.touched.product && formik.errors.product,
              })}
              dropdown
              forceSelection
              style={{ width: '100%' }}
            />
            {formik.touched.product && formik.errors.product ? (
              <div
                style={{
                  color: 'red',
                  fontSize: '12px',
                  fontFamily: 'Roboto',
                }}
              >
                {formik.errors.product}
              </div>
            ) : null}
            <label htmlFor="parts" style={{ color: 'black' }}>
              Peça
            </label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Peça</Form.Label>
            <Typeahead
              id="part"
              onChange={(selected: any) => {
                if (selected.length > 0) {
                  setProduct({ id: selected[0].id })
                }
              }}
              options={maintenance.parts.map((input) => {
                return { id: input.id, label: input?.name }
              })}
            />
          </Form.Group> */}
        </Col>
        <Col>
          <span className="p-float-label">
            <InputNumber
              inputId="currency-br"
              value={Number(initialCost)}
              onValueChange={(e) => {
                setInitialCost(Number(e.value))
              }}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="months">Custo</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Custo</Form.Label>
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
              value={Number(initialQuantity)}
              onChange={(e) => {
                setInitialQuantity(e.value!)
              }}
              inputStyle={{ width: '100%' }}
              mode="decimal"
              locale="pt-BR"
              minFractionDigits={0}
              maxFractionDigits={3}
            ></InputNumber>
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
            <InputText
              value={observation}
              onChange={(e) => {
                setObservation(e.target.value)
              }}
              style={{ width: '100%' }}
            ></InputText>
            <label htmlFor="product">Observações</label>
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
              value={accountable}
              onChange={(e) => {
                setAccountable(e.target.value)
              }}
              style={{ width: '100%' }}
            ></InputText>
            <label htmlFor="product">Responsável</label>
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
    </>
  )
}
