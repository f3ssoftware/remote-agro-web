import { pt } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Invoice } from '../../../../models/Invoice'
import { UserProduct } from '../../../../models/UserProduct'
import {
  asyncAddUserProductToStorage,
  asyncFetchInvoices,
} from '../../../../stores/input.store'
import { ProductItem } from './ProductItem'
import DatePicker from 'react-datepicker'
import { Product } from '../../../../models/Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { useFormik } from "formik";
import * as Yup from "yup";
import { classNames } from 'primereact/utils'

let emptyDate: Date
export function WithdrawalProduct({
  index,
  onHandleRemove,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineCompsValidation,
  setInputAddLineCompsValidation,
  inputAddLineValidation,
  setInputAddLineValidation
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
  const { input } = useSelector((state: RootState) => state)
  const [productId, setProductId] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('')
  const [minimumQuantity, setMinimumQuantity] = useState(0)
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [initialCost, setInitialCost] = useState(0)
  const [observation, setObservation] = useState('')
  const [accountable, setAccountable] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [products, setProducts] = useState<any[]>([])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = input.inputs.filter((product) =>
      product.product?.name.toLowerCase().includes(query),
    )
    setProducts(resultSet)
  }

  useEffect(() => {
    const p: UserProduct = {
      measure_unit: measureUnit,
      user_product_id: productId,
      minimum_quantity: minimumQuantity,
      observations: observation,
      quantity: initialQuantity * 1000,
      total_price: initialCost * 100,
      treatment: null,
      accountable: accountable,
    }
    console.log('p do lado do component:', p)
    onHandleUpdate(p, index)
  }, [
    productId,
    measureUnit,
    minimumQuantity,
    initialQuantity,
    initialCost,
    observation,
    accountable,
  ])

  useEffect(() => {
    setProducts(input.inputs)
  }, [input])

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
    <Row style={{ marginTop: '2%' }}>
      <Col>
        <span className="p-float-label">
          <AutoComplete
            field="product.name"
            value={formik.values.selectedProduct}
            suggestions={products}
            completeMethod={autoComplete}
            onChange={(e: any) => {
              setProductId(e?.value?.id)
              setSelectedProduct(e.value)
              formik.setFieldValue("selectedProduct", e.target.value);
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
          <label htmlFor="endDate">Produto</label>
        </span>
        {/* <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
                <Typeahead
                id="product"
                    onChange={(selected) => {
                        if (selected.length > 0) {
                            const p = selected[0] as Product;
                            setProductId(p.id!);
                        }
                    }}
                    options={input.inputs.map(input => { return { id: input.id, label: input?.product?.name } })}
                />
            </Form.Group> */}
      </Col>
      <Col>
        {/* <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
                <Form.Control type="number" onChange={(e) => {
                    setInitialQuantity(Number(e.target.value));
                }} />
            </Form.Group> */}
        <span className="p-float-label">
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
                <Form.Control type="text" onChange={(e) => setObservation(e.target.value)} />
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
                <Form.Control type="text" onChange={(e) => setAccountable(e.target.value)} />
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
