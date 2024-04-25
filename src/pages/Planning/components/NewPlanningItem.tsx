import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { PlanningInput } from '../../../models/PlanningInput'
import { RootState } from '../../..'
import { asyncFetchInput } from '../../../stores/input.store'
import { Product } from '../../../models/Product'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'

export function NewPlanningItem({
  onHandleRemove,
  index,
  onHandleUpdate,
}: {
  onHandleRemove: any
  index: number
  onHandleUpdate: any
}) {
  const [payDate, setPayDate] = useState(new Date())
  const [quantity, setQuantity] = useState<number>()
  const [productId, setProductId] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('')
  const [observation, setObservation] = useState('')
  const [userHasProduct, setUserHasProduct] = useState(false)
  const [userProductId, setUserProductId] = useState(0)
  const [isSeed, setIsSeed] = useState(false)
  const { input } = useSelector((state: RootState) => state)
  const [totalCost, setTotalCost] = useState<number>()
  const [seedQuantityType, setSeedQuantityType] = useState('')
  const [treatment, setTreatment] = useState('NÃO TRATADA')
  const [pms, setPms] = useState('')
  const dispatch = useDispatch<any>()
  const [productList, setProductList] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>()

  useEffect(() => {
    const p: PlanningInput = {
      measure_unit: measureUnit,
      observations: observation,
      quantity: quantity,
      total_price: totalCost,
      payment_date: payDate.toISOString(),
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

    onHandleUpdate(p, index)
  }, [
    productId,
    measureUnit,
    observation,
    quantity,
    totalCost,
    payDate,
    treatment,
    seedQuantityType,
  ])

  useEffect(() => {
    dispatch(asyncFetchInput())
  }, [])

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = input.generalProductsList.filter((product) =>
      product.name.toLowerCase().includes(query),
    )
    setProductList(resultSet)
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col md={2}>
          <span className="p-float-label">
            <AutoComplete
              field="name"
              value={selectedProduct}
              suggestions={productList}
              completeMethod={autoComplete}
              onChange={(e: any) => {
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
            />
            <label htmlFor="endDate">Produto</label>
          </span>
        </Col>
        {/* <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
            <Typeahead
              id="product"
              onChange={(selected: any) => {
                if (selected.length > 0) {
                  const p = selected[0]
                  console.log(productId)
                  const userProducts = input.inputs.filter(
                    (i) => i.product?.name === p.label,
                  )

                  setUserProductId(userProducts[0].id!)
                  setMeasureUnit(userProducts[0].measure_unit!)
                  if (p?.class === 'SEMENTE') {
                    setIsSeed(true)
                  }
                  setUserHasProduct(false)
                  setProductId(p.id)
                }
              }}
              options={input.generalProductsList.map((input) => {
                return { id: input.id, label: input?.name, class: input.class }
              })}
            />
          </Form.Group>
        </Col> */}
        {!userHasProduct ? (
          <Col md={2}>
            <span className="p-float-label">
              <InputText
                id="measureUnit"
                name="measureUnit"
                value={measureUnit}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setMeasureUnit(e.target.value)
                }}
              />
              <label htmlFor="measureUnit">Unidade de medida</label>
            </span>
          </Col>
        ) : (
          <></>
        )}
        <Col md={2}>
          <span className="p-float-label">
            <Calendar
              onChange={(e: any) => {
                setPayDate(e.value!)
              }}
              locale="en"
              dateFormat="dd/mm/yyyy"
            />
            <label htmlFor="date">Data de pagamento</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={payDate}
                onChange={(date: Date) => setPayDate(date)}
              />
            </Form.Group> */}
        </Col>
        <Col md={2}>
          <span className="p-float-label">
            <InputNumber
              id="quantity"
              value={quantity}
              onValueChange={(e) => {
                setQuantity(Number(e.value))
              }}
              inputStyle={{ width: '100%' }}
            />
            <label htmlFor="quantity">Quantidade</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group> */}
        </Col>
        <Col md={2}>
          <span className="p-float-label">
            <InputNumber
              inputId="currency-br"
              value={totalCost}
              onValueChange={(e) => {
                setTotalCost(Number(e.value))
              }}
              mode="currency"
              currency="BRL"
              minFractionDigits={2}
              maxFractionDigits={2}
              locale="pt-BR"
              inputStyle={{ width: '100%' }}
            />
            <label htmlFor="contractId">Custo total</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Custo total</Form.Label>
            <Form.Control
              type="text"
              onBlur={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  e.currentTarget.value = ''
                } else {
                  setTotalCost(Number(e.currentTarget.value))
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
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setObservation(e.target.value)}
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
          <Row style={{ marginTop: '2%' }}>
            <Col>
              <span className="p-float-label">
                <Dropdown
                  value={seedQuantityType}
                  options={[
                    { label: 'KG', value: 'KG' },
                    { label: 'SACOS', value: 'SACOS' },
                    { label: 'UNIDADE', value: 'UNIDADE' },
                  ]}
                  onChange={(e) => setSeedQuantityType(e.value)}
                  placeholder="Selecione"
                />
                <label>Kgs, sacos ou unidade</label>
              </span>
            </Col>
            <Col>
              <span className="p-float-label">
                <Dropdown
                  value={treatment}
                  options={[
                    { label: 'Não Tratada', value: 'NÃO TRATADA' },
                    { label: 'Externo', value: 'EXTERNO' },
                    { label: 'Interno', value: 'INTERNO' },
                  ]}
                  onChange={(e) => setTreatment(e.value)}
                  placeholder="Selecione"
                />
                <label>Tratamento</label>
              </span>
            </Col>
            <Col>
              <span className="p-float-label">
                <InputText
                  type="text"
                  value={pms}
                  onChange={(e) => setPms(e.target.value)}
                />
                <label>PMS (g)</label>
              </span>
            </Col>
          </Row>
        ) : (
          // <Row>
          //   <Col>
          //     <Form.Group className="mb-3" controlId="">
          //       <Form.Label style={{ color: '#fff' }}>
          //         Kgs, sacos ou unidade
          //       </Form.Label>
          //       <Form.Select
          //         aria-label=""
          //         onChange={(e) => {
          //           return setSeedQuantityType(e.target.value)
          //         }}
          //       >
          //         <option value="KG">KG</option>
          //         <option value="SACOS">SACOS</option>
          //         <option value="UNIDADE">UNIDADE</option>
          //       </Form.Select>
          //     </Form.Group>
          //   </Col>
          //   <Col>
          //     <Form.Group className="mb-3" controlId="">
          //       <Form.Label style={{ color: '#fff' }}>Tratamento</Form.Label>
          //       <Form.Select
          //         aria-label=""
          //         onChange={(e) => {
          //           return setTreatment(e.target.value)
          //         }}
          //       >
          //         <option value="NÃO TRATADA">Não Tratada</option>
          //         <option value="EXTERNO">Externo</option>
          //         <option value="INTERNO">Interno</option>
          //       </Form.Select>
          //     </Form.Group>
          //   </Col>
          //   <Col>
          //     <Form.Group className="mb-3" controlId="">
          //       <Form.Label style={{ color: '#fff' }}>PMS (g)</Form.Label>
          //       <Form.Control
          //         type="text"
          //         onChange={(e) => {
          //           setPms(e.target.value)
          //         }}
          //       />
          //     </Form.Group>
          //   </Col>
          // </Row>
          <></>
        )}
      </div>
    </div>
  )
}
