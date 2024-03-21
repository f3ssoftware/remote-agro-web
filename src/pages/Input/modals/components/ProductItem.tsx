import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Product } from '../../../../models/Product'
import { ProductListItem } from '../../../../models/ProductListItem'
import { UserProduct } from '../../../../models/UserProduct'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { useFormik } from "formik";
import * as Yup from "yup";
import { classNames } from 'primereact/utils'

export function ProductItem({
  index,
  onHandleRemove,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineCompsValidation,
  setInputAddLineCompsValidation,
  newInvoiceValidation,
  inputAddLineValidation,
  setInputAddLineValidation
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
  const { input } = useSelector((state: RootState) => state)
  const [productId, setProductId] = useState(0)
  const [userProductId, setUserProductId] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('')
  const [minimumQuantity, setMinimumQuantity] = useState(0)
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [initialCost, setInitialCost] = useState(0)
  const [observation, setObservation] = useState('')
  const [accountable, setAccountable] = useState('')
  const [userHasProduct, setUserHasProduct] = useState(false)
  const [isSeed, setIsSeed] = useState(false)
  const [seedQuantityType, setSeedQuantityType] = useState('')
  const [pms, setPms] = useState('')
  const [treatment, setTreatment] = useState('NÃO TRATADA')
  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>()

  useEffect(() => {
    const p: UserProduct = {
      measure_unit: measureUnit,
      // user_product_id: userProductId,
      // minimum_quantity: minimumQuantity,
      accountable: accountable,
      observations: observation,
      quantity: initialQuantity * 1000,
      total_price: initialCost * 100,
      treatment: null,
    }

    if (isSeed) {
      p.treatment = treatment
      p.pms = pms
      p.seed_quantity_type = seedQuantityType
    }

    if (userHasProduct) {
      p.user_product_id = userProductId
    } else {
      p.product_id = productId
    }
    onHandleUpdate(p, index, userHasProduct)
  }, [
    productId,
    measureUnit,
    minimumQuantity,
    initialQuantity,
    initialCost,
    observation,
    pms,
    treatment,
    seedQuantityType,
  ])

  // useEffect(() => {
  //     if(input.inputs) {
  //         setProducts(input.inputs);
  //     }

  // }, [input])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    const resultSet = input.generalProductsList.filter((product) =>
      product.name.toLowerCase().includes(query),
    )
    setProducts(resultSet)
  }

  useEffect(() => {
    if (selectedProduct !== null) {
      const copyProductValidation = inputAddLineValidation;
      copyProductValidation[index] = { index: index, response: true }; // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation);
    } else {
      const copyProductValidation = inputAddLineValidation;
      copyProductValidation[index] = { index: index, response: false }; // Aqui foi setado o novo valor na posição q vc quer
      setInputAddLineValidation(copyProductValidation);
    }
  }, [selectedProduct, index]);

  useEffect(() => {
    const handleSubmitForm = () => {
      if (isRegisterClicked) {
        formik.handleSubmit();
      }
    };
    handleSubmitForm();
  }, [isRegisterClicked]);

  const initialValues = {
    selectedProduct: null,
  };

  const validationSchema = Yup.object({
    selectedProduct: Yup.mixed().required("Necessário preencher"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidations = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false
    );
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false
      );

    if (
      newInvoiceValidation &&
      falseValidations.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    } else if (
      selectedProduct !== null &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <div>
      <Row style={{ marginTop: '5%' }}>
        <Col md={2}>
          <span className="p-float-label">
            <AutoComplete
              field="name"
              value={formik.values.selectedProduct}
              suggestions={products}
              completeMethod={autoComplete}
              onChange={(e: any) => {
                formik.setFieldValue("selectedProduct", e.target.value);
                setSelectedProduct(e.value)

                const userProducts = input.inputs.filter(
                  (i) => i.product?.name === e.value.name,
                )
                if (userProducts.length > 0) {
                  setUserHasProduct(true)
                  setUserProductId(userProducts[0].id!)
                  setMeasureUnit(userProducts[0].measure_unit!)
                } else if (e.value instanceof Object) {
                  if (e.value?.class === 'SEMENTE') {
                    setIsSeed(true)
                  }
                  setUserHasProduct(false)
                  setProductId(e.value?.id!)
                }
              }}
              dropdown
              className={classNames({
                "p-invalid": formik.touched.selectedProduct && formik.errors.selectedProduct,
              })}
            />
            {formik.touched.selectedProduct && formik.errors.selectedProduct ? (
              <div
                style={{
                  color: "orange",
                  fontSize: "12px",
                  fontFamily: "Roboto",
                }}
              >
                {formik.errors.selectedProduct}
              </div>
            ) : null}
            <label htmlFor="product">Produto</label>
          </span>
        </Col>
        {!userHasProduct ? (
          <Col md={2}>
            {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Unidade Medida</Form.Label>
                    <Form.Control type="text" onChange={(e) => {
                        setMeasureUnit(e.target.value);
                    }} />
                </Form.Group> */}
            <span className="p-float-label">
              <InputText
                value={measureUnit}
                onChange={(e) => setMeasureUnit(e.target.value)}
                style={{ width: '100%' }}
              ></InputText>
              <label htmlFor="product">Unidade medida</label>
            </span>
          </Col>
        ) : (
          <></>
        )}
        <Col md={2}>
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
                    <Form.Control type="text" onChange={(e) => {
                        setAccountable(e.target.value);
                    }} />
                </Form.Group> */}
        </Col>
        <Col md={1}>
          <span className="p-float-label">
            {/* <InputText value={String(initialQuantity)} onChange={(e) => {
                        setInitialQuantity(Number(e.target.value!));
                    }} style={{ width: '100%', maxWidth: '100%' }}></InputText> */}
            <InputNumber
              value={initialQuantity}
              onChange={(e) => {
                setInitialQuantity(e.value!)
              }}
              inputStyle={{ width: '100%' }}
              mode="decimal"
              locale="pt-BR"
              minFractionDigits={0}
              maxFractionDigits={3}
            ></InputNumber>
            <label htmlFor="initialQuantity">Qtd</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
                    <Form.Control type="number" onChange={(e) => {
                        setInitialQuantity(Number(e.target.value));
                    }} />
                </Form.Group> */}
        </Col>
        <Col md={2}>
          <span className="p-float-label">
            <InputNumber
              value={initialCost}
              onChange={(e) => {
                setInitialCost(e.value!)
              }}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              inputStyle={{ width: '100%' }}
            ></InputNumber>
            <label htmlFor="initialCost">Custo</label>
          </span>
        </Col>
        <Col md={2}>
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
                    <Form.Control type="text" onChange={(e) => setObservation(e.target.value)} />
                </Form.Group> */}
        </Col>
        {index !== 0 ? (
          <Col md={1}>
            <Button
              variant="danger"
              onClick={() => {
                onHandleRemove(index)
              }}
              style={{ marginTop: '14%' }}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <div style={{ paddingLeft: '4%', paddingRight: '4%' }}>
        {!userHasProduct && isSeed ? (
          <Row>
            <Col md={12}>
              <span className="p-float-label">
                <Dropdown
                  value={seedQuantityType}
                  onChange={(e) => {
                    return setSeedQuantityType(e.target.value)
                  }}
                  options={[
                    { label: 'Selecione um tipo' },
                    { label: 'KG', value: 'KG' },
                    { label: 'SACOS', value: 'SACOS' },
                    { label: 'UNIDADE', value: 'UNIDADE' },
                  ]}
                  optionLabel="name"
                  className="w-full md:w-14rem"
                  style={{ width: '100%' }}
                />
                <label htmlFor="product">Kgs, sacos ou unidade</label>
              </span>
              {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>Kgs, sacos ou unidade</Form.Label>
                            <Form.Select
                                aria-label=""
                                onChange={(e) => {
                                    return setSeedQuantityType(e.target.value)
                                }}
                            >
                                <option value="">Selecione um tipo</option>
                                <option value="KG">KG</option>
                                <option value="SACOS">SACOS</option>
                                <option value="UNIDADE">UNIDADE</option>
                            </Form.Select>
                        </Form.Group> */}
            </Col>
            <Col>
              <span className="p-float-label">
                <Dropdown
                  value={seedQuantityType}
                  onChange={(e) => {
                    setTreatment(e.target.value)
                  }}
                  options={[
                    { label: 'Selecione um tipo' },
                    { label: 'Não tratada', value: 'NÃO TRATADA' },
                    { label: 'Externo', value: 'EXTERNO' },
                    { label: 'Interno', value: 'INTERNO' },
                  ]}
                  optionLabel="label"
                  className="w-full md:w-14rem"
                  style={{ width: '100%' }}
                />
                <label htmlFor="product">Tratamento</label>
              </span>
              {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>Tratamento</Form.Label>
                            <Form.Select
                                aria-label=""
                                value={treatment}
                                onChange={(e) => {
                                    return setTreatment(e.target.value)
                                }}
                            >
                                <option value="NÃO TRATADA">Não Tratada</option>
                                <option value="EXTERNO">Externo</option>
                                <option value="INTERNO">Interno</option>
                            </Form.Select>
                        </Form.Group> */}
            </Col>
            <Col>
              <span className="p-float-label">
                <InputText
                  value={observation}
                  onChange={(e) => {
                    setPms(e.target.value)
                  }}
                  style={{ width: '100%' }}
                ></InputText>
                <label htmlFor="product">PMS (g)</label>
              </span>
              {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>PMS (g)</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                setPms(e.target.value);
                            }} />
                        </Form.Group> */}
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
