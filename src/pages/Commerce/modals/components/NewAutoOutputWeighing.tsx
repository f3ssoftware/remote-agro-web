import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData, asyncFetchWeighingData, asyncOutputWeighing, asyncUpdateOutputWeighing } from '../../../../stores/commerce.store'
import { asyncFetchContractsData, asyncFetchCultivations } from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { calculateHumidityDiscount } from './weighingsHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AutoConfirmationModal } from '../CommerceWeighingModal/AutoConfirmationModal'
import { Silo } from '../../../../models/Silo'
import { OutputWeighingRow } from '../../../../models/OutputWeighingRow';
import { Contract } from '../../../../models/Contract'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { DeleteConfirmationModal } from '../CommerceWeighingModal/DeleteConfirmationModal'



export function NewAutoOutputWeighing({ onHandleRemove, onHandleUpdate, index, autoOutputWeighing }: { onHandleRemove: any, onHandleUpdate: any, index: number, autoOutputWeighing: OutputWeighingRow }) {
  const dispatch = useDispatch<any>()
  const { financial, commerce, seasons } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [selectedContract, setSelectedContract]: any = useState({})
  const [id, setId] = useState<number>();
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
  const [showWeighingConfirmationModal, setShowWeighingConfirmationModal] = useState(false)
  const [showTareConfirmationModal, setShowTareConfirmationModal] = useState(false)
  const [grossWeightDate, setGrossWeightDate] = useState("")
  const [tareWeightDate, setTareWeightDate] = useState("")
  const [showAutoInputDeleteModal, setShowAutoInputDeleteModal] = useState(false)

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
    setTotalDiscount(discount + humidityDiscount)
  }, [discount, humidityDiscount])

  useEffect(() => {
    setTotalWeighning(netWeighing * ((100 - totalDiscount) / 100))
  }, [netWeighing, totalDiscount])

  useEffect(() => {
    fillFormEdit();
  }, [financial]);

  const Save = () => {
    const autoOutput = {
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
        car_driver: driver,
        gross_weight_date: grossWeightDate,
        tare_weight_date: tareWeightDate,
        weighing_date: new Date().toISOString()
      }
    }
    if (autoOutputWeighing.id) {
      dispatch(asyncOutputWeighing(autoOutput))
    } else {
      dispatch(asyncUpdateOutputWeighing(autoOutputWeighing?.id!, autoOutput, index, WeighingRowType.AUTOMATIC));
    }

  }

  const fillFormEdit = () => {
    if (autoOutputWeighing?.id) {
      setSelectedCultivation(financial?.cultivations?.filter((cultivation: Cultivation) => cultivation?.id === autoOutputWeighing?.cultivation_id)[0])
      const silum = commerce?.silo.filter((silo: Silo) => silo.id === autoOutputWeighing.silo_id)[0];
      setSelectedContract(financial?.contracts.filter((contract: Contract) => contract?.id === autoOutputWeighing?.contract_id)[0])
      setSelectedSilo(silum);
      setCarPlate(autoOutputWeighing?.car_plate!);
      setDriver(autoOutputWeighing?.car_driver!);
      setCompany(autoOutputWeighing?.shipping_company!);
      setGrossWeighing(autoOutputWeighing?.gross_weight!);
      setNetWeighing(autoOutputWeighing?.net_weight!);
      setHumidity(autoOutputWeighing?.humidity! / 100);
      setImpurity(autoOutputWeighing?.impurity! / 100);
      setDiscount(autoOutputWeighing?.discount! / 100);
      setTotalWeighning(autoOutputWeighing?.final_weight!);
      setHumidityDiscount(Number(autoOutputWeighing?.humidity_discount!));
      setTare(autoOutputWeighing?.tare_weight!);
      setObservation(autoOutputWeighing?.observations!);
    }
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
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
              options={financial.cultivations.map((cultivation: Cultivation) => {
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
            {grossWeighing == 0 ? (
              <Button
                variant="success"
                onClick={() => {
                  setShowWeighingConfirmationModal(true)
                }}
              >
                Receber
              </Button>
            ) : (<Form.Control
              type="number"
              disabled
              value={grossWeighing}
            />)}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Tara</Form.Label>
            {tare == 0 ? (
              <Button
                variant="success"
                onClick={() => {
                  setShowTareConfirmationModal(true)
                }}
              >
                Receber
              </Button>
            ) : (<Form.Control
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
      <AutoConfirmationModal setValue={setGrossWeighing} show={showWeighingConfirmationModal} handleClose={() => setShowWeighingConfirmationModal(false)} setWeightDate={setGrossWeightDate} ></AutoConfirmationModal>
      <AutoConfirmationModal setValue={setTare} show={showTareConfirmationModal} handleClose={() => setShowTareConfirmationModal(false)} setWeightDate={setTareWeightDate} ></AutoConfirmationModal>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        <Button
          variant="danger"
          onClick={() => {
            setId(autoOutputWeighing?.id!)
            setShowAutoInputDeleteModal(true)
          }}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>
        <Button
          variant="success"
          onClick={() => {
            Save()
          }}
        >
          {autoOutputWeighing?.id ? 'Atualizar' : 'Salvar'}
        </Button>
        <DeleteConfirmationModal show={showAutoInputDeleteModal} handleClose={() => setShowAutoInputDeleteModal(false)} id={id!} index={index} weighingType={autoOutputWeighing.type!}></DeleteConfirmationModal>
      </div>
    </div>
  )
}
