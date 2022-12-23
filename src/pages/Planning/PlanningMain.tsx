import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Pagination,
} from 'react-bootstrap'
import './Planning.scss'
import { NewPlanningModal } from './Modals/NewPlanningModal'
import { useEffect, useState } from 'react'
import planningImg from '../../assets/images/planning_image.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  asyncFetchPlanningData,
} from '../../stores/planning.store'
import { RootState } from '../..'
import { Planning } from '../../models/Planning'

const initialPlanningList: Planning[] = []
export function PlanningMain() {
  const [showNewPlanningModal, setShowNewPlannningModal] = useState(false)
  const dispatch = useDispatch<any>()
  const { planning } = useSelector((state: RootState) => state)
  const [plannings, setPlannings] = useState(initialPlanningList)
  const [pageSize, setPageSize] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(asyncFetchPlanningData())
  }, [])

  useEffect(() => {
    paginate(page)
    setTotalResults(planning.plannings.length)
    setPageSize(3)
  }, [planning])

  const paginate = (page: number) => {
    const pageSize = 3
    setPlannings(
      [...planning.plannings].slice((page - 1) * pageSize, page * pageSize),
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="frist-column">
            <Col>
              <img src={planningImg} alt="" />
            </Col>
            <div className="second-card">
              <span className="second-card-text">Planejamento</span>
              <div>
                <Button
                  variant="success"
                  className="second-card-button"
                  onClick={() => setShowNewPlannningModal(true)}
                >
                  +
                </Button>
              </div>
              <div
                style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}
              >
                <div className="contracts-content">
                  {plannings.map((planning, index) => (
                    <div className="contracts-card" key={index}>
                      <Row style={{ marginLeft: '1%' }}>
                        <Col>Nome: {planning.name}</Col>
                      </Row>
                      <Row style={{ marginLeft: '1%' }}>
                        <Col>Temporada: {planning.season_year}</Col>
                      </Row>
                      <Row style={{ marginLeft: '1%', marginRight: '1%' }}>
                        <Col>Criado em: {planning.createdAt} </Col>
                      </Row>
                    </div>
                  ))}
                </div>
                <div className="flex-center" style={{ marginTop: '5%' }}>
                      <Pagination size="sm">
                        <Pagination.Prev
                          onClick={() => {
                            if (page > 1) {
                              paginate(page - 1)
                              setPage(page - 1)
                            }
                          }}
                        />
                        <Pagination.Next
                          onClick={() => {
                            if (page < totalResults / pageSize) {
                              console.log(totalResults / pageSize)
                              paginate(page + 1)
                              setPage(page + 1)
                            } else {
                              console.log('else: ', totalResults / pageSize)
                            }
                          }}
                        />
                      </Pagination>
                    </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={8}>
          <Card className="second-col-card">
            <Card.Body>
              <Card.Title className="second-col-text">Histórico</Card.Title>
              <Card.Text>
                <Dropdown>
                  <Dropdown.Toggle
                    className="second-col-dropdown"
                    variant="success"
                    id="dropdown-basic"
                  >
                    Planejamentos
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">plan1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">plan2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">plan3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer">
              <div className="frist-box">
                <span>Custos diretos</span>
              </div>
              <div className="second-box">
                <span>Custos indiretos</span>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <NewPlanningModal
        show={showNewPlanningModal}
        handleClose={() => setShowNewPlannningModal(false)}
      ></NewPlanningModal>
    </Container>
  )
}


