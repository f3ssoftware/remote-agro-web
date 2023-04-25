import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import {
  asyncFetchFarms,
  selectAFarm,
  setFarms,
} from '../../../../stores/farm.store'
import { Typeahead } from 'react-bootstrap-typeahead'
import {
  asyncFetchSiloData,
  asyncFetchWeighingData,
  asyncInputWeighing,
  asyncUpdateInputWeighing,
} from '../../../../stores/commerce.store'
import { calculateHumidityDiscount } from './weighingsHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AutoConfirmationModal } from '../CommerceWeighingModal/AutoConfirmationModal'

import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { InputWeighingRow } from '../../../../models/InputWeighingRow'
import { Cultivar } from '../../../../models/Cultivar'
import { Silo } from '../../../../models/Silo'
import { DeleteConfirmationModal } from '../CommerceWeighingModal/DeleteConfirmationModal'
import { GeneratePdf } from './GeneratePdf/GeneratePdf';

export function NewAutoInputWeighing({
  index,
  autoInputWeighing,
}: {
  index: number,
  autoInputWeighing: InputWeighingRow,
}) {
  const dispatch = useDispatch<any>()
  const { farm, commerce, seasons } = useSelector((state: RootState) => state)
  const [selectedFarm, setSelectedFarm]: any = useState({})
  const [selectedPlot, setSelectedPlot]: any = useState({})
  const [selectedSilo, setSelectedSilo]: any = useState({})
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
  const [showWeighingConfirmationModal, setShowWeighingConfirmationModal] =
    useState(false)
  const [showTareConfirmationModal, setShowTareConfirmationModal] =
    useState(false)
  const [id, setId] = useState(0)
  const [showAutoInputDeleteModal, setShowAutoInputDeleteModal] = useState(false)
  const [grossWeightDate, setGrossWeightDate] = useState("")
  const [tareWeightDate, setTareWeightDate] = useState("")

  useEffect(() => {
    dispatch(asyncFetchFarms({ season_id: seasons.selectedSeason.id }))
    dispatch(asyncFetchSiloData())
    setSelectedFarm(farm?.farms[0])
    dispatch(selectAFarm(farm?.farms[0]))
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  useEffect(() => {
    setNetWeighing(grossWeighing - tare)
  }, [grossWeighing, tare])

  useEffect(() => {
    setDiscount(impurity == 0 ? 0 : impurity - 1)
  }, [impurity])

  useEffect(() => {
    setHumidityDiscount(
      calculateHumidityDiscount(humidity, selectedCultivar?.cultivation_id),
    )
  }, [humidity])

  useEffect(() => {
    dispatch(
      asyncFetchFarms({
        season_id: seasons.selectedSeason.id,
        include: 'cultivares',
      }),
    )
    setSelectedFarm(null)
    setSelectedPlot(null)
    setSelectedCultivar(null)
  }, [seasons])

  useEffect(() => {
    setTotalDiscount(discount + humidityDiscount)
  }, [discount, humidityDiscount])

  useEffect(() => {
    setTotalWeighning(netWeighing * ((100 - totalDiscount) / 100))
  }, [netWeighing, totalDiscount])

  useEffect(() => {
    fillFormEdit();
  }, [farm]);

  useEffect(() => {
    const silum = commerce?.silo?.filter((silo: Silo) => silo?.id === autoInputWeighing?.silo_id)[0];
    if (silum) {
      setSelectedSilo(silum);
    }
  }, [commerce]);

  const fillFormEdit = () => {
    const f: any = farm?.farms.filter((farm: any) => farm.id === autoInputWeighing?.farm_id)[0];
    setSelectedFarm(f);
    const p: any = f?.fields?.filter((plot: any) => plot.id === autoInputWeighing?.field_id)[0]
    setSelectedPlot(p);
    const c: any = p?.cultivares?.filter((cultivar: Cultivar) => cultivar?.id === autoInputWeighing?.cultivar_id)[0]
    setSelectedCultivar(c);
    setCarPlate(autoInputWeighing?.car_plate!);
    setDriver(autoInputWeighing?.car_driver!);
    setCompany(autoInputWeighing?.shipping_company!);
    setGrossWeighing(autoInputWeighing?.gross_weight!);
    setNetWeighing(autoInputWeighing?.net_weight!);
    setHumidity(autoInputWeighing?.humidity! / 100);
    setImpurity(autoInputWeighing?.impurity! / 100);
    setDiscount(autoInputWeighing?.discount! / 100);
    setTotalWeighning(autoInputWeighing?.final_weight! / 1000);
    setHumidityDiscount(Number(autoInputWeighing?.humidity_discount!));
    setTare(autoInputWeighing?.tare_weight!);
    setObservation(autoInputWeighing?.observations!);
  }


  const Save = () => {
    const autoInput = {
      weighings: {
        id,
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
        type: 'Entrada',
        shipping_company: company,
        humidity_discount: humidityDiscount.toString(),
        total_discount: totalDiscount.toString(),
        observations: observation,
        tare_weight: tare,
        mode: 'Automático',
        car_plate: carPlate,
        car_driver: driver,
        gross_weight_date: grossWeightDate,
        tare_weight_date: tareWeightDate,
        weighing_date: new Date().toISOString()
      },
    }
    if (!autoInputWeighing?.id) {
      dispatch(asyncInputWeighing(autoInput));
    } else {
      dispatch(asyncUpdateInputWeighing(autoInputWeighing?.id!, autoInput, index, WeighingRowType.AUTOMATIC));
    }

  }

  return (
    <div style={{ backgroundColor: (index % 2) > 0 ? '#f6eec1' : '#ebde90', paddingTop: '1%', paddingBottom: '1%' }}>
      <Row>
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
                return { id: farm.id, label: farm.name, ...farm }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Talhões</Form.Label>
            {selectedFarm?.fields?.length > 0 ? (
              <Typeahead
                id="field"
                selected={selectedFarm?.fields.filter((field: any) => field?.id === selectedPlot?.id)}
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
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Cultivar</Form.Label>
            {selectedPlot?.cultivares?.length > 0 ? (
              <Typeahead
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
              />
            ) : (
              <></>
            )}
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
            {grossWeighing == null ? (
              <Button
                variant="success"
                onClick={() => {
                  setShowWeighingConfirmationModal(true)
                }}
              >
                Receber
              </Button>
            ) : (
              <Form.Control type="number" disabled value={grossWeighing} />
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#000' }}>Tara</Form.Label>
            {tare == null ? (
              <Button
                variant="success"
                onClick={() => {
                  setShowTareConfirmationModal(true)
                }}
              >
                Receber
              </Button>
            ) : (
              <Form.Control type="number" disabled value={tare} />
            )}
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
      <AutoConfirmationModal
        setValue={setGrossWeighing}
        setWeightDate={setGrossWeightDate}
        show={showWeighingConfirmationModal}
        handleClose={() => setShowWeighingConfirmationModal(false)}
      ></AutoConfirmationModal>
      <AutoConfirmationModal
        setValue={setTare}
        setWeightDate={setTareWeightDate}
        show={showTareConfirmationModal}
        handleClose={() => setShowTareConfirmationModal(false)}
      ></AutoConfirmationModal>

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
            setId(autoInputWeighing?.id!)
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
          {autoInputWeighing?.id ? 'Atualizar' : 'Salvar'}
        </Button>
        {autoInputWeighing.id ? <GeneratePdf weighing={autoInputWeighing} cultivationsList={selectedPlot?.cultivares} silosList={commerce?.silo} farmsList={farm.farms} profile={sessionStorage.getItem('user')}></GeneratePdf> : <></>}

      </div>
      <DeleteConfirmationModal show={showAutoInputDeleteModal} handleClose={() => setShowAutoInputDeleteModal(false)} id={commerce?.inputWeighingData?.id!} index={index} weighingType={autoInputWeighing.type!}></DeleteConfirmationModal>
    </div>
  )
}
