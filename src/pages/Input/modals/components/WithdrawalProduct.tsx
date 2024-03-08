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

let emptyDate: Date
export function WithdrawalProduct({
  index,
  onHandleRemove,
  onHandleUpdate,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
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
    console.log(input.inputs)
    setProducts(input.inputs)
  }, [input])
  return (
    <Row style={{ marginTop: '2%' }}>
      <Col>
        <span className="p-float-label">
          <AutoComplete
            field="product.name"
            value={selectedProduct}
            suggestions={products}
            completeMethod={autoComplete}
            onChange={(e: any) => {
              setProductId(e?.value?.id)
              setSelectedProduct(e.value)
            }}
            dropdown
          />
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
