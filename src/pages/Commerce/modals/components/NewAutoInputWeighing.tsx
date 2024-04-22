import { ReactNode, useEffect, useRef, useState } from 'react'
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
import { GeneratePdf } from './GeneratePdf/GeneratePdf'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'

export function NewAutoInputWeighing({
  index,
  autoInputWeighing,
}: {
  index: number
  autoInputWeighing: InputWeighingRow
}) {
  const dispatch = useDispatch<any>()
  const { farm, commerce, seasons, financial } = useSelector(
    (state: RootState) => state,
  )
  const [selectedFarm, setSelectedFarm]: any = useState(null)
  const [selectedPlot, setSelectedPlot]: any = useState(null)
  const [selectedSilo, setSelectedSilo]: any = useState(null)
  const [selectedCultivar, setSelectedCultivar]: any = useState(null)
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
  const [showAutoInputDeleteModal, setShowAutoInputDeleteModal] =
    useState(false)
  const [grossWeightDate, setGrossWeightDate] = useState('')
  const [tareWeightDate, setTareWeightDate] = useState('')
  const [farmList, setFarmList] = useState<any[]>([])
  const [plotList, setPlotList] = useState<any[]>([])
  const [cultivarList, setCultivarList] = useState<any[]>([])
  const [siloList, setSiloList] = useState<any[]>([])
  const toast = useRef<Toast>(null)

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
    setDiscount(impurity < 1 ? 0 : impurity - 1)
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
    fillFormEdit()
  }, [farm])

  useEffect(() => {
    const silum = commerce?.silo?.filter(
      (silo: Silo) => silo?.id === autoInputWeighing?.silo_id,
    )[0]
    if (silum) {
      setSelectedSilo(silum)
    }
  }, [commerce])

  const fetchFarm = () => {
    return farm?.farms?.map((farm: any) => {
      return { id: farm.id, label: farm.name, ...farm }
    })
  }

  const fetchPlot = () => {
    return selectedFarm?.fields?.map((field: any) => {
      return { id: field.id, label: field.name, ...field }
    })
  }

  const fetchCultivar = () => {
    return selectedPlot?.cultivares?.map((cultivar: any) => {
      return { id: cultivar.id, label: cultivar.name, ...cultivar }
    })
  }

  const fetchSilo = () => {
    return commerce?.silo?.map((silo: any) => {
      return { id: silo.id, label: silo.name, ...silo }
    })
  }

  const autoCompleteSilo = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = siloList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setSiloList(resultSet)
    } else {
      setSiloList(fetchSilo())
    }
  }

  const autoCompletePlots = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = fetchPlot().filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    setPlotList(resultSet)
  }

  const autoCompleteFarms = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = farmList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setFarmList(resultSet)
    } else {
      setFarmList(fetchFarm())
    }
  }

  const autoCompleteCultivar = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = fetchCultivar().filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    setCultivarList(resultSet)
  }


  const fillFormEdit = () => {
    const f: any = farm?.farms.filter(
      (farm: any) => farm.id === autoInputWeighing?.farm_id,
    )[0]
    setSelectedFarm(f)
    const p: any = f?.fields?.filter(
      (plot: any) => plot.id === autoInputWeighing?.field_id,
    )[0]
    setSelectedPlot(p)
    const c: any = p?.cultivares?.filter(
      (cultivar: Cultivar) => cultivar?.id === autoInputWeighing?.cultivar_id,
    )[0]
    setSelectedCultivar(c)
    setCarPlate(autoInputWeighing?.car_plate!)
    setDriver(autoInputWeighing?.car_driver!)
    setCompany(autoInputWeighing?.shipping_company!)
    setGrossWeighing(autoInputWeighing?.gross_weight!)
    setNetWeighing(autoInputWeighing?.net_weight!)
    setHumidity(autoInputWeighing?.humidity! / 100)
    setImpurity(autoInputWeighing?.impurity! / 100)
    setDiscount(autoInputWeighing?.discount! / 100)
    setTotalWeighning(autoInputWeighing?.final_weight! / 1000)
    setHumidityDiscount(Number(autoInputWeighing?.humidity_discount!))
    setTare(autoInputWeighing?.tare_weight!)
    setObservation(autoInputWeighing?.observations!)
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
        weighing_date: new Date().toISOString(),
      },
    }
    if (!autoInputWeighing?.id) {
      dispatch(asyncInputWeighing(autoInput))
    } else {
      dispatch(
        asyncUpdateInputWeighing(
          autoInputWeighing?.id!,
          autoInput,
          index,
          WeighingRowType.AUTOMATIC,
        ),
      )
    }
  }

  return (
    <div
      style={{
        backgroundColor: index % 2 > 0 ? '#cecece' : '#a5a5a5',
        paddingTop: '1%',
        paddingBottom: '1%',
      }}
    >
      <Toast ref={toast} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          cultivar: selectedCultivar ? selectedCultivar.name : '',
          farm: selectedFarm ? selectedFarm.name : '',
          plot: selectedPlot ? selectedPlot.name : '',
          silo: selectedSilo ? selectedSilo?.name : ''
        }}
        validationSchema={Yup.object({
          cultivar: Yup.string().required('Necessário preencher'),
          farm: Yup.string().required('Necessário preencher'),
          plot: Yup.string().required('Necessário preencher'),
          silo: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          Save()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            
            <Row style={{ marginTop: '2%' }}>
              <Col md={2}>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.farm}
                    suggestions={farmList}
                    completeMethod={autoCompleteFarms}
                    onChange={(e: any) => {
                      setSelectedFarm(e.value)
                      formik.setFieldValue('farm', e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.farm && formik.errors.farm,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.farm && formik.errors.farm ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.farm as ReactNode}
                    </div>
                  ) : null}
                  <label htmlFor="farm">Fazenda</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
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
                </Form.Group> */}
              </Col>
              <Col md={2}>
                {selectedFarm?.fields?.length > 0 ? (
                  <span className="p-float-label">
                    <AutoComplete
                      field="label"
                      value={formik.values.plot}
                      suggestions={plotList}
                      completeMethod={autoCompletePlots}
                      onChange={(e: any) => {
                        setSelectedPlot(e.value)
                        formik.setFieldValue('plot', e.target.value)
                      }}
                      dropdown
                      forceSelection
                      style={{ width: '100%' }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.plot && formik.errors.plot,
                      })}
                    />
                    {formik.touched.plot && formik.errors.plot ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.plot as ReactNode}
                    </div>
                  ) : null}
                    <label htmlFor="plot">Talhões</label>
                  </span>
                ) : (
                  <></>
                )}
                {/* <Form.Group className="mb-3" controlId="">
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
                </Form.Group> */}
              </Col>
              <Col md={2}>
                {selectedPlot?.cultivares?.length > 0 ? (
                  <span className="p-float-label">
                    <AutoComplete
                      field="label"
                      value={formik.values.cultivar}
                      suggestions={cultivarList}
                      completeMethod={autoCompleteCultivar}
                      onChange={(e: any) => {
                        setSelectedCultivar(e.value)
                        formik.setFieldValue('cultivar', e.target.value)
                      }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.cultivar && formik.errors.cultivar,
                      })}
                      dropdown
                      forceSelection
                      style={{ width: '100%' }}
                    />
                    {formik.touched.cultivar && formik.errors.cultivar ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.cultivar as ReactNode}
                    </div>
                  ) : null}
                    <label htmlFor="cultivar">Cultivar</label>
                  </span>
                ) : (
                  <></>
                )}
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Cultivar</Form.Label>
                  {selectedPlot?.cultivares?.length > 0 ? (
                    <Typeahead
                      id="cultivar"
                      selected={selectedPlot?.cultivares?.filter(
                        (c: any) => c?.id === selectedCultivar?.id,
                      )}
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
                </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.silo}
                    suggestions={siloList}
                    completeMethod={autoCompleteSilo}
                    onChange={(e: any) => {
                      setSelectedSilo(e.value)
                      formik.setFieldValue('silo', e.target.value)
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.silo && formik.errors.silo,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.silo && formik.errors.silo ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.silo as ReactNode}
                    </div>
                  ) : null}
                  <label htmlFor="silo">Silo</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Silo</Form.Label>
                  <Typeahead
                    id="silo"
                    selected={commerce?.silo?.filter(
                      (s: any) => s?.id === selectedSilo?.id,
                    )}
                    labelKey={(selected: any) => selected?.name}
                    isInvalid={!selectedSilo?.id}
                    onChange={(selected: any) => {
                      setSelectedSilo(selected[0])
                    }}
                    options={commerce?.silo?.map((silo: any) => {
                      return { id: silo.id, label: silo.name, ...silo }
                    })}
                  />
                </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={carPlate}
                    onChange={(e) => {
                      setCarPlate(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />
      
                  <label htmlFor="carPlate">Placa</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Placa</Form.Label>
                  <Form.Control
                    type="text"
                    value={carPlate}
                    onChange={(e) => {
                      setCarPlate(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={driver}
                    onChange={(e) => {
                      setDriver(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />
      
                  <label htmlFor="driver">Motorista</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Motorista</Form.Label>
                  <Form.Control
                    type="text"
                    value={driver}
                    onChange={(e) => {
                      setDriver(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
            </Row>
            <Row style={{ marginTop: '3%' }}>
              <Col md={2}>
                <span className="p-float-label">
                  <InputText
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />
      
                  <label htmlFor="company">Transportadora</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Transportadora</Form.Label>
                  <Form.Control
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={2}>
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
              <Col md={2}>
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
              <Col sm={3}>
                <span className="p-float-label">
                  <InputNumber
                    value={netWeighing}
                    onValueChange={(e) => {
                      setNetWeighing(Number(e.value))
                    }}
                    disabled
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="netWeigh">Peso líquido</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Peso líquido</Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={netWeighing}
                    onChange={(e) => {
                      setNetWeighing(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={3}>
                <span className="p-float-label">
                  <InputNumber
                    value={humidity}
                    onValueChange={(e) => {
                      setHumidity(Number(e.value))
                    }}
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">UMID (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>UMID (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={humidity}
                    onChange={(e) => {
                      setHumidity(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
              <Col md={3}>
                <span className="p-float-label">
                  <InputNumber
                    value={humidityDiscount}
                    onValueChange={(e) => {
                      setHumidityDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto UMID (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Desconto UMID (%)</Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={humidityDiscount}
                    onChange={(e) => {
                      setHumidityDiscount(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={3}>
                <span className="p-float-label">
                  <InputNumber
                    value={impurity}
                    onValueChange={(e) => {
                      setImpurity(Number(e.value))
                    }}
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Impureza (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Impureza (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step={0.1}
                    value={impurity}
                    onChange={(e) => {
                      setImpurity(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={discount}
                    onValueChange={(e) => {
                      setDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Desconto (%)</Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={discount}
                    onChange={(e) => {
                      setDiscount(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={3}>
                <span className="p-float-label">
                  <InputNumber
                    value={totalDiscount}
                    onValueChange={(e) => {
                      setTotalDiscount(Number(e.value))
                    }}
                    disabled
                    suffix="%"
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="humidity">Desconto total (%)</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
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
                </Form.Group> */}
              </Col>
              <Col md={3} style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputNumber
                    value={totalWeighning}
                    onValueChange={(e) => {
                      setTotalWeighning(Number(e.value))
                    }}
                    disabled
                    mode="decimal"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                    minFractionDigits={0}
                    maxFractionDigits={3}
                  />
                  <label htmlFor="netWeigh">Peso Final</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Peso final</Form.Label>
                  <Form.Control
                    type="number"
                    disabled
                    value={totalWeighning}
                    onChange={(e) => {
                      setTotalWeighning(Number(e.target.value))
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col md={2} style={{ marginTop: '2%' }}>
                <span className="p-float-label">
                  <InputText
                    value={observation}
                    onChange={(e) => {
                      setObservation(e.target.value)
                    }}
                    style={{ width: '100%' }}
                  />
      
                  <label htmlFor="observation">Observações</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#000' }}>Observações</Form.Label>
                  <Form.Control
                    type="text"
                    value={observation}
                    onChange={(e) => {
                      setObservation(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
            </Row>
            {showWeighingConfirmationModal ? (
              <AutoConfirmationModal
                setValue={setGrossWeighing}
                setWeightDate={setGrossWeightDate}
                show={showWeighingConfirmationModal}
                handleClose={() => setShowWeighingConfirmationModal(false)}
              ></AutoConfirmationModal>
            ) : (
              <></>
            )}
            {showTareConfirmationModal ? (
              <AutoConfirmationModal
                setValue={setTare}
                setWeightDate={setTareWeightDate}
                show={showTareConfirmationModal}
                handleClose={() => setShowTareConfirmationModal(false)}
              ></AutoConfirmationModal>
            ) : (
              <></>
            )}
      
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
                type='submit'
                // onClick={() => {
                //   Save()
                // }}
              >
                {autoInputWeighing?.id ? 'Atualizar' : 'Salvar'}
              </Button>
              {autoInputWeighing.id ? (
                <GeneratePdf
                  weighing={autoInputWeighing}
                  cultivationsList={financial.cultivations}
                  silosList={commerce?.silo}
                  farmsList={farm.farms}
                  profile={JSON.parse(sessionStorage.getItem('user')!)}
                ></GeneratePdf>
              ) : (
                <></>
              )}
            </div>
            <DeleteConfirmationModal
              show={showAutoInputDeleteModal}
              handleClose={() => setShowAutoInputDeleteModal(false)}
              id={commerce?.inputWeighingData?.id!}
              index={index}
              weighingType={autoInputWeighing.type!}
            ></DeleteConfirmationModal>
          </form>
        )}
      </Formik>
    </div>
  )
}
