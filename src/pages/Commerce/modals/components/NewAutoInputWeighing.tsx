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
import { AutoInputDeleteConfirmation } from '../CommerceWeighingModal/AutoInputDeleteConfirmation'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { InputWeighingRow } from '../../../../models/InputWeighingRow'

export function NewAutoInputWeighing({
  onHandleRemove,
  onHandleUpdate,
  index,
  autoInputWeighing,
}: {
  onHandleRemove: any
  onHandleUpdate: any
  index: number,
  autoInputWeighing: InputWeighingRow
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
        weight_date: new Date().toISOString()
      },
    }
    if (!autoInputWeighing?.id) {
      dispatch(asyncInputWeighing(autoInput, index, WeighingRowType.AUTOMATIC));
    } else {
      dispatch(asyncUpdateInputWeighing(autoInputWeighing.id, autoInput, index, WeighingRowType.AUTOMATIC));
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
            {grossWeighing == 0 ? (
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
            {tare == 0 ? (
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
      </div>
      <AutoInputDeleteConfirmation show={showAutoInputDeleteModal} handleClose={() => setShowAutoInputDeleteModal(false)} id={commerce?.inputWeighingData?.id!} index={index} onHandleRemove={onHandleRemove}></AutoInputDeleteConfirmation>
    </div>
  )
}
