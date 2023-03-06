import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData, asyncOutputWeighing } from '../../../../stores/commerce.store'
import { asyncFetchContractsData, asyncFetchCultivations } from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { calculateHumidityDiscount } from './weighingsHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ManualOutputWeighing } from '../../../../models/ManualOutputWeighing'
import { Silo } from '../../../../models/Silo'
import { Contract } from '../../../../models/Contract'
import { OutputWeighingRow } from '../../../../models/OutputWeighingRow'


export function NewManualOutputWeighing({ onHandleRemove, onHandleUpdate, index, manualOutputWeigh }: { onHandleRemove: any, onHandleUpdate: any, index: number, manualOutputWeigh: OutputWeighingRow }) {
  const dispatch = useDispatch<any>()
  const { financial, commerce, seasons } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [selectedContract, setSelectedContract]: any = useState({})
  const [selectedSilo, setSelectedSilo]: any = useState({})
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
  const [grossWeighing, setGrossWeighing] = useState(0)
  const [tare, setTare] = useState(0)

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchSiloData())
    dispatch(asyncFetchCultivations())
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing - tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity == 0 ? 0 : impurity - 1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(calculateHumidityDiscount(humidity, selectedCultivation.id))
  }, [humidity])

  // useEffect(() => {
  //   dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id, include: 'cultivation' }));
  // }, [seasons])

  useEffect(() => {
    if (manualOutputWeigh?.id) {
      setSelectedCultivation(financial?.cultivations?.filter((cultivation: Cultivation) => cultivation?.id === manualOutputWeigh?.cultivation_id))
      const silum = commerce?.silo.filter((silo: Silo) => silo.id === manualOutputWeigh.silo_id)[0];
      setSelectedContract(financial?.contracts.filter((contract: Contract) => contract?.id === manualOutputWeigh?.contract_id))
      setSelectedSilo(silum);
      setCarPlate(manualOutputWeigh?.car_plate!);
      setDriver(manualOutputWeigh?.car_driver!);
      setCompany(manualOutputWeigh?.shipping_company!);
      setGrossWeighing(manualOutputWeigh?.gross_weight!);
      setNetWeighing(manualOutputWeigh?.net_weight!);
      setHumidity(manualOutputWeigh?.humidity! / 100);
      setImpurity(manualOutputWeigh?.impurity! / 100);
      setDiscount(manualOutputWeigh?.discount! / 100);
      setTotalWeighning(manualOutputWeigh?.final_weight!);
      setHumidityDiscount(Number(manualOutputWeigh?.humidity_discount!));
      setTare(manualOutputWeigh?.tare_weight!);
      setObservation(manualOutputWeigh?.observations!);
    }
  }, [manualOutputWeigh]);

  useEffect(() => {
    setTotalDiscount(discount + humidityDiscount)
  }, [discount, humidityDiscount])

  useEffect(() => {
    setTotalWeighning(netWeighing * ((100 - totalDiscount) / 100))
  }, [netWeighing, totalDiscount])

  const Save = () => {
    const manualOutput = {
      weighings: {
        contract_id: selectedContract.id,
        cultivation_id: selectedCultivation.id,
        silo_id: selectedSilo.id,
        gross_weight: grossWeighing,
        net_weight: netWeighing,
        humidity: humidity * 100,
        impurity: impurity * 100,
        discount: discount * 100,
        final_weight: totalWeighning * 1000,
        type: "Saída",
        shipping_company: company,
        humidity_discount: humidityDiscount.toString(),
        total_discount: totalDiscount.toString(),
        observations: observation,
        tare_weight: tare,
        mode: "Manual",
        car_plate: carPlate,
        car_driver: driver
      }
    }
    dispatch(asyncOutputWeighing(manualOutput))
  }


  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
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
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Cultura</Form.Label>
            <Typeahead
              id="cultivation"
              selected={financial?.cultivations.filter((cultivation: Cultivation) => cultivation?.id === selectedCultivation?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedCultivation?.id}
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0]);
              }}
              options={financial?.cultivations.map((cultivation: Cultivation) => {
                return { id: cultivation.id, label: cultivation.name, ...cultivation }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Contratos</Form.Label>
            <Typeahead
              id="contract"
              selected={financial?.contracts.filter((contract: any) => contract?.id === selectedContract?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedContract?.id}
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
            <Form.Label style={{ color: '#000' }}>Silo</Form.Label>
            <Typeahead
              id="silo"
              selected={commerce?.silo.filter((silo: Silo) => silo?.id === selectedSilo?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedSilo?.id}
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
            <Form.Label style={{ color: '##000' }}>Desconto (%)</Form.Label>
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
