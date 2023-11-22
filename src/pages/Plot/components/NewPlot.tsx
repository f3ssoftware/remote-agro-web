import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Cultivar } from '../../../models/Cultivar'
import { Cultivation } from '../../../models/Cultivation'
import { SendCultivarsDTO } from '../../../models/dtos/SendCultivars.dto'
import { asyncFetchCultivations } from '../../../stores/financial.store'
import { CultivarItem } from './CultivarItem'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { asyncRegisterField } from '../../../stores/farm.store'
import { RegisterPlotDTO } from '../../../models/dtos/RegisterPlotDTO'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

const initialCultivars: Cultivar[] = []
const initialSendCultivars: SendCultivarsDTO[] = []
export function NewPlot() {
  const { financial, farm, seasons } = useSelector((state: RootState) => state)
  const [propName, setPropName] = useState('')
  const [totalArea, setTotalArea] = useState(0)
  const [productivity, setProductivity] = useState(0)
  const [value, setValue] = useState(0)
  const [cultivation, setCultivation]: any = useState({})
  const [cultivars, setCultivars]: any[] = useState(initialCultivars)
  const [sendCultivars, setSendCultivars] = useState(initialSendCultivars)
  const [weigh, setWeigh] = useState(0)
  const [plantingType, setPlantingType] = useState('')
  const [plantingDate, setPlantingDate] = useState(new Date())
  const dispatch = useDispatch<any>()
  const [active, setActive] = useState(false)
  const toast = useRef<Toast>(null)

  const onRemove = (id: number) => {
    const newSendCultivar = [...sendCultivars]
    const index = newSendCultivar.findIndex((cultivar) => {
      return (cultivar.id = id)
    })
    newSendCultivar.splice(index, 1)
    setSendCultivars(newSendCultivar)
  }

  const onUpdate = (cultivarId: number, cultivarArea: number) => {
    const newSendCultivar = [...sendCultivars]
    const index = newSendCultivar.findIndex((c) => {
      return c.id === cultivarId
    })

    if (index !== -1) {
      newSendCultivar[index].area = cultivarArea
    } else {
      newSendCultivar.push({
        id: cultivarId,
        area: cultivarArea,
      })
    }

    setSendCultivars(newSendCultivar)
  }

  const register = () => {
    const requestBody: RegisterPlotDTO = {
      farm_id: farm.selectedFarm.id,
      planting_type: plantingType,
      planting_date: plantingDate.toISOString(),
      total_area: weigh,
      cultivares: sendCultivars,
      productivity,
      season_id: seasons.selectedSeason.id,
      is_active: active,
      name: propName,
      expected_unit_price: value,
      cultivation_id: cultivation.id,
      expenses_weight: weigh,
      cultivation_name: cultivation.name,
    }
    dispatch(asyncRegisterField(requestBody))
  }

  useEffect(() => {
    dispatch(asyncFetchCultivations())
  }, [])
  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          propName: '',
          totalArea: null,
          productivity: null,
          value: null,
          cultivation: '',
          weigh: null,
          plantingDate: [],
        }}
        validationSchema={Yup.object({
          propName: Yup.string().required('Necessário preencher'),
          totalArea: Yup.string().required('Necessário preencher'),
          productivity: Yup.string().required('Necessário preencher'),
          value: Yup.string().required('Necessário preencher'),
          cultivation: Yup.string().required('Necessário preencher'),
          weigh: Yup.string().required('Necessário preencher'),
          plantingDate: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          register()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '4%' }}>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="propName"
                    name="propName"
                    value={formik.values.propName}
                    onChange={(e) => {
                      formik.setFieldValue('propName', e.target.value)
                      setPropName(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.propName && formik.errors.propName,
                    })}
                  />
                  {formik.touched.propName && formik.errors.propName ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.propName}
                    </div>
                  ) : null}
                  <label htmlFor="propName">Nome da propriedade</label>
                </span>
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="weigh"
                    value={formik.values.weigh}
                    onValueChange={(e) => {
                      formik.setFieldValue('weigh', e.target.value)
                      setTotalArea(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.weigh && formik.errors.weigh,
                    })}
                  />
                  {formik.touched.weigh && formik.errors.weigh ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.weigh}
                    </div>
                  ) : null}
                  <label htmlFor="weigh">Area total (ha)</label>
                </span>
              </Col>
            </Row>
            <Row style={{ marginTop: '4%' }}>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="productivity"
                    value={formik.values.productivity}
                    onValueChange={(e) => {
                      formik.setFieldValue('productivity', e.target.value)
                      setProductivity(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.productivity &&
                        formik.errors.productivity,
                    })}
                  />
                  {formik.touched.productivity && formik.errors.productivity ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.productivity}
                    </div>
                  ) : null}
                  <label htmlFor="productivity">Produtividade (saca/ha)</label>
                </span>
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    inputId="currency-br"
                    value={formik.values.value}
                    onValueChange={(e) => {
                      formik.setFieldValue('amount', e.target.value)
                      setValue(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.value && formik.errors.value,
                    })}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.value}
                    </div>
                  ) : null}
                  <label htmlFor="totalValue">Preço esperado (R$/saca)</label>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: 'gray' }}>Cultivo</Form.Label>
                  <Typeahead
                    id="cultivation"
                    onChange={(selected: any) => {
                      setCultivation(selected[0])
                    }}
                    options={financial.cultivations.map(
                      (cultivation: Cultivation) => {
                        return {
                          id: cultivation.id,
                          label: cultivation.name,
                          ...cultivation,
                        }
                      },
                    )}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Cultivares</Form.Label>
                  {cultivation?.cultivares?.map(
                    (cultivar: Cultivar, index: number) => {
                      return (
                        <CultivarItem
                          cultivar={cultivar}
                          index={index}
                          maxArea={totalArea}
                          key={cultivar.id}
                          onHandleUpdate={onUpdate}
                          onHandleRemove={onRemove}
                        ></CultivarItem>
                      )
                    },
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="weigh"
                    value={formik.values.weigh}
                    onValueChange={(e) => {
                      formik.setFieldValue('weigh', e.target.value)
                      setTotalArea(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.weigh && formik.errors.weigh,
                    })}
                  />
                  {formik.touched.weigh && formik.errors.weigh ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.weigh}
                    </div>
                  ) : null}
                  <label htmlFor="weigh">Peso do talhão</label>
                </span>
              </Col>
              <Col>
                <span className="p-float-label">
                  <Calendar
                    onChange={(e: any) => {
                      formik.setFieldValue('plantingDate', e.target.value)
                      setPlantingDate(e.value!)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.plantingDate &&
                        formik.errors.plantingDate,
                    })}
                    locale="en"
                    dateFormat="dd/mm/yy"
                  />
                  {formik.touched.plantingDate && formik.errors.plantingDate ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.plantingDate}
                    </div>
                  ) : null}
                  <label htmlFor="date">Data de plantio</label>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Talhão ativo?
                  </Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setActive(Boolean(e.target.value))
                    }}
                  >
                    <option data-value={true}>Ativo</option>
                    <option data-value={false}>Inativo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="flex-right">
              <Button variant="success" type="submit">
                Registrar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
