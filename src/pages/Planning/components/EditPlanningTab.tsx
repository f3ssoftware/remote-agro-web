import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { PlanningCost } from '../../../models/PlanningCost'
import { RootState } from '../../..'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'


export function EditPlanningTab({
  index,
  onHandleUpdate,
  onHandleRemove
}: {
  index: number
  onHandleUpdate: any
  onHandleRemove: any
}) {
  const [maintenance, setMaintenance] = useState(0)
  const [diesel, setDiesel] = useState(0)
  const [gas, setGas] = useState(0)
  const [arla, setArla] = useState(0)
  const [administrative, setAdministrative] = useState(0)
  const [conservation, setConservation] = useState(0)
  const [labor, setLabor] = useState(0)
  const [storage, setStorage] = useState(0)
  const [restaurant, setRestaurant] = useState(0)
  const [diverse, setDiverse] = useState(0)
  const [rent, setRent] = useState(0)
  const [outsourced, setOutsourced] = useState(0)
  const [others, setOthers] = useState(0)
  const { planning } = useSelector((state: RootState) => state)
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedYear, setSelectedYear] = useState('')
  const [id,setId] = useState(0)
  const [key, setKey] = useState('')

  const currentYear = new Date().getFullYear()
  const futureYearsCount = 20 // You can adjust this to your desired range.

  const years = Array.from({ length: futureYearsCount }, (_, index) => {
    const year = currentYear + index
    return { label: year.toString(), value: year.toString() }
  })


  useEffect(() => {
    const p: PlanningCost = {
      administrative_amount: administrative,
      arla_amount: arla,
      canteen_amount: restaurant,
      conservation_amount: conservation,
      diesel_amount: diesel,
      diverse_amount: diverse,
      gasoline_amount: gas,
      labor_amount: labor,
      maintenance_amount: maintenance,
      month: selectedMonth,
      others_amount: others,
      outsource_amount: outsourced,
      rent_amount: rent,
      storage_amount: storage,
      year: selectedYear,
      id,
      key
    }
    onHandleUpdate(p, index)
  }, [
    administrative,
    arla,
    restaurant,
    conservation,
    diesel,
    gas,
    labor,
    maintenance,
    others,
    outsourced,
    rent,
    storage,
  ])

  useEffect(() => {
    planning.editPlannings?.plannings_indirect_costs?.map(
      (cost: any, index) => {
        setAdministrative(cost.administrative_amount!)
        setMaintenance(cost.maintenance_amount!)
        setDiesel(cost.diesel_amount!)
        setGas(cost.gasoline_amount!)
        setArla(cost.arla_amount!)
        setConservation(cost.conservation_amount!)
        setLabor(cost.labor_amount!)
        setStorage(cost.storage_amount!)
        setRestaurant(cost.canteen_amount!)
        setOthers(cost.others_amount!)
        setDiverse(cost.diesel_amount!)
        setRent(cost.rent_amount!)
        setOutsourced(cost.outsource_amount!)
        setSelectedMonth(cost.month!)
        setSelectedYear(cost.year!)
        setId(cost.id)
      },
    )
  }, [planning])

  useEffect(() => {
   console.log(selectedMonth)
  }, [selectedMonth])

  return (
    <div>
     <Row style={{ marginTop: '2%' }}>
        <Col md={3}>
          <Dropdown
            value={selectedYear}
            options={years}
            onChange={(e) => setSelectedYear(e.value)}
            placeholder="Selecione um ano"
          />
        </Col>
        <Col md={3}>
          <Dropdown
            value={selectedMonth}
            options={[
              { label: 'Janeiro', value: 1 },
              { label: 'Fevereiro', value: 2 },
              { label: 'Março', value: 3 },
              { label: 'Abril', value: 4 },
              { label: 'Maio', value: 5 },
              { label: 'Junho', value: 6 },
              { label: 'Julho', value: 7 },
              { label: 'Agosto', value: 8 },
              { label: 'Setembro', value: 9 },
              { label: 'Outubro', value: 10 },
              { label: 'Novembro', value: 11 },
              { label: 'Dezembro', value: 12 },
            ]}
            onChange={(e) => setSelectedMonth(e.value)}
            placeholder="Selecione um mês"
            />
        </Col>
            {index !== 0 ? (
              <Col md={3}>
                <Button
                  variant="danger"
                  onClick={() => {
                    onHandleRemove(index)
                  }}
                  
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Button>
              </Col>
            ) : (
              <></>
            )}
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              inputId="maintenance"
              value={maintenance}
              onValueChange={(e) => setMaintenance(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="maintenance" style={{ color: '#fff' }}>
              Manutenção
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              inputId="diesel"
              value={diesel}
              onValueChange={(e) => setDiesel(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="diesel" style={{ color: '#fff' }}>
              Diesel
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="gasolina"
              value={gas}
              onValueChange={(e) => setGas(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="gasolina" style={{ color: '#fff' }}>
              Gasolina
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="arla"
              value={arla}
              onValueChange={(e) => setArla(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="arla" style={{ color: '#fff' }}>
              Arla
            </label>
          </span>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="administrative"
              value={administrative}
              onValueChange={(e) => setAdministrative(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="administrative" style={{ color: '#fff' }}>
              Administrativo
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="conservation"
              value={conservation}
              onValueChange={(e) => setConservation(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="conservation" style={{ color: '#fff' }}>
              Conservação
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="labor"
              value={labor}
              onValueChange={(e) => setLabor(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="labor" style={{ color: '#fff' }}>
              Mão-de-obra
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="storage"
              value={storage}
              onValueChange={(e) => setStorage(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="storage" style={{ color: '#fff' }}>
              Armazenagem
            </label>
          </span>
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="restaurant"
              value={restaurant}
              onValueChange={(e) => setRestaurant(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="restaurant" style={{ color: '#fff' }}>
              Cantina
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="diverse"
              value={diverse}
              onValueChange={(e) => setDiverse(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="diverse" style={{ color: '#fff' }}>
              Diversos
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="rent"
              value={rent}
              onValueChange={(e) => setRent(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="rent" style={{ color: '#fff' }}>
              Arrendo
            </label>
          </span>
        </Col>
        <Col md={3}>
          <span className="p-float-label">
            <InputNumber
              id="outsourced"
              value={outsourced}
              onValueChange={(e) => setOutsourced(Number(e.value))}
              mode="currency"
              currency="BRL"
              locale="pt-BR"
              style={{ width: '100%' }}
            />
            <label htmlFor="outsourced" style={{ color: '#fff' }}>
              Terceirizados
            </label>
          </span>
        </Col>
        <Row style={{ marginTop: '2%' }}>
          <Col md={3}>
            <span className="p-float-label">
              <InputNumber
                id="others"
                value={others}
                onValueChange={(e) => setOthers(Number(e.value))}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                style={{ width: '100%' }}
              />
              <label htmlFor="others" style={{ color: '#fff' }}>
                Outros
              </label>
            </span>
          </Col>
        </Row>
      </Row>
    </div>
  )
}
