import { useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import { NewFarmModal } from './Modals/NewFarmModal'
import { NewPlotModal } from './Modals/NewPlotModal'
import { PrescriptionModal } from './Modals/PrescriptionModal'
import './Plot.scss'

export function Plot() {
    const [showNewPlotModal,setShowNewPlotModal] = useState(false)
    const [showPrescriptionModal,setShowPrescriptionModal] = useState(false)
    const [showNewFarmModal,setShowNewFarmModal] = useState(false)
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
                  Santo Antonio
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Fazenda1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Fazenda2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Fazenda3</Dropdown.Item>
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
                    Todos os talhões
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Contrato1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Contrato2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Contrato3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Text>
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
