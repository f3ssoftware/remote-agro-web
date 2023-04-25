import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { asyncFetchFarms, selectAFarm, setFarms } from '../../../../stores/farm.store'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData, asyncInputWeighing, asyncUpdateInputWeighing, removeInputWeighRow } from '../../../../stores/commerce.store'
import { calculateHumidityDiscount } from './weighingsHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { InputWeighingRow } from '../../../../models/InputWeighingRow'
import { DeleteConfirmationModal } from '../CommerceWeighingModal/DeleteConfirmationModal'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { Cultivar } from '../../../../models/Cultivar'
import { Silo } from '../../../../models/Silo'
import { GeneratePdf } from './GeneratePdf/GeneratePdf';

export function NewManualInputWeighing({ index, manualInputWeigh }: { index: number, manualInputWeigh: InputWeighingRow }) {
  const dispatch = useDispatch<any>()
  const { farm, commerce, seasons } = useSelector((state: RootState) => state)
  const [selectedFarm, setSelectedFarm]: any = useState<any>({})
  const [selectedPlot, setSelectedPlot]: any = useState<any>({})
  const [selectedSilo, setSelectedSilo]: any = useState<any>({})
  const [selectedCultivar, setSelectedCultivar]: any = useState({})
  const [carPlate, setCarPlate] = useState('')
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
  const [id, setId] = useState<number>();
  const [showAutoInputDeleteModal, setShowAutoInputDeleteModal] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing - tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity == 0 ? 0 : impurity - 1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(calculateHumidityDiscount(humidity, selectedCultivar?.cultivation_id))
  }, [humidity])

  useEffect(() => {
    dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id, include: 'cultivares' }));
  }, [seasons])

  useEffect(() => {
    setTotalDiscount(discount + humidityDiscount)
  }, [discount, humidityDiscount])

  useEffect(() => {
    setTotalWeighning(netWeighing * ((100 - totalDiscount) / 100))
  }, [netWeighing, totalDiscount])

  // useEffect(() => {
  //   if (manualInputWeigh?.id) {
  //     fillFormEdit();
  //   }
  // }, [manualInputWeigh]);

  const fetchData = async () => {
    await dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id }))
    await dispatch(asyncFetchSiloData());
    if (!manualInputWeigh.id) {
      setSelectedFarm(farm?.farms[0])
      dispatch(selectAFarm(farm?.farms[0]));
    }
  }

  const fillFormEdit = () => {
    const f: any = farm?.farms?.filter((farm: any) => farm?.id === manualInputWeigh?.farm_id)[0];
    setSelectedFarm(f);
    const p: any = f?.fields?.filter((plot: any) => plot?.id === manualInputWeigh?.field_id)[0]
    setSelectedPlot(p);
    const c: any = p?.cultivares?.filter((cultivar: Cultivar) => cultivar?.id === manualInputWeigh?.cultivar_id)[0]
    const silum = commerce?.silo?.filter((silo: Silo) => silo?.id === manualInputWeigh?.silo_id)[0];
    if (silum) {
      setSelectedSilo(silum);
    }
    setSelectedCultivar(c);
    setCarPlate(manualInputWeigh?.car_plate!);
    setDriver(manualInputWeigh?.car_driver!);
    setCompany(manualInputWeigh?.shipping_company!);
    setGrossWeighing(manualInputWeigh?.gross_weight!);
    setNetWeighing(manualInputWeigh?.net_weight!);
    setHumidity(manualInputWeigh?.humidity! / 100);
    setImpurity(manualInputWeigh?.impurity! / 100);
    setDiscount(manualInputWeigh?.discount! / 100);
    setTotalWeighning(manualInputWeigh?.final_weight! / 1000);
    setHumidityDiscount(Number(manualInputWeigh?.humidity_discount!));
    setTare(manualInputWeigh?.tare_weight!);
    setObservation(manualInputWeigh?.observations!);
  }

  useEffect(() => {
    fillFormEdit();
  }, [farm]);

  // useEffect(() => {
  //   const silum = commerce?.silo?.filter((silo: Silo) => silo?.id === manualInputWeigh?.silo_id)[0];
  //   if (silum) {
  //     setSilo(silum);
  //   }
  // }, [commerce]);
  const Save = () => {
    const manualInput = {
      weighings: {
        farm_id: selectedFarm.id,
        field_id: selectedPlot.id,
        cultivar_id: selectedCultivar.id,
        silo_id: selectedSilo.id,
        gross_weight: grossWeighing,
        net_weight: netWeighing,
        humidity: humidity * 100,
        impurity: impurity * 100,
        discount: discount * 100,
        final_weight: totalWeighning * 1000,
        type: "Entrada",
        shipping_company: company,
        humidity_discount: humidityDiscount.toString(),
        total_discount: totalDiscount.toString(),
        observations: observation,
        tare_weight: tare,
        mode: "Manual",
        car_plate: carPlate,
        car_driver: driver,
        weighing_date: new Date().toISOString()
      }
    }
    if (!manualInputWeigh.id) {
      dispatch(asyncInputWeighing(manualInput));
    } else {
      dispatch(asyncUpdateInputWeighing(manualInputWeigh?.id!, manualInput, index, WeighingRowType.MANUAL));
    }

  }


  return (
    <div style={{ backgroundColor: (index % 2) > 0 ? '#f6eec1' : '#ebde90', paddingTop: '1%', paddingBottom: '1%' }}>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Fazenda</Form.Label>
            <Typeahead
              id="farm"
              selected={farm?.farms.filter((farm: any) => farm?.id === selectedFarm?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              isInvalid={!selectedFarm?.id}
              onChange={(selected: any) => {
                setSelectedFarm(selected[0])
              }}
              options={farm?.farms?.map((farm: any) => {
                return { ...farm, label: farm.label }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Talhões</Form.Label>
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
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Cultivar</Form.Label>
            {selectedPlot?.cultivares?.length > 0 ? <Typeahead
              id="cultivar"
              selected={selectedPlot?.cultivares?.filter((c: any) => c?.id === selectedCultivar?.id)}
              labelKey={(selected: any) => selected?.name}
              isInvalid={!selectedCultivar?.id}
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
              selected={commerce?.silo?.filter((s: any) => s?.id === selectedSilo?.id)}
              labelKey={(selected: any) => selected?.name}
              isInvalid={!selectedSilo?.id}
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
              step={0.1}
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
            <Form.Label style={{ color: '#000' }}>
              Desconto total (%)
            </Form.Label>
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
          variant="danger"
          onClick={() => {
            setId(manualInputWeigh?.id!);
            setShowAutoInputDeleteModal(true);
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
          {manualInputWeigh?.id ? 'Atualizar' : 'Salvar'}
        </Button>
        {manualInputWeigh?.id ? <GeneratePdf weighing={manualInputWeigh} cultivationsList={selectedPlot?.cultivares} silosList={commerce?.silo} farmsList={farm.farms} profile={sessionStorage.getItem('user')}></GeneratePdf> : <></>}

        <DeleteConfirmationModal show={showAutoInputDeleteModal} handleClose={() => setShowAutoInputDeleteModal(false)} id={id!} index={index} weighingType={manualInputWeigh.type!} ></DeleteConfirmationModal>
      </div>
    </div>
  )
}
