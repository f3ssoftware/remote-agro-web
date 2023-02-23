import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../..'
import { asyncFetchFarms, selectAFarm } from '../../stores/farm.store'
import { NewFarmModal } from './Modals/NewFarmModal'
import { NewPlotModal } from './Modals/NewPlotModal'
import { PrescriptionModal } from './Modals/PrescriptionModal'
import './Plot.scss'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import ptBR from 'date-fns/locale/pt-BR'
import { asyncFetchApplications } from '../../stores/plot.store'
import { EventModal } from './Modals/EventModal'
import moment from "moment";
import 'moment/locale/pt-br';


const locales = {
  'pt-BR': ptBR,
}
moment.locale('pt-BR');
const localizer = momentLocalizer(moment);
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })
export function Plot() {
  const { farm, plot, seasons } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();
  const [showNewPlotModal, setShowNewPlotModal] = useState(false)
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showNewFarmModal, setShowNewFarmModal] = useState(false)
  const [selectedFarm, setSelectedFarm]: any = useState({});
  const [selectedPlot, setSelectedPlot]: any = useState({});
  const [plots, setPlots] = useState<any[]>([]);
  const [showEvent, setShowEvent] = useState(false);
  const [application, setApplication] = useState<any>();
  const [startDate, setStartDate] = useState<Date>();
  const [untilDate, setUntilDate] = useState<Date>();

  const selectFarm = (farm: any) => {
    setSelectedFarm(farm);
    dispatch(selectAFarm(farm));
  }

  useEffect(() => {
    dispatch(asyncFetchFarms());
    setSelectedFarm(farm?.farms[0]);
    dispatch(selectAFarm(farm?.farms[0]));
    dispatch(asyncFetchApplications({ from_date: startDate, until_date: untilDate, order_type: 1, season_id: seasons.selectedSeason.id }));
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="frist-column-plot">
            <div className="frist-card-plot">
              <span className="frist-card-text-plot">Fazenda</span>
              <div>
                <Button variant="success" className="frist-card-button-plot" onClick={() => setShowNewFarmModal(true)}>
                  +
                </Button>
              </div>
              <Dropdown className="frist-card-dropdown-plot">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedFarm?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {farm?.farms?.map((farm: any, index) => {
                    return <Dropdown.Item key={index} onClick={() => selectFarm(farm)}>{farm.name}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* <iframe src={selectedFarm?.map_link} width={'360px'} height={'220px'}></iframe> */}
            </div>
          </div>
          <div className="second-card-plot">
            <span className="second-card-text-plot">Talhões </span>
            <div>
              <Button variant="success" className="second-card-button-plot" onClick={() => setShowNewPlotModal(true)}>
                +
              </Button>
            </div>
            <div style={{ overflowY: 'scroll', height: '300px' }}>
              {farm?.selectedFarm?.fields?.map((field: any) => <div className='plot-card'>
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
                    <span>Cultivo: {field.planting_type}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Cultivar: {field.cultivares.map((c: any) => `${c.name}, `)}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Data de Plantio: {new Date(field.planting_date).toLocaleDateString('pt-BR')}</span>
                  </Col>
                </Row>
              </div>)}
            </div>

          </div>
        </Col>

        <Col md={8} sm={8}>
          <Card className="second-col-card-plot">
            <Card.Body>
              <Card.Title className="second-col-text-plot">
                Aplicações
                <Button className="inputs-btn-plot" onClick={() => setShowPrescriptionModal(true)}>Gerar Receituário</Button>
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
                    {selectedFarm?.fields?.map((field: any) => {
                      return <Dropdown.Item onClick={() => setSelectedPlot(field)}>{field.name}</Dropdown.Item>
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
                  showMore: (total) => `+ (${total}) Eventos`
                }}
                onRangeChange={(r) => console.log(r)}
                selectable={true}

                onSelectEvent={(e) => {
                  setApplication(e);
                  setShowEvent(true);
                }}
                localizer={localizer}
                events={plot?.applications?.map((application: any) => {
                  return { start: new Date(application.date), end: new Date(application.date), title: application.type, id: application.id }
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
      <PrescriptionModal show={showPrescriptionModal} handleClose={() => setShowPrescriptionModal(false)}></PrescriptionModal>
      <NewFarmModal show={showNewFarmModal} handleClose={() => setShowNewFarmModal(false)}></NewFarmModal>
      <NewPlotModal show={showNewPlotModal} handleClose={() => setShowNewPlotModal(false)}></NewPlotModal>
      <EventModal show={showEvent} application={application} handleClose={() => setShowEvent(false)}></EventModal>
    </Container>
  )
}
