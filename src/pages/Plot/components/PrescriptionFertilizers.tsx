import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchApplicationData, asyncFetchAppliers } from '../../../stores/plot.store'
import { Applier } from '../../../models/Applier'

export function PrescriptionFertilizers({handleClose, selectedFarm}:{handleClose: any, selectedFarm: any}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [applicationType, setApplicationType] = useState('A lanço')
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot, user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(asyncFetchAppliers({user_id: JSON.parse(sessionStorage.getItem('user')!).user_id}));
    dispatch(asyncFetchApplicationData())
  }, []);

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
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
            <Form.Label style={{ color: '#fff' }}>Talhões</Form.Label>
            {selectedFarm?.fields?.length > 0 ? <Typeahead
              id="field"
              multiple
              selected={selectedFarm?.fields?.filter((field: any) => field?.id === selectedPlot?.id)}
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
              Aplicador
            </Form.Label>
            <Typeahead
              id="applier"
              onChange={(selected: any) => {
                setSelectedApplier(selected[0]);
              }}
              selected={plot?.appliers?.filter((applier: any) => applier?.id === selectedApplier?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedApplier?.id}
              options={plot?.appliers?.map((applier: Applier) => {
                return { id: applier.id, label: applier.name, ...applier }
              })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Data
            </Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={dateTime}
              onChange={(date: Date) => setDateTime(date)}
            />
          </Form.Group>
        </Col>
      <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Selecione um tipo
                  </Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setApplicationType((e.target.value))
                    }}
                  >
                    <option value={'A lanço'}>A lanço</option>
                    <option value={'Aéreo'}>Incorporado</option>
                    <option value={'Fertirrigação'}>Fertirrigação</option>
                    <option value={'Cocho'}>Fertirrigação</option>
                  </Form.Select>
                </Form.Group>
              </Col>
      </Row>
    </div>
  )
}
