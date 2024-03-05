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

export function NewFertilizerPrescription({
  index,
  onHandleRemove,
  onHandleUpdate,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
}) {
  const [product, setProduct] = useState<any>({ id: 0 })
  const [quantity, setQuantity] = useState(0)
  const { input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedProduct, setSelectedProduct] = useState<any>()
  const [productList, setProductList] = useState<any[]>([])

  useEffect(() => {
    onHandleUpdate(index, { user_product_id: product?.id, quantity: quantity*1000, tank: 0, test: 0, total_quantity: quantity*10000 })
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

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <AutoComplete
              field="label"
              value={selectedProduct}
              suggestions={productList}
              completeMethod={autoComplete}
              onChange={(e: any) => {
                setProduct(e.value)
                setSelectedProduct(e.value)
              }}
              forceSelection
              dropdown
              style={{ width: '100%' }}
            />
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
            <label htmlFor="quantity">Qtd/ha (L)</label>
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
