import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchInput } from '../../../stores/input.store'

export function NewDefensivePrescription({
  index,
  onHandleRemove,
  onHandleUpdate,
  flowRate,
  area,
  tankNumbers,
}: {
  index: number
  onHandleRemove: any
  onHandleUpdate: any
  flowRate: number
  area: number
  tankNumbers: number
}) {
  const [product, setProduct] = useState({ id: 0 })
  const [quantity, setQuantity] = useState(0)
  const [test, setTest] = useState(0)
  const [tank, setTank] = useState(0)
  const { input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    onHandleUpdate(index, { user_product_id: product.id, quantity: quantity })
  }, [product, quantity])

  useEffect(() => {
    dispatch(asyncFetchInput())
  }, [])

  useEffect(() => {
    setTest((quantity/flowRate)*1000)
  }, [quantity, flowRate])

  useEffect(() => {
    setTank((quantity*area)/tankNumbers)
  }, [quantity, area, tank])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Produtos</Form.Label>
            <Typeahead
              id="product_input"
              onChange={(selected: any) => {
                if (selected.length > 0) {
                  setProduct({ id: selected[0].id })
                }
              }}
              options={input.inputs
                .filter((i) => i.product?.class !== 'SEMENTE')
                .map((input) => {
                  return { id: input.id, label: `${input?.product?.name}` }
                })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Qtd/ha (L)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Teste (mL)</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={test}
              onChange={(e) => {
                return setTest(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Tanque (L)</Form.Label>
            <Form.Control
              type="number"
              disabled
              value={tank}
              onChange={(e) => {
                return setTank(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}