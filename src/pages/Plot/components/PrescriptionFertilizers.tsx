import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchApplicationData, asyncFetchAppliers, asyncPrescription } from '../../../stores/plot.store'
import { Applier } from '../../../models/Applier'
import { FertilizerPrescriptionModal } from '../Modals/FertilizerPrescriptionModal'
import { Application } from '../../../models/Application'

export function PrescriptionFertilizers({handleClose, selectedFarm}:{handleClose: any, selectedFarm: any}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [applicationType, setApplicationType] = useState('A lanço')
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot, user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>()
  const [area, setArea] = useState(0)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)

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
            {selectedFarm?.fields?.length > 0 ? (
              <Typeahead
                id="field"
                selected={selectedFarm?.fields?.filter(
                  (field: any) => field?.id === selectedPlot?.id,
                )}
                labelKey={(selected: any) => selected?.name}
                isInvalid={!selectedPlot?.id}
                onChange={(selected: any) => {
                  setSelectedPlot(selected[0])
                }}
                options={selectedFarm?.fields?.map((field: any) => {
                  return { id: field.id, label: field.name, ...field }
                })}
              />
              
            ) : (
              <></>
            )}
          </Form.Group>
          {selectedPlot?.total_area > 0 ?(<><Form.Range min={0} max={selectedPlot?.total_area} value={area} onChange={(e) => {
            return setArea(Number(e.target.value))
          } } /><Form.Label>Área aplicada: {area}</Form.Label></>):(<></>)}
        </Col>
      </Row>
      <Row>
        {' '}
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
                    <option value={'Cocho'}>Cocho</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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
              style={{ backgroundColor: '#A5CD33', color: '#000' }}
              variant="success"
              onClick={() => {
                setShowNewPrescriptionModal(true)
              }}
            >
              Avançar
            </Button>
          </div>
          <FertilizerPrescriptionModal
        show={showNewPrescriptionModal}
        handleClose={handleClose}
        accountable={accountable}
        area={area}
        applier={selectedApplier}
        date={dateTime.toISOString()}
        applicationType={applicationType}
        selectedFarm={selectedFarm}
        selectedPlot={selectedPlot}
      ></FertilizerPrescriptionModal>
    </div>
  )
}
