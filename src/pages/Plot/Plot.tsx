import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../..'
import { asyncFetchFarms } from '../../stores/farm.store'
import { NewFarmModal } from './Modals/NewFarmModal'
import { NewPlotModal } from './Modals/NewPlotModal'
import { PrescriptionModal } from './Modals/PrescriptionModal'
import './Plot.scss'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import ptBR from 'date-fns/locale/pt-BR'

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
export function Plot() {
  const { farm } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();
  const [showNewPlotModal, setShowNewPlotModal] = useState(false)
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showNewFarmModal, setShowNewFarmModal] = useState(false)
  const [selectedFarm, setSelectedFarm]: any = useState({});
  const [selectedPlot, setSelectedPlot]: any = useState({});

  useEffect(() => {
    dispatch(asyncFetchFarms());
    setSelectedFarm(farm?.farms[0]);
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <div className="frist-column-plot">
            <div className="frist-card-plot">
              <Dropdown className="frist-card-dropdown-plot">
                <span className="frist-card-text-plot">Fazenda</span>
                <div>
                  <Button variant="success" className="frist-card-button-plot" onClick={() => setShowNewFarmModal(true)}>
                    +
                  </Button>
                </div>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedFarm?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {farm?.farms?.map((farm: any, index) => {
                    return <Dropdown.Item key={index} onClick={() => setSelectedFarm(farm)}>{farm.name}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="second-card-plot">
              <span className="second-card-text-plot">Talhões </span>
              <div>
                <Button variant="success" className="second-card-button-plot" onClick={() => setShowNewPlotModal(true)}>
                  +
                </Button>
              </div>
              <iframe src={selectedFarm?.map_link} width={380} height={400}></iframe>
            </div>
          </div>
        </Col>

        <Col xs={8}>
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
                localizer={localizer}
                events={[]}
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
    </Container>
  )
}
