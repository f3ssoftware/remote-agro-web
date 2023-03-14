import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchAppliers } from '../../../stores/plot.store'

export function PrescriptionDefensive({handleClose, selectedFarm}:{handleClose: any, selectedFarm: any}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [applicator, setApplicator] = useState(0)
  const [nozzle, setNozzle] = useState(0)
  const [applicationType, setApplicationType] = useState(0)
  const [flowRate, setFlowRate] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [fullSyrup, setFullSyrup] = useState(0)
  const [tankNumbers,setTankNumbers] = useState(0)
  const [tankSyrup,setTankSyrup] = useState(0)
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(asyncFetchAppliers);
  }, []);

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
      <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Talhões</Form.Label>
            {selectedFarm?.fields?.length > 0 ? <Typeahead
              id="field"
              selected={selectedFarm?.fields.filter((field: any) => field?.id === selectedPlot?.id)}
              labelKey={(selected: any) => selected?.name}
              isInvalid={!selectedPlot?.id}
              onChange={(selected: any) => {
                setSelectedPlot(selected[0])
              }}
              options={selectedFarm?.fields?.map((field: any) => {
                return { id: field.id, label: field.name, ...field }
              })} /> : <></>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {' '}
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setAccountable(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Inicio do contrato
            </Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={dateTime}
              onChange={(date: Date) => setDateTime(date)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Aplicador</Form.Label>
            <Typeahead
              id="farm"
              selected={plot?.appliers.filter((applier: any) => applier?.id === selectedApplier?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedApplier?.id}
              onChange={(selected: any) => {
                setSelectedApplier(selected[0])
              }}
              options={plot?.appliers?.map((applier: any) => {
                return { ...applier, label: applier.name }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Bico</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setNozzle(Number(e.target.value))
              }}
            >
              <option value={0}>selecione</option>
              <option value={1}>teste</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Tipo de aplicação</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setApplicationType(Number(e.target.value))
              }}
            >
              <option value={0}>selecione</option>
              <option value={1}>teste</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Vazão (L/ha)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setFlowRate(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Pressão (Pa)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setPressure(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Calda total (L)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setFullSyrup(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Nª de tanques</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTankNumbers(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Calda/tanque (L)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setTankSyrup(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}
