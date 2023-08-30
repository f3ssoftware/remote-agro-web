import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../..'
import { asyncFetchFarms, selectAFarm } from '../../stores/farm.store'
import { NewFarmModal } from './Modals/NewFarmModal'
import { NewPlotModal } from './Modals/NewPlotModal'
import { PrescriptionModal } from './Modals/PrescriptionModal'
import './Plot.scss'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import ptBR from 'date-fns/locale/pt-BR'
import { asyncFetchApplications } from '../../stores/plot.store'
import { FertilizerEventModal } from './Modals/FertilizerEventModal'
import moment from 'moment'
import 'moment/locale/pt-br'
import { DefensiveEventModal } from './Modals/DefensiveEventModal'
import { SeedingEventModal } from './Modals/SeedingEventModal'

const locales = {
  'pt-BR': ptBR,
}
moment.locale('pt-BR')
const localizer = momentLocalizer(moment)

export function Plot() {
  const { farm, plot, seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [showNewPlotModal, setShowNewPlotModal] = useState(false)
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showNewFarmModal, setShowNewFarmModal] = useState(false)
  const [selectedFarm, setSelectedFarm]: any = useState({})
  const [selectedPlot, setSelectedPlot]: any = useState({})
  const [plots, setPlots] = useState<any[]>([])
  const [showDefensive, setShowDefensive] = useState(false)
  const [showFertilizer, setShowFertilizer] = useState(false)
  const [showSeeding, setShowSeeding] = useState(false)
  const [application, setApplication] = useState<any>()
  const [startDate, setStartDate] = useState<Date>()
  const [untilDate, setUntilDate] = useState<Date>()

  const selectFarm = (farm: any) => {
    setSelectedFarm(farm)
    dispatch(selectAFarm(farm))
  }

  useEffect(() => {
    dispatch(asyncFetchFarms({
      season_id: seasons.selectedSeason.id
    }))
    setSelectedFarm(farm?.farms[0])
    dispatch(selectAFarm(farm?.farms[0]))
    filter();
  }, [])

  const filter = (field?: string) => {
    dispatch(
      asyncFetchApplications({
        from_date: startDate,
        until_date: untilDate,
        order_type: 1,
        season_id: seasons.selectedSeason.id,
        field_name: field,
      }),
    )
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="frist-column-plot">
            <div className="frist-card-plot">
              <div>
                <Button
                  variant="success"
                  className="frist-card-button-plot"
                  onClick={() => setShowNewFarmModal(true)}
                >
                  +
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h4
                  style={{
                    position: 'relative',
                    bottom: '40px',
                  }}
                >
                  <b>Fazenda</b>
                </h4>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '2%',
                }}
              >
                <Dropdown className="frist-card-dropdown-plot">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedFarm ? `${selectedFarm?.name}` : 'Selecione uma fazenda'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {farm?.farms?.map((farm: any, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          onClick={() => selectFarm(farm)}
                        >
                          {farm.name}
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <iframe
                src={selectedFarm?.map_link}
                width={'315vw'}
                height={'400vh'}
                style={{
                  marginBottom: '10%',
                  marginLeft: '11%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              ></iframe>
            </div>
          </div>
          <div className="second-card-plot">
            <div>
              <Button
                variant="success"
                className="second-card-button-plot"
                onClick={() => setShowNewPlotModal(true)}
              >
                +
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h4
                style={{
                  position: 'relative',
                  bottom: '40px',
                }}
              >
                <b>Talhões</b>
              </h4>
            </div>
            <div style={{ overflowY: 'scroll', height: '300px' }}>
              {selectedFarm?.fields?.filter((field: any) => 
                    {
                      return field.season.id === seasons.selectedSeason.id}).map((field: any) => (
                <div className="plot-card">
                  <Row>
                    <Col>
                      <span>{field.name}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Área Total: {field.total_area}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Cultivo: {field.cultivation_name}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>
                        Cultivar:{' '}
                        {field.cultivares.map((c: any) => `${c.name}, `)}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>
                        Data de Plantio:{' '}
                        {new Date(field.planting_date).toLocaleDateString(
                          'pt-BR',
                        )}
                      </span>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col md={8} sm={8}>
          <Card className="second-col-card-plot">
            <Card.Body>
              <Card.Title className="second-col-text-plot">
                Aplicações
                <Button
                  className="inputs-btn-plot"
                  onClick={() => setShowPrescriptionModal(true)}
                >
                  Gerar Receituário
                </Button>
              </Card.Title>
              <Card.Text>
                <Dropdown>
                  <Dropdown.Toggle
                    className="second-col-dropdown-plot"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {selectedPlot?.name || 'Todos os talhões'}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item
                      onClick={() => {
                        setSelectedPlot(null)
                        filter();
                      }}
                    >
                      Todos os talhões
                    </Dropdown.Item> */}
                    {selectedFarm?.fields?.filter((field: any) => 
                    {
                      return field.season.id === seasons.selectedSeason.id}).map((field: any) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            setSelectedPlot(field)
                            filter(field.name)
                          }}
                        >
                          {field.name}
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Text>
              <Calendar
                messages={{
                  allDay: 'Dia Inteiro',
                  previous: 'Anterior',
                  next: 'Próximo',
                  today: 'Hoje',
                  month: 'Mês',
                  week: 'Semana',
                  day: 'Dia',
                  agenda: 'Agenda',
                  date: 'Data',
                  time: 'Hora',
                  event: 'Evento',
                  showMore: (total) => `+ (${total}) Eventos`,
                }}
                onRangeChange={(r) => console.log(r)}
                selectable={true}
                onSelectEvent={(e) => {
                  switch (e.type) {
                    case 'Defensivos':
                      {
                        setApplication(e)
                        setShowDefensive(true)
                      }
                      break
                    case 'Fertilizantes':
                      {
                        setApplication(e)
                        setShowFertilizer(true)
                      }
                      break
                    case 'Semeadura':
                      {
                        setApplication(e)
                        setShowSeeding(true)
                      }
                      break
                  }
                }}
                localizer={localizer}
                events={plot?.applications?.map((application: any) => {
                  return {
                    start: new Date(application.date),
                    end: new Date(application.date),
                    title: `${application.number} - ${application.type}`,
                    id: application.id,
                    type: application.type,
                  }
                })}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </Card.Body>
            <Card.Footer className="card-footer-plot">
              <div className="frist-box-plot">
                <span>Custo/ha</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <PrescriptionModal
        show={showPrescriptionModal}
        handleClose={() => setShowPrescriptionModal(false)}
        selectedFarm={selectedFarm}
      ></PrescriptionModal>
      <NewFarmModal
        show={showNewFarmModal}
        handleClose={() => setShowNewFarmModal(false)}
      ></NewFarmModal>
      <NewPlotModal
        show={showNewPlotModal}
        handleClose={() => setShowNewPlotModal(false)}
      ></NewPlotModal>
      <DefensiveEventModal
        show={showDefensive}
        application={application}
        handleClose={() => setShowDefensive(false)}
      ></DefensiveEventModal>
      <FertilizerEventModal
        show={showFertilizer}
        application={application}
        handleClose={() => setShowFertilizer(false)}
      ></FertilizerEventModal>
      <SeedingEventModal
        show={showSeeding}
        application={application}
        handleClose={() => setShowSeeding(false)}
      ></SeedingEventModal>
    </Container>
  )
}
