import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
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

export function EditPlanningItem({
  onHandleRemove,
  index,
  onHandleUpdate,
  isRegisterClicked,
  inputAddLineCompsValidation,
  setInputAddLineCompsValidation,
  inputAddLineValidation,
  setInputAddLineValidation,
  referenceName
}: {
  onHandleRemove: any
  index: number
  onHandleUpdate: any
  isRegisterClicked: boolean
  inputAddLineCompsValidation: any
  setInputAddLineCompsValidation: Function
  inputAddLineValidation: any
  setInputAddLineValidation: Function
  referenceName: string
}) {
  const [payDate, setPayDate] = useState(new Date())
  const [quantity, setQuantity] = useState(0)
  const [productId, setProductId] = useState(0)
  const [measureUnit, setMeasureUnit] = useState('')
  const [observation, setObservation] = useState('')
  const [userHasProduct, setUserHasProduct] = useState(false)
  const [userProductId, setUserProductId] = useState(0)
  const [id, setId] = useState(0)
  const [isSeed, setIsSeed] = useState(false)
  const [totalCost, setTotalCost] = useState(0)
  const [seedQuantityType, setSeedQuantityType] = useState('')
  const [treatment, setTreatment] = useState('NÃO TRATADA')
  const [pms, setPms] = useState('')
  const dispatch = useDispatch<any>()
  const { planning, input } = useSelector((state: RootState) => state)

  useEffect(() => {
    const p: PlanningInput = {
      measure_unit: measureUnit,
      observations: observation,
      quantity: quantity,
      total_price: totalCost,
      payment_date: payDate.toISOString(),
      product_id: productId,
      id: id
    }
    if (isSeed) {
      p.treatment = treatment
      p.pms = pms
      p.seed_quantity_type = seedQuantityType
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

  const fillFormEdit = () => {
    planning.editPlannings?.plannings_products?.map((item: any, index) => {
      // const p: any = input.inputs.filter(
      //   (products: any) => products.id === item.product_id,
      // )[0]
      // setProductId(p)
      setMeasureUnit(item.measure_unit!)
      setPayDate(new Date(item.payment_date!))
      setQuantity(item.quantity!)
      setTotalCost(item.total_price!)
      setObservation(item.observations!)
      setSeedQuantityType(item.seed_quantity_type!)
      setTreatment(item.treatment!)
      setPms(item.pms!)
      setId(item.id!)
    })
  }

  useEffect(() => {
    fillFormEdit()
  }, [planning])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Produto</Form.Label>
            <Typeahead
              id="product"
              // selected={input.inputs.filter(
              //   (product: any) => product?.id === productId,
              // )}
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
        </Col>
        {!userHasProduct ? (
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Unidade Medida</Form.Label>
              <Form.Control
                type="text"
                value={measureUnit}
                onChange={(e) => {
                  setMeasureUnit(e.target.value)
                }}
              />
            </Form.Group>
          </Col>
        ) : (
          <></>
        )}
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={payDate}
              onChange={(date: Date) => setPayDate(date)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Custo total</Form.Label>
            <Form.Control
              type="text"
              value={totalCost}
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
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </Form.Group>
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
      <div style={{ paddingLeft: '4%', paddingRight: '4%' }}>
        {isSeed ? (
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>
                  Kgs, sacos ou unidade
                </Form.Label>
                <Form.Select
                  aria-label=""
                  onChange={(e) => {
                    return setSeedQuantityType(e.target.value)
                  }}
                >
                  <option value="KG">KG</option>
                  <option value="SACOS">SACOS</option>
                  <option value="UNIDADE">UNIDADE</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Tratamento</Form.Label>
                <Form.Select
                  aria-label=""
                  onChange={(e) => {
                    return setTreatment(e.target.value)
                  }}
                >
                  <option value="NÃO TRATADA">Não Tratada</option>
                  <option value="EXTERNO">Externo</option>
                  <option value="INTERNO">Interno</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>PMS (g)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setPms(e.target.value)
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
