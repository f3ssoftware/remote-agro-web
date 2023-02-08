import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { asyncFetchFarms, selectAFarm, setFarms } from '../../../../stores/farm.store'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData } from '../../../../stores/commerce.store'
import { calculateHumidityDiscount } from './weighingsHelpers'

export function NewInputWeighing() {
  const dispatch = useDispatch<any>()
  const { farm, commerce, seasons } = useSelector((state: RootState) => state)
  const [selectedFarm, setSelectedFarm]: any = useState({})
  const [selectedPlot, setSelectedPlot]: any = useState({})
  const [selectedSilo, setSelectedSilo]: any = useState({})
  const [selectedCultivar, setSelectedCultivar]: any = useState({})
  const [licensePlate, setLicensePlate] = useState('')
  const [driver, setDriver] = useState('')
  const [netWeighing, setNetWeighing] = useState(0)
  const [grossWeighing, setGrossWeighing] = useState(0)
  const [tare, setTare] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [humidityDiscount, setHumidityDiscount] = useState(0)
  const [impurity, setImpurity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalWeighning, setTotalWeighning] = useState(0)
  const [observation, setObservation] = useState('')
  const [company, setCompany] = useState('')

  useEffect(() => {
    dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id }))
    dispatch(asyncFetchSiloData())
    setSelectedFarm(farm?.farms[0])
    dispatch(selectAFarm(farm?.farms[0]))
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing-tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity==0? 0: impurity-1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(calculateHumidityDiscount(humidity, selectedCultivar?.cultivation_id))
  }, [humidity])

  useEffect(() => {
    dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id, include: 'cultivares' }));
    setSelectedFarm(null);
    setSelectedPlot(null);
    setSelectedCultivar(null);
  }, [seasons])



  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Fazenda</Form.Label>
            <Typeahead
              id="farm"
              onChange={(selected: any) => {
                setSelectedFarm(selected[0])
              }}
              options={farm?.farms?.map((farm: any) => {
                return { id: farm.id, label: farm.name, ...farm }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Talhões</Form.Label>
            {selectedFarm?.fields?.length > 0 ? <Typeahead
              id="field"
              onChange={(selected: any) => {
                setSelectedPlot(selected[0])
              }}
              options={selectedFarm?.fields?.map((field: any) => {
                return { id: field.id, label: field.name, ...field }
              })}/> : <></>}
            
            {/* <Form.Select
              value={selectedPlot?.name}
              aria-label=""
              onChange={(e) => {
                return setSelectedPlot(e.target.value)
              }}
            >
              {' '}
              {selectedFarm?.fields?.map((field: any, index: number) => {
                return <option key={index}>{field.name}</option>
              })}
            </Form.Select> */}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Cultivar</Form.Label>
            {selectedPlot?.cultivares?.length > 0 ? <Typeahead
              id="cultivar"
              onChange={(selected: any) => {
                setSelectedCultivar(selected[0])
              }}
              options={selectedPlot?.cultivares?.map((cultivar: any) => {
                return { id: cultivar.id, label: cultivar.name, ...cultivar }
              })}
            /> : <></>}
            
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Silo</Form.Label>
            <Typeahead
              id="silo"
              onChange={(selected: any) => {
                setSelectedSilo(selected[0])
              }}
              options={commerce?.silo?.map((silo: any) => {
                return { id: silo.id, label: silo.name, ...silo }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Placa</Form.Label>
            <Form.Control
              type="text"
              value={licensePlate}
              onChange={(e) => {
                setLicensePlate(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Motorista</Form.Label>
            <Form.Control
              type="text"
              value={driver}
              onChange={(e) => {
                setDriver(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Transportadora</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso Bruto</Form.Label>
            <Form.Control
              type="number"
              value={grossWeighing}
              onChange={(e) => {
                setGrossWeighing(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Tara</Form.Label>
            <Form.Control
              type="number"
              value={tare}
              onChange={(e) => {
                setTare(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso líquido</Form.Label>
            <Form.Control
              type="number"
              value={netWeighing}
              onChange={(e) => {
                setNetWeighing(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>UMID (%)</Form.Label>
            <Form.Control
              type="number"
              value={humidity}
              onChange={(e) => {
                setHumidity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Desconto UMID (%)</Form.Label>
            <Form.Control
              type="number"
              value={humidityDiscount}
              onChange={(e) => {
                setHumidityDiscount(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Impureza (%)</Form.Label>
            <Form.Control
              type="number"
              value={impurity}
              onChange={(e) => {
                setImpurity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Desconto (%)</Form.Label>
            <Form.Control
              type="number"
              value={discount}
              onChange={(e) => {
                setDiscount(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>
              Desconto total (%)
            </Form.Label>
            <Form.Control
              type="number"
              value={totalDiscount}
              onChange={(e) => {
                setTotalDiscount(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso final</Form.Label>
            <Form.Control
              type="number"
              value={totalWeighning}
              onChange={(e) => {
                setTotalWeighning(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Observações</Form.Label>
            <Form.Control
              type="text"
              value={observation}
              onChange={(e) => {
                setObservation(e.target.value)
              }}
            />
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
          variant="success"
          onClick={() => {
            // register()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
