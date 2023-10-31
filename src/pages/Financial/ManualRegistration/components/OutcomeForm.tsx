import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { ExpenseInvoice } from '../../../../models/ExpenseInvoice'
import { useDispatch, useSelector } from 'react-redux'
import {
  asyncFetchPlannings,
  asyncManualRegisterExpense,
} from '../../../../stores/financial.store'
import { RootState } from '../../../..'
import { Installments } from './Installments'
import { MensalExpense } from './MensalExpense'
import { useNavigate } from 'react-router-dom'

export function OutcomeForm({
  costType,
  costAction,
  sefaz,
}: {
  costType: string
  costAction: string
  sefaz?: any
}) {
  const navigate = useNavigate()
  const [outcomeYear, setOutcomeYear] = useState('')
  const [reference, setReference] = useState('')
  const [amount, setAmount] = useState('')
  const [observation, setObservation] = useState('')
  const [number, setNumber] = useState(0)
  const [plan, setPlan] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('one_time')
  const [expirationDate, setExpirationDate] = useState(new Date())
  const dispatch = useDispatch<any>()
  const { financial, seasons } = useSelector((state: RootState) => state)
  const [installmentsQuantity, setInstallmentsQuantity] = useState(0)
  const [installments, setInstallments]: any = useState({})
  const [externalInvoiceId, setExternalInvoiceId] = useState(0)
  const [recurrencyDate, setRecurrencyDate] = useState(new Date())
  const [recurrencyQuantity, setRecurrencyQuantity] = useState(1)

  useEffect(() => {
    dispatch(asyncFetchPlannings())
    if (sefaz) {
      setReference(sefaz.reference)
      setAmount(sefaz.amount)
      setNumber(sefaz.number)
      setExternalInvoiceId(sefaz.externalInvoiceId)
    }
    setOutcomeYear(seasons.selectedSeason.year)
  }, [])

  // useEffect(() => {
  //   console.log('amount mudou', amount);
  // }, [amount])

  // useEffect(() => {
  //   console.log(expirationDate)
  // }, [outcomeYear, reference, amount, observation, number, plan, paymentMethod, expirationDate]);

  const updateInstallments = (installmentsFromChildren: any[]) => {
    setInstallments(installmentsFromChildren)
  }
  const register = async () => {
    const exp: ExpenseInvoice = {
      amount: Number(amount),
      number: number.toString(),
      reference,
      cost_type: costType,
      due_date: expirationDate.toISOString(),
      cost_action: costAction,
      payment_method: paymentMethod,
      year: outcomeYear.toString(),
      external_expenses_invoice_id: externalInvoiceId,
      observations: observation,
    }

    switch (paymentMethod) {
      case 'one_time':
        {
          await dispatch(asyncManualRegisterExpense(exp))
          navigate('financial/balance')
        }
        break
      case 'installments':
        {
          exp.installments = installments
          await dispatch(asyncManualRegisterExpense(exp))
          navigate('financial/balance')
        }
        break
      case 'recurrency':
        {
          for (let i = 0; i < recurrencyQuantity; i++) {
            exp.due_date = new Date(
              recurrencyDate.getFullYear(),
              recurrencyDate.getMonth() + i,
              recurrencyDate.getDate(),
            ).toISOString()
            await dispatch(asyncManualRegisterExpense(exp))
            navigate('financial/balance')
          }
        }
        break
      default: {
        await dispatch(asyncManualRegisterExpense(exp))
        navigate('financial/balance')
      }
    }
  }

  const renderPaymentConditionForm = () => {
    switch (paymentMethod) {
      case 'none': {
        return <></>
      }
      case 'one_time': {
        return (
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Data de pagamento</Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={expirationDate}
                onChange={(date: Date) => setExpirationDate(date)}
              />
            </Form.Group>
          </Col>
        )
      }
      case 'installments': {
        return (
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Quantidade de Parcelas</Form.Label>
              <Form.Control
                type="number"
                min={2}
                onBlur={(e) => {
                  setInstallmentsQuantity(Number(e.target.value))
                }}
              />
            </Form.Group>
            <Installments
              installmentsQuantity={installmentsQuantity}
              onUpdateInstallments={updateInstallments}
              totalAmount={Number(amount)}
            ></Installments>
          </Col>
        )
      }
      case 'recurrency': {
        return (
          <Col>
            <MensalExpense
              onHandleUpdate={(
                paymentDate: Date,
                recurrencyQuantity: number,
              ) => {
                setRecurrencyDate(paymentDate)
                setRecurrencyQuantity(recurrencyQuantity)
              }}
            ></MensalExpense>
          </Col>
        )
      }
    }
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Ano agrícola</Form.Label>
            <Form.Select
              value={outcomeYear}
              aria-label=""
              onChange={(e) => {
                return setOutcomeYear(e.target.value)
              }}
            >
              {' '}
              {seasons.seasons.map((season, index) => {
                return (
                  <option value={season.year} key={index}>
                    {season.year}
                  </option>
                )
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Referência</Form.Label>
            <Form.Control
              type="text"
              value={reference}
              onChange={(e) => {
                return setReference(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              value={amount}
              onChange={(e) => {
                setAmount(e.currentTarget.value)
              }}
              type="text"
              onBlur={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  e.currentTarget.value = ''
                } else {
                  setAmount(e.currentTarget.value)
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
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              type="text"
              value={observation}
              onChange={(e) => {
                console.log('observation', e.target.value)
                setObservation(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="number"
              value={number}
              onChange={(e) => {
                return setNumber(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Vincular Planejamento</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setPlan(Number(e.target.value))
              }}
            >
              <option>Não Vincular</option>
              {financial.plannings.map((p) => {
                return <option value={p.id}>{p.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Método de pagamento</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setPaymentMethod(e.target.value)
              }}
            >
              <option value={'one_time'}>Á vista</option>
              <option value={'installments'}>A prazo</option>
              <option value={'recurrency'}>Gasto mensal</option>
              <option value={'none'}>Sem necessidade de pagamento</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {renderPaymentConditionForm()}
      </Row>
      <div className="flex-right">
        <Button
          variant="success"
          onClick={() => {
            register()
          }}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}
