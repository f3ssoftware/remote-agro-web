import { useEffect, useRef, useState } from 'react'
import { Modal, Row, Col, Form, Button } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { TreatSeedsDTO } from '../../../../models/dtos/TreatSeeds.dto'
import { Product } from '../../../../models/Product'
import { asyncTreatSeeds } from '../../../../stores/input.store'
import { getMessages } from '../../../../stores/messaging.store'
import { SeedProductItem } from './components/SeedProductItem'
import { Dialog } from 'primereact/dialog'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function SeedsTreatment({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { input } = useSelector((state: RootState) => state)
  const [seed, setSeed] = useState<any>()
  const [seedQuantity, setSeedQuantity] = useState(0)
  const [accountable, setAccountable] = useState('')
  const [observations, setObservations] = useState('')
  const [products, setProducts]: any[] = useState([{ id: 0, quantity: 0 }])
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [productList, setProductList] = useState<any[]>([])
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [inputAddLineCompsValidation, setInputAddLineCompsValidation] =
    useState<any[]>([false])
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const toast = useRef<Toast>(null)
  const [withdrawalProductValidation, setWithdrawalProductValidation] =
    useState<any[]>([false])

  const onHandleRemove = (index: number) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    setProducts(newProducts)
  }

  const onHandleUpdate = (index: number, product: any) => {
    const newProducts = [...products]
    newProducts.splice(index, 1)
    newProducts.push(product)
    setProducts(newProducts)
  }

  const addLine = () => {
    const newProducts = [...products]
    newProducts.push({ id: 0, quantity: 0 })
    setProducts(newProducts)
  }

  const register = () => {
    const request: TreatSeedsDTO = {
      user_products: products,
      accountable,
      user_seed_id: seed.id,
      observations,
      correct_decimals: true,
      user_seed_quantity: seedQuantity,
    }

    dispatch(asyncTreatSeeds(request))
    handleClose()
  }

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const resultSet = productList.filter((p: any) =>
      p?.label?.includes(event.query),
    )
    if (resultSet.length > 0) {
      setProductList(resultSet)
    } else {
      setProductList(fetchSeeds())
    }
  }

  useEffect(() => {
    if (input.inputs) {
      setProductList(fetchSeeds())
    }
  }, [input])

  const fetchSeeds = () => {
    return input.inputs
      .filter((product: Product) => {
        return (
          product.product?.class === 'SEMENTE' &&
          product.treatment !== 'EXTERNO'
        )
      })
      .map((input) => {
        return {
          id: input.id,
          label: `${input?.product?.name} - ${input.treatment}`,
        }
      })
  }

  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidationsInput = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationWithdrawalProduct = withdrawalProductValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )
    register()

    if (
      falseValidationsInput.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (falseValidationWithdrawalProduct.length === 0) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    }
  }

  const initialValues = {
    selectedProduct: null,
  }

  const validationSchema = Yup.object({
    selectedProduct: Yup.mixed().required('Necessário preencher'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <Dialog
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
      header="Tratamento de Sementes"
      visible={show}
      style={{ width: '50vw' }}
      onHide={() => handleClose()}
    >
      <Toast ref={toast} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Row>
          <Col>
            <span className="p-float-label">
              <AutoComplete
                field="label"
                value={formik.values.selectedProduct}
                suggestions={productList}
                completeMethod={autoComplete}
                onChange={(e: any) => {
                  setSeed(e.value)
                  formik.setFieldValue('selectedProduct', e.target.value)
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
              {formik.touched.selectedProduct &&
              formik.errors.selectedProduct ? (
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
              <label htmlFor="endDate">Semente</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>Semente</Form.Label>
                    <Typeahead
                        id="seed"
                        onChange={(selected: any) => {
                            if (selected.length > 0) {
                                setSeed({ id: selected[0].id });
                            }
                        }}
                        options={input.inputs
                            .filter((product: Product) => {
                                return (
                                    product.product?.class === "SEMENTE" &&
                                    product.treatment !== "EXTERNO"
                                );
                            })
                            .map((input) => {
                                return {
                                    id: input.id,
                                    label: `${input?.product?.name} - ${input.treatment}`,
                                };
                            })}
                    />
                </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <InputNumber
                value={seedQuantity}
                onChange={(e) => {
                  setSeedQuantity(e.value!)
                }}
                inputStyle={{ width: '100%' }}
              ></InputNumber>
              <label htmlFor="seedQuantity">Qtd Sementes</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>
                        Quantidade de Sementes
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setSeedQuantity(Number(e.target.value));
                        }}
                    />
                </Form.Group> */}
          </Col>
        </Row>
        <Row>
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
                    <Form.Label style={{ color: "#fff" }}>Responsável</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setAccountable(e.target.value);
                        }}
                    />
                </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <InputText
                value={observations}
                onChange={(e) => {
                  setObservations(e.target.value)
                }}
                style={{ width: '100%' }}
              ></InputText>
              <label htmlFor="product">Observações</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: "#fff" }}>Observações</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            setObservations(e.target.value);
                        }}
                    />
                </Form.Group> */}
          </Col>
        </Row>
        {products?.map((p: Product, index: number) => {
          return (
            <SeedProductItem
              index={index}
              key={index}
              onHandleRemove={onHandleRemove}
              onHandleUpdate={onHandleUpdate}
              isRegisterClicked={isRegisterClicked}
              inputAddLineCompsValidation={inputAddLineCompsValidation}
              setInputAddLineCompsValidation={setInputAddLineCompsValidation}
              inputAddLineValidation={inputAddLineValidation}
              setInputAddLineValidation={setInputAddLineCompsValidation}
            ></SeedProductItem>
          )
        })}
        <Row>
          <Col>
            <Button variant="primary" onClick={() => addLine()}>
              Adicionar Linha
            </Button>
          </Col>
          <Col>
            <Button
              variant="success"
              type="submit"
              onClick={() => {
                setIsRegisterClicked(true)
                setTimeout(() => {
                  setIsRegisterClicked(false)
                }, 1000)
              }}
            >
              Registrar
            </Button>
          </Col>
        </Row>
      </form>
    </Dialog>
  )
}
