import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { asyncFetchFarms, selectAFarm } from '../../../../stores/farm.store'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData } from '../../../../stores/commerce.store'
import { asyncFetchContractsData, asyncFetchCultivations } from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'


export function NewOutputWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { financial, commerce } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [selectedContract, setSelectedContract]: any = useState({})
  const [selectedSilo, setSelectedSilo]: any = useState({})
  const [licensePlate, setLicensePlate] = useState('')
  const [driver, setDriver] = useState('')
  const [netWeighing, setNetWeighing] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [humidityDiscount, setHumidityDiscount] = useState(0)
  const [impurity, setImpurity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalWeighning, setTotalWeighning] = useState(0)
  const [observation, setObservation] = useState('')
  const [company, setCompany] = useState('')

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchSiloData())
    dispatch(asyncFetchCultivations())
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])


  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color:'#fff'}}>Cultura</Form.Label>
            <Typeahead
              id="cultivation"
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0]);
              }}
              options={financial.cultivations.map((cultivation: Cultivation) => {
                return { id: cultivation.id, label: cultivation.name, ...cultivation }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color: '#fff'}}>Contratos</Form.Label>
            <Typeahead
              id="contract"
              onChange={(selected: any) => {
                setSelectedContract(selected[0]);
              }}
              options={financial?.contracts?.map((contract: any) => {
                return { id: contract.id, label: contract.name, ...contract }
              })}
            />
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
            <Form.Label style={{color: '#fff'}}>Silo</Form.Label>
            <Typeahead
              id="silo"
              onChange={(selected: any) => {
                setSelectedSilo(selected[0]);
              }}
              options={commerce?.silo?.map((silo: any) => {
                return { id: silo.id, label: silo.name, ...silo }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Placa</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Motorista</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Transportadora</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Peso líquido</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>UMID (%)</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Desconto UMID (%)</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Impureza (%)</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Desconto (%)</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Desconto total (%)</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Peso final</Form.Label>
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
            <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
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
