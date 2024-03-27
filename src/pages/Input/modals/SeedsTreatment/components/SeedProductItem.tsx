import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../..'
import { Product } from '../../../../../models/Product'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { asyncFetchInput } from '../../../../../stores/input.store'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'

export function SeedProductItem({
  index,
  onHandleRemove,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineCompsValidation,
  setInputAddLineCompsValidation,
  inputAddLineValidation,
  setInputAddLineValidation,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
  isRegisterClicked: boolean
  inputAddLineCompsValidation: any
  setInputAddLineCompsValidation: Function
  inputAddLineValidation: any
  setInputAddLineValidation: Function
}) {
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [quantity, setQuantity] = useState(0)
  const [userHasProduct, setUserHasProduct] = useState(false)
  const [productList, setProductList] = useState<any[]>([])
  const { input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    onHandleUpdate(index, { id: selectedProduct?.id, quantity })
  }, [selectedProduct, quantity])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = productList.filter((p: any) =>
      p?.product.name?.toLowerCase().includes(query),
    )
    setProductList(resultSet)
  }

  useEffect(() => {
    if (selectedProduct !== null) {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: true } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    } else {
      const copyProductValidation = inputAddLineValidation
      copyProductValidation[index] = { index: index, response: false } // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation)
    }
  }, [selectedProduct, index])

  useEffect(() => {
    const handleSubmitForm = () => {
      if (isRegisterClicked) {
        formik.handleSubmit()
      }
    }
    handleSubmitForm()
  }, [isRegisterClicked])

  const initialValues = {
    selectedProduct: null,
  }

  const validationSchema = Yup.object({
    selectedProduct: Yup.mixed().required('Necessário preencher'),
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
      falseValidations.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (
      selectedProduct !== null &&
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

  useEffect(() => {
    setProductList(input.inputs)
  }, [input])

  useEffect(() => {
    dispatch(asyncFetchInput())
  }, [])

  return (
    <div style={{ marginTop: '5%' }}>
      <Row>
        <Col md={6}>
          <span className="p-float-label">
            <AutoComplete
              field="product.name"
              value={formik.values.selectedProduct}
              suggestions={productList}
              completeMethod={autoComplete}
              onChange={(e: any) => {
                formik.setFieldValue('selectedProduct', e.target.value)
                const userProducts = input.inputs.filter(
                  (i) => i.product?.name === e.value.label,
                )
                if (userProducts.length > 0) {
                  setUserHasProduct(true)
                }
                if (e.value instanceof Object) {
                  setSelectedProduct(e.value)
                }
              }}
              dropdown
              className={classNames({
                'p-invalid':
                  formik.touched.selectedProduct &&
                  formik.errors.selectedProduct,
              })}
              style={{ width: '100%' }}
              forceSelection
            />
            {formik.touched.selectedProduct && formik.errors.selectedProduct ? (
              <div
                style={{
                  color: 'orange',
                  fontSize: '12px',
                  fontFamily: 'Roboto',
                }}
              >
                {formik.errors.selectedProduct}
              </div>
            ) : null}
            <label htmlFor="endDate">Produto</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                    <Typeahead
                    id="product_input"
                        onChange={(selected: any) => {
                            const userProducts = input.inputs.filter(i => i.product?.name === selected[0].label)
                            if (userProducts.length > 0) {
                                setUserHasProduct(true);
                            }

                            if (selected.length > 0) {
                                setSelectedProduct({ id: selected[0].id });
                            }
                        }}
                        options={input.inputs.filter(i => i.product?.class !== 'SEMENTE').map((input) => { return { id: input.id, label: `${input?.product?.name}` } })}
                    />
                </Form.Group> */}
        </Col>
        <Col md={5}>
          <span className="p-float-label">
            <InputNumber
              value={quantity}
              onChange={(e) => {
                setQuantity(e.value!)
              }}
              inputStyle={{ width: '100%' }}
              mode="decimal"
              locale="pt-BR"
              minFractionDigits={0}
              maxFractionDigits={3}
            ></InputNumber>
            <label htmlFor="endDate">Quantidade de Produto</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Quantidade de produto</Form.Label>
                    <Form.Control type="number" onChange={(e) => {
                        setQuantity(Number(e.target.value));
                    }} />
                </Form.Group> */}
        </Col>
        <Col>
          <Button
            variant="danger"
            style={{ marginTop: '9%' }}
            onClick={() => onHandleRemove(index)}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </Col>
      </Row>
    </div>
  )
}
