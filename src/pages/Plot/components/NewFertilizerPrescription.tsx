import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchInput } from '../../../stores/input.store'
import { InputNumber } from 'primereact/inputnumber'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Product } from '../../../models/Product'
import { Button } from 'primereact/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'

export function NewFertilizerPrescription({
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
  const [product, setProduct] = useState<any>({ id: 0 })
  const [quantity, setQuantity] = useState(0)
  const { input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [productList, setProductList] = useState<any[]>([])

  useEffect(() => {
    onHandleUpdate(index, { user_product_id: product?.id, quantity: quantity*1000, tank: 0, test: 0, total_quantity: quantity*100000 })
  }, [product, quantity])

  useEffect(() => {
    dispatch(asyncFetchInput())
  }, [])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase();
    const resultSet = productList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setProductList(resultSet)
    } else {
      setProductList(fetchProducts())
    }
  }

  useEffect(() => {
    setProductList(fetchProducts());
  }, []);

  const fetchProducts = () => {
    return input.inputs
      .filter((product: Product) => {
        return product.product?.class !== 'SEMENTE'
      })
      .map((input) => {
        return {
          id: input.id,
          label: `${input?.product?.name}`,
        }
      })
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
      <Row style={{ marginTop: '2%' }}>
        <Col>
        <span className="p-float-label">
            <AutoComplete
              field="label"
              value={formik.values.selectedProduct}
              suggestions={productList}
              completeMethod={autoComplete}
              onChange={(e: any) => {
                setProduct(e.value)
                setSelectedProduct(e.value)
                formik.setFieldValue("selectedProduct", e.target.value);
              }}
              forceSelection
              dropdown
              className={classNames({
                "p-invalid": formik.touched.selectedProduct && formik.errors.selectedProduct,
              })}
              style={{ width: '100%' }}
            />
            {formik.touched.selectedProduct && formik.errors.selectedProduct ? (
              <div
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Roboto",
                }}
              >
                {formik.errors.selectedProduct}
              </div>
            ) : null}
            <label htmlFor="endDate">Produto</label>
          </span>
        </Col>
        <Col>
          <span className="p-float-label">
            <InputNumber
              style={{ marginLeft: '4%' }}
              id="quantity"
              value={quantity}
              onChange={(e) => {
                return setQuantity(Number(e.value))
              }}
              locale="pt-BR"
              minFractionDigits={0}
              maxFractionDigits={2}
            />
            <label htmlFor="quantity" style={{ color: 'black' }}>Qtd/ha (L)</label>
          </span>
        </Col>
        {index !== 0 ? (
          <Col md={1}>
            <Button
              onClick={() => {
                onHandleRemove(index)
              }}
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </div>
  )
}
