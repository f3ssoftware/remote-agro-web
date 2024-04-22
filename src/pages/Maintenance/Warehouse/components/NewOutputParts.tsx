import { pt } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Part } from '../../../../models/Part'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'

export function NewOutputParts({
  index,
  onHandleRemove,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineValidation,
  setInputAddLineValidation,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
  isRegisterClicked: boolean
  inputAddLineValidation: any
  setInputAddLineValidation: Function
}) {
  const { maintenance } = useSelector((state: RootState) => state)
  const [product, setProduct] = useState({ id: 0 })
  const [productList, setProductList] = useState<any[]>([])
  const [good, setGood] = useState({ id: 0 })
  const [goodList, setGoodList] = useState<any[]>([])
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [initialCost, setInitialCost] = useState(0)
  const [observation, setObservation] = useState('')
  const [accountable, setAccountable] = useState('')

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

  const fetchParts = () => {
    return maintenance?.parts?.map((parts: any) => {
      return { id: parts.id, label: parts.name, ...parts }
    })
  }

  const fetchGoods = () => {
    return maintenance?.goods?.map((goods: any) => {
      return { id: goods.id, label: goods.name, ...goods }
    })
  }

  useEffect(() => {
    if (product !== null && initialQuantity !== null && good !== null) {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: true } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    } else {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: false } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    }
  }, [product, initialQuantity, good, index])

  useEffect(() => {
    const handleSubmitForm = () => {
      if (isRegisterClicked) {
        formik.handleSubmit()
      }
    }
    handleSubmitForm()
  }, [isRegisterClicked])

  const initialValues = {
    product: '',
    initialQuantity: null,
    good: '',
  }

  const validationSchema = Yup.object({
    product: Yup.mixed().required('Necessário preencher'),
    initialQuantity: Yup.number().required('Necessário preencher'),
    good: Yup.mixed().required('Necessário preencher'),
  })

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidations = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )

    if (falseValidations.length === 0) {
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
          <AutoComplete
            field="label"
            value={formik.values.product}
            suggestions={productList}
            completeMethod={autoCompleteParts}
            onChange={(e: any) => {
              formik.setFieldValue('product', e.target.value)
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
                setProductId({ id: selected[0].id })
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
            value={formik.values.initialQuantity}
            onChange={(e) => {
              formik.setFieldValue('initialQuantity', e.value!)
              setInitialQuantity(e.value!)
            }}
            className={classNames({
                'p-invalid': formik.touched.initialQuantity && formik.errors.initialQuantity,
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
  )
}
