import { useEffect, useState } from 'react'
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
import { asyncEditPlot, asyncFetchEditPlots } from '../../../stores/farm.store'
import { RegisterPlotDTO } from '../../../models/dtos/RegisterPlotDTO'

const initialCultivars: Cultivar[] = []
const initialSendCultivars: SendCultivarsDTO[] = []
export function EditPlot({ id }: { id: number }) {
  const { financial, farm, seasons } = useSelector((state: RootState) => state)
  const [propName, setPropName] = useState('')
  const [totalArea, setTotalArea] = useState(0)
  const [productivity, setProductivity] = useState(0)
  const [value, setValue] = useState(0)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [cultivars, setCultivars]: any[] = useState(initialCultivars)
  const [sendCultivars, setSendCultivars] = useState(initialSendCultivars)
  const [weigh, setWeigh] = useState(0)
  const [plantingType, setPlantingType] = useState('')
  const [plantingDate, setPlantingDate] = useState(new Date())
  const dispatch = useDispatch<any>()
  const [active, setActive] = useState(false)

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

  const fillFormEdit = () => {
    const c: any = financial.cultivations.filter(
      (cultivation: any) => cultivation.id === farm.editPlot.cultivation_id,
    )[0]
    if(c) {
      setSelectedCultivation(c)
    setPropName(farm?.editPlot.name!)
    setTotalArea(Number(farm?.editPlot.total_area!))
    setProductivity(Number(farm?.editPlot.productivity!))
    setValue(Number(farm?.editPlot.expected_unit_price!))
    setWeigh(farm?.editPlot.expenses_weight!)
    setPlantingType(farm?.editPlot.planting_type!)
    setActive(farm?.editPlot.is_active!)
    setPlantingDate(new Date(farm?.editPlot?.planting_date!))
    }
    
  }

  useEffect(() => {
    fillFormEdit()
  }, [farm])

  useEffect(() => {
    dispatch(asyncFetchCultivations())
    dispatch(asyncFetchEditPlots(id!))
  }, [])
  return (
    <div>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome para o talhão
            </Form.Label>
            <Form.Control
              type="text"
              value={propName}
              onChange={(e) => {
                setPropName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Área total (ha)</Form.Label>
            <Form.Control
              type="number"
              value={totalArea}
              onChange={(e) => {
                setTotalArea(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Produtividade esperada (saca/ha)
            </Form.Label>
            <Form.Control
              type="number"
              value={productivity}
              onChange={(e) => {
                setProductivity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Preço de venda esperada da saca (R$/saca)
            </Form.Label>
            <Form.Control
              type="text"
              value={value}
              onBlur={(e) => {
                if (isNaN(Number(e.currentTarget.value))) {
                  e.currentTarget.value = ''
                } else {
                  setValue(Number(e.currentTarget.value))
                  e.currentTarget.value = Number(
                    e.currentTarget.value,
                  ).toLocaleString('pt-BR', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                    useGrouping: true,
                  })
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Backspace') {
                  e.currentTarget.value = ''
                }
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
            <Typeahead
              id="cultivation"
              selected={financial?.cultivations.filter((cultivation: any) => cultivation?.id === selectedCultivation?.id)}
              labelKey={(selected: any) => {
                return `${selected?.name}`
              }}
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0])
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
            {selectedCultivation?.cultivares?.map(
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
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Peso do Talhão</Form.Label>
            <Form.Control
              type="number"
              value={weigh}
              onChange={(e) => {
                setWeigh(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Tipo de plantio</Form.Label>
            <Form.Control
              type="text"
              value={plantingType}
              onChange={(e) => {
                setPlantingType(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Data de Plantio</Form.Label>
            <DatePicker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={plantingDate}
              onChange={(date: Date) => setPlantingDate(date)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Talhão ativo?</Form.Label>
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
        <Button
          variant="success"
          onClick={() => {
            const editRequestBody: RegisterPlotDTO = {
              farm_id: farm.selectedFarm.id,
              planting_type: plantingType,
              planting_date: plantingDate.toISOString(),
              total_area: totalArea,
              cultivares: sendCultivars,
              productivity,
              season_id: seasons.selectedSeason.id,
              is_active: active,
              name: propName,
              expected_unit_price: value,
              cultivation_id: selectedCultivation.id,
              expenses_weight: weigh,
              cultivation_name: selectedCultivation.name,
            }
            dispatch(asyncEditPlot(id, editRequestBody))
          }}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}
