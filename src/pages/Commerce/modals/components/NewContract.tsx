import { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import {
  asyncFetchCultivations,
  asyncRegisterContract,
} from '../../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { Contract } from '../../../../models/Contract'
import { Cultivation } from '../../../../models/Cultivation'
import { Typeahead } from 'react-bootstrap-typeahead'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

export function NewContract({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [contractName, setContractName] = useState('')
  const [contractId, setContractId] = useState(0)
  const [description, setDescription] = useState('')
  const [bags, setBags] = useState(0)
  const [contractPrice, setContractPrice] = useState(0)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [payDate, setPayDate] = useState<Date | null>(null)
  const [cultivation, setCultivation] = useState<any>();
  const { financial, seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  const register = () => {
    const contract: Contract = {
      name: contractName,
      code: contractId.toString(),
      description: description,
      sacks: bags.toString(),
      amount: contractPrice * 100,
      cultivation_id: cultivation,
      payment_date: payDate?.toISOString(),
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
      type: 'CONTRACT',
      season_id: seasons.selectedSeason.id,
    }
    dispatch(asyncRegisterContract(contract))
  }

  useEffect(() => {
    dispatch(asyncFetchCultivations())
  }, [])

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <InputText value={contractName} onChange={(e) => {
              setContractName(e.target.value);
            }} style={{ width: '100%' }}></InputText>
            <label htmlFor="product">Nome para o contrato</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome para o contrato
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setContractName(e.target.value)
              }}
            />
          </Form.Group> */}
        </Col>
        <Col>
          <span className="p-float-label">
            <InputNumber value={contractId} onChange={(e) => {
              setContractId(e.value!);
            }} style={{ width: '100%' }}></InputNumber>
            <label htmlFor="product">Código do contrato</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Codigo do contrato
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setContractId(Number(e.target.value))
              }}
            />
          </Form.Group> */}
        </Col>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <span className="p-float-label">
              <Dropdown
                value={cultivation}
                onChange={(e) => {
                  setCultivation(e.target.value);
                }}
                optionLabel="name"
                  optionValue="id"
                  placeholder="Cultivo"
                  options={financial.cultivations}
                  style={{ width: '100%' }}
              />
              <label htmlFor="product">Cultivo</label>
            </span>
            {/* <Form.Group as={Col} controlId="formGridState">
              <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
              <Typeahead
                id="cultivation"
                onChange={(selected: any) => {
                  setSelectedCultivations(selected[0])
                }}
                options={financial.cultivations.map(
                  (cultivation: Cultivation, index) => {
                    return { id: cultivation.id, label: cultivation?.name }
                  },
                )}
              />
            </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <InputNumber value={bags} onChange={(e) => {
                setBags(e.value!);
              }} style={{ width: '100%' }}></InputNumber>
              <label htmlFor="product">Sacas Totais</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Sacas Totais</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setBags(Number(e.target.value))
                }}
              />
            </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <InputNumber value={contractPrice} onChange={(e) => {
                setContractPrice(e.value!);
              }} style={{ width: '100%' }} mode="currency"
                currency="BRL"
                locale="pt-BR"></InputNumber>
              <label htmlFor="product">Valor total do contrato</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Valor total do contrato
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setContractPrice(Number(e.target.value))
                }}
              />
            </Form.Group> */}
          </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <span className="p-float-label">
              <Calendar
                onChange={(e: any) => {
                  setStartDate(e.value!);
                }}
                value={startDate}
                locale="en"
                dateFormat="dd/mm/yy"
                style={{ width: '100%' }}
              />
              <label htmlFor="product">Início do contrato</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Inicio do contrato
              </Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <Calendar
                onChange={(e: any) => {
                  setEndDate(e.value!);
                }}
                value={endDate}
                locale="en"
                dateFormat="dd/mm/yy"
                style={{ width: '100%' }}
              />
              <label htmlFor="product">Fim do contrato</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Fim do contrato</Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </Form.Group> */}
          </Col>
          <Col>
            <span className="p-float-label">
              <Calendar
                onChange={(e: any) => {
                  setPayDate(e.value!);
                }}
                locale="en"
                value={payDate}
                dateFormat="dd/mm/yy"
                style={{ width: '100%' }}
              />
              <label htmlFor="product">Data de pagamento</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Data de pagamento
              </Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={payDate}
                onChange={(date: Date) => setPayDate(date)}
              />
            </Form.Group> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="p-float-label">
              <InputText value={description} onChange={(e) => {
                setDescription(e.target.value);
              }} style={{ width: '100%' }}></InputText>
              <label htmlFor="product">Descrição adicional</label>
            </span>
            {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Descrição adicional
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Form.Group> */}
          </Col>
        </Row>
      </Row>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        <Button
          variant="success"
          onClick={() => {
            register()
            handleClose()
          }}
        >
          Registrar
        </Button>
      </div>
    </div >
  )
}
