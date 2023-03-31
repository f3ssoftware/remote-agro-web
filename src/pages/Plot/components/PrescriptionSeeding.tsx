import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Applier } from '../../../models/Applier'
import { Product } from '../../../models/Product'
import { asyncFetchApplicationData, asyncFetchAppliers, asyncPrescription } from '../../../stores/plot.store'
import { asyncFetchInput } from '../../../stores/input.store'
import { NewPrescriptionModal } from '../Modals/NewPrescriptionModal'
import { Application } from '../../../models/Application'

export function PrescriptionSeeding({
  handleClose,
  selectedFarm,
}: {
  handleClose: any
  selectedFarm: any
}) {
  const [accountable, setAccountable] = useState('')
  const [dateTime, setDateTime] = useState(new Date())
  const [fertilizing, setFertilizing] = useState('')
  const [seedQuantity, setSeedQuantity] = useState(0)
  const [lineSpacing, setLineSpacing] = useState(0)
  const [jet, setJet] = useState('')
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedApplier, setSelectedApplier]: any = useState<any>({})
  const { plot, input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [seed, setSeed] = useState({ id: 0 });
  const [flowRate, setFlowRate] = useState(0)
  const [product, setProduct] = useState({id: 0})
  const [area, setArea] = useState(0)
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)
  const [productQuantity, setProductQuantity] = useState(0)

  useEffect(() => {
    dispatch(asyncFetchAppliers({user_id: JSON.parse(sessionStorage.getItem('user')!).user_id}));
    dispatch(asyncFetchApplicationData())
    dispatch(asyncFetchInput())
  }, []);

  const next = () =>{
    const seeding: Application = {
      type:'Semeadura',
      accountable: accountable,
      area: area,
      applier_id: selectedApplier.id,
      date: dateTime.toISOString(),
      fertilizer_id: product.id,
      fertilizer_quantity: productQuantity,
      seed_id: seed.id,
      seed_quantity: seedQuantity,
      lines_spacing: lineSpacing,
      flow_rate: flowRate,
      farm_id: selectedFarm.id,
      correct_decimals: true,
      fields: [{id: selectedPlot.id, area: area}]
    }
    dispatch(asyncPrescription(seeding))
  }
  
  
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
            <Form.Label style={{ color: '#fff' }}>Aplicador</Form.Label>
            <Typeahead
              id="applier"
              onChange={(selected: any) => {
                setSelectedApplier(selected[0])
              }}
              selected={plot?.appliers?.filter(
                (applier: any) => applier?.id === selectedApplier?.id,
              )}
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
            <Form.Label style={{ color: '#fff' }}>Data</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Possui adubação?</Form.Label>
            <Form.Select
              aria-label=""
              placeholder='selecione'
              onChange={(e) => {
                return setFertilizing(e.target.value)
              }}
            >
              <option value={''}></option>
              <option value={'Sim'}>Sim</option>
              <option value={'Não'}>Não</option>
            </Form.Select>
          </Form.Group>
        </Col>
        {fertilizing=='Sim' ?(
            <><Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Produtos</Form.Label>
              <Typeahead
                id="product_input"
                onChange={(selected: any) => {
                  if (selected.length > 0) {
                    setProduct({ id: selected[0].id })
                  }
                } }
                options={input.inputs.filter(i => i.product?.class !== 'SEMENTE').map((input) => { return { id: input.id, label: `${input?.product?.name}` } })} />
            </Form.Group>
          </Col><Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>Dose/ha (Kg)</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    return setProductQuantity(Number(e.target.value))
                  } } />
              </Form.Group>
            </Col></>
          ):(<div></div>)}
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Semente/Cultivar</Form.Label>
            <Typeahead
              id="seed"
              onChange={(selected: any) => {
                if (selected.length > 0) {
                  setSeed({ id: selected[0].id })
                }
              }}
              options={input.inputs
                .filter((product: Product) => {
                  return (
                    product.product?.class === 'SEMENTE' &&
                    product.treatment !== 'EXTERNO'
                  )
                })
                .map((input) => {
                  return {
                    id: input.id,
                    label: `${input?.product?.name} - ${input.treatment}`,
                  }
                })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>População (sementes/ha)</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setSeedQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Espaçamento entre linhas</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                return setLineSpacing(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Possui jato dirigido?</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setJet(e.target.value)
              }}
            >
              <option value={''}></option>
              <option value={'Sim'}>Sim</option>
              <option value={'Não'}>Não</option>
            </Form.Select>
          </Form.Group>
        </Col>
      {jet=='Sim' ?(
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
          ):(<div></div>)}
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
                setShowNewPrescriptionModal(true), next()
              }}
            >
              Avançar
            </Button>
          </div>
          {/* <NewPrescriptionModal
        show={showNewPrescriptionModal}
        handleClose={handleClose}
      ></NewPrescriptionModal> */}
    </div>
  )
}
