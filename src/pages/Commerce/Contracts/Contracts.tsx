import { Container, Row, Col, Dropdown, Button, Card } from 'react-bootstrap'
import './Contracts.scss'
import { NewContractModal } from '../modals/NewContractModal/NewContractModal'
import { useEffect, useState } from 'react'
import { asyncFetchCultivations } from '../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'

export function Contracts() {
  const [showNewContractModal, setShowNewContractModal] = useState(false)
  const [selectedCultivations, setSelectedCultivations]: any = useState({})
  const { financial } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(asyncFetchCultivations())
    setSelectedCultivations(financial?.cultivations[0])
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <div className="frist-column">
            <div className="frist-card">
              <Dropdown className="frist-card-dropdown">
                <span className="frist-card-text">Cultura</span>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCultivations?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {financial?.cultivations?.map((cultivations: any, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedCultivations(financial)}
                      >
                        {cultivations.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="second-card">
              <span className="second-card-text">Contratos</span>
              <div>
                <Button
                  variant="success"
                  className="second-card-button"
                  onClick={() => setShowNewContractModal(true)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={8}>
          <Card className="second-col-card">
            <Card.Body>
              <Card.Title className="second-col-text">Cargas</Card.Title>
              <Card.Text>
                <Dropdown>
                  <Dropdown.Toggle
                    className="second-col-dropdown"
                    variant="success"
                    id="dropdown-basic"
                  >
                    Todos os contratos
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Contrato1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Contrato2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Contrato3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer">
              <div className="frist-box">
                <span>Valor recebido</span>
              </div>
              <div className="second-box">
                <span>Valor a receber</span>
              </div>
              <div className="second-col-date">
                <span>Data</span>
              </div>
              <div className="second-col-value">
                <span>Valor recebido</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <NewContractModal
        show={showNewContractModal}
        handleClose={() => setShowNewContractModal(false)}
      ></NewContractModal>
    </Container>
  )
}
