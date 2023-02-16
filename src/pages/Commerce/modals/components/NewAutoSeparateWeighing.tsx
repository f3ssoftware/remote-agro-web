import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchContractsData, asyncFetchCultivations } from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { calculateHumidityDiscount } from './weighingsHelpers'
import { asyncFetchWeighingData, asyncSeparateWeighing } from '../../../../stores/commerce.store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export function NewAutoSeparateWeighing({onHandleRemove, onHandleUpdate, index}:{onHandleRemove: any, onHandleUpdate: any, index: number}) {
  const dispatch = useDispatch<any>()
  const { financial, commerce } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [selectedContract, setSelectedContract]: any = useState({})
  const [carPlate, setCarPlate] = useState('')
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
  const [reference, setReference] = useState('')
  const [grossWeighing, setGrossWeighing] = useState(0)
  const [tare, setTare] = useState(0)

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchCultivations())
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing-tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity==0? 0: impurity-1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(calculateHumidityDiscount(humidity, selectedCultivation.id))
  }, [humidity])

  // useEffect(() => {
  //   dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id, include: 'cultivation' }));
  // }, [seasons])

  useEffect(()=>{
    setTotalDiscount(discount+humidityDiscount)
  }, [discount,humidityDiscount])

  useEffect(()=>{
    setTotalWeighning(netWeighing*((100-totalDiscount)/100))
  }, [netWeighing, totalDiscount])

  const Save = () =>{
    const manualSeparate = {
      weighings: {
        contract_id: selectedContract.id,
        cultivation_id: selectedCultivation.id,
        reference: reference,
        gross_weight: grossWeighing,
        net_weight: netWeighing,
        humidity: humidity,
        impurity: impurity,
        discount: discount,
        final_weight: totalWeighning,
        type: "Avulsa",
        shipping_company: company,
        humidity_discount: humidityDiscount.toString(),
        total_discount: totalDiscount.toString(),
        observations: observation,
        tare_weight: tare,
        mode: "Manual",
        car_plate: carPlate
      }
    }
    dispatch(asyncSeparateWeighing(manualSeparate))
  }

  useEffect(()=>{
    dispatch(asyncFetchWeighingData())
  }, [])

  const grossResult = () =>{
    setGrossWeighing(commerce.autoInputWeighing.Peso!)
  }

  const tareResult = () =>{
    // setTare(commerce.autoInputWeighing.tare_weight!)
  }


  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
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
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color:'#000'}}>Referência</Form.Label>
            <Form.Control
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
          <Form.Label style={{color:'#000'}}>Cultura</Form.Label>
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
            <Form.Label style={{color: '#000'}}>Contratos</Form.Label>
            <Typeahead
              id="contract"
              onChange={(selected: any) => {
                setSelectedContract(selected[0]);
              }}
              options={financial?.contracts?.map((contract: any) => {
                return { id: contract.id, label: contract.name, ...contract }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Placa</Form.Label>
            <Form.Control
              type="text"
              value={carPlate}
              onChange={(e) => {
                setCarPlate(e.target.value)
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
          {grossWeighing ==0 ? (
            <Button
            variant="success"
            onClick={() => {
              grossResult()
            }}
          >
            Receber
          </Button>
          ): (<Form.Control
            type="number"
            disabled
            value={grossWeighing}
          />)}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Tara</Form.Label>
          {tare ==0 ? (
            <Button
            variant="success"
            onClick={() => {
              tareResult()
            }}
          >
            Receber
          </Button>
          ): (<Form.Control
            type="number"
            disabled
            value={tare}
          />)}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Peso líquido</Form.Label>
            <Form.Control
              type="number"
              disabled
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
              disabled
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
              disabled
              value={discount}
              onChange={(e) => {
                setDiscount(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Desconto total (%)</Form.Label>
            <Form.Control
              type="number"
              disabled
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
              disabled
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
            Save()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}