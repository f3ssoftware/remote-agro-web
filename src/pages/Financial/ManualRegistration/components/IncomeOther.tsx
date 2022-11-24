import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Cultivation } from '../../../../models/Cultivation'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Contract } from '../../../../models/Contract'
import { asyncFetchCultivations, asyncRegisterContract } from '../../../../stores/financial.store'

export function IncomeOthers() {
  const { financial, seasons } = useSelector((state: RootState) => state);
  const [sacks, setSacks] = useState(0);
  const [reference, setReference] = useState('')
  const [totalValue, setTotalValue] = useState(0)
  const [receiveDate, setReceiveDate] = useState(new Date())
  const [description, setDescription] = useState('')
  const [cultivation, setCultivation] = useState(new Cultivation());
  const [code, setCode] = useState('');

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(asyncFetchCultivations());
  }, [])
  useEffect(() => {
    console.log(receiveDate)
  }, [reference, totalValue, receiveDate, description])

  const register = () => {
    const contract: Contract = {
      amount: totalValue,
      code,
      cultivation_id: cultivation.id,
      cultivation_name: cultivation.name,
      description,
      end_date: new Date().toISOString(),
      start_date: receiveDate.toISOString(),
      name: reference,
      payment_date: receiveDate.toISOString(),
      sacks: sacks.toString(),
      season_id: seasons.selectedSeason.id,
      type: "OTHER"
    }

    dispatch(asyncRegisterContract(contract));
  }
  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Referência</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                return setReference(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Código</Form.Label>
            <Form.Control type="text" onChange={(e) => { return setCode(e.target.value)}} />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Valor Total</Form.Label>
            <Form.Control
              type="text"
              onBlur={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  e.currentTarget.value = '';
                } else {
                  setTotalValue(Number(e.target.value))
                  e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                }
              }} onKeyUp={(e) => {
                if (e.key === 'Backspace') {
                  e.currentTarget.value = '';
                }
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Sacas totais</Form.Label>
            <Form.Control type="number" onChange={(e) => { return setSacks(Number(e.target.value)); }} />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >Cultivo</Form.Label>
            <Typeahead
              id="cultivation"
              onChange={(selected: any) => {
                setCultivation(selected[0]);
              }}
              options={financial.cultivations.map((cultivation: Cultivation, index) => { return { id: cultivation.id, label: cultivation?.name } })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label >
              Inicio do contrato
            </Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={receiveDate}
              onChange={(date: Date) => setReceiveDate(date)}
            />
          </Form.Group>
        </Col>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label >
                Descrição adicional
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  return setDescription(e.target.value)
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Row>
      <div className="flex-right">
        <Button variant="success" onClick={() => register()}>Registrar</Button>
      </div>
    </div>
  )
}
