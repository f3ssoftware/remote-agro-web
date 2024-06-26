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
  asyncFetchEditPlanningProducts,
  asyncFetchEditPlannings,
  asyncFetchPlanningData,
} from '../../stores/planning.store'
import { RootState } from '../..'
import { Planning } from '../../models/Planning'
import { PlanningPlotCard } from './components/PlanningPlotCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { EditPlanningCost } from './components/EditPlanningCost'
import { EditPlanningProducts } from './components/EditPlanningProducts'

const initialPlanningList: Planning[] = []
export function PlanningMain() {
  const [showNewPlanningModal, setShowNewPlannningModal] = useState(false)
  const dispatch = useDispatch<any>()
  const { planning } = useSelector((state: RootState) => state)
  const [plannings, setPlannings] = useState(initialPlanningList)
  const [pageSize, setPageSize] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [showPlanningCostModal, setShowPlanningCostModal] = useState(false)
  const [showPlanningProductModal, setShowPlanningProductModal] =
    useState(false)
  const [editPlanningId, setEditPlanningId] = useState(0)

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

  // const deletePlanning = (id: number) => {
  //   dispatch(asyncDeletePlanning(id))
  //   dispatch(asyncFetchPlanningData)
  // }
  const editPlanningCost = (id: number) => {
    dispatch(asyncFetchEditPlannings(id))
    
  }
  const editPlanningProduct = (id: number) => {
    dispatch(asyncFetchEditPlanningProducts(id))
    
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
                        {/* <Col>
                          {' '}
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              console.log(planning.id)
                              deletePlanning(planning.id!)
                            }}
                          ></FontAwesomeIcon>
                        </Col> */}
                        <Col sm={3}>
                          {' '}
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setEditPlanningId(planning.id!)
                              {
                                planning.type == 'Custos Indiretos' ? (
                                  setShowPlanningCostModal(true),
                                  editPlanningCost(planning?.id!)
                                ) : planning.type == 'Insumos' ? (
                                  setShowPlanningProductModal(true),
                                  editPlanningProduct(planning?.id!)
                                ) : (
                                  <></>
                                )
                              }
                            }}
                          ></FontAwesomeIcon>
                        </Col>
                      </Row>
                        <Col>Temporada: {planning.season_year}</Col>
                      <Row style={{ marginLeft: '1%', marginRight: '1%' }}>
                        <Col>
                          Criado em:{' '}
                          {new Date(planning.createdAt!).toLocaleDateString(
                            'pt-BR',
                            { timeZone: 'UTC' },
                          )}{' '}
                        </Col>
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
          <PlanningPlotCard></PlanningPlotCard>
        </Col>
      </Row>
      <NewPlanningModal
        show={showNewPlanningModal}
        handleClose={() => setShowNewPlannningModal(false)}
      ></NewPlanningModal>
      <EditPlanningCost
        show={showPlanningCostModal}
        handleClose={() => setShowPlanningCostModal(false)}
        id={editPlanningId}
      ></EditPlanningCost>
      <EditPlanningProducts
        show={showPlanningProductModal}
        handleClose={() => setShowPlanningProductModal(false)}
        id={editPlanningId}
      ></EditPlanningProducts>
    </Container>
  )
}
