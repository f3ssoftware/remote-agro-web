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
import { NewPlanningModal } from '../Planning/Modals/NewPlanningModal'
import { useEffect, useState } from 'react'
import planningImg from '../../assets/images/planning_image.png'
// import {
//   asyncFetchContractsData,
//   asyncFetchCultivations,
// } from '../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../../index'
// import { Contract } from '../../../models/Contract'

// const initialContractList: Contract[] = []
export function Planning() {
  const [showNewPlanningModal, setShowNewPlannningModal] = useState(false)
  const [selectedCultivations, setSelectedCultivations]: any = useState({})
  // const { financial } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  // const [contracts, setContracts] = useState(initialContractList)
  const [pageSize, setPageSize] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  // useEffect(() => {
  //   dispatch(asyncFetchContractsData())
  // }, [])

  // useEffect(() => {
  //   dispatch(asyncFetchCultivations())
  //   setSelectedCultivations(financial?.cultivations[0])
  // }, [])

  // useEffect(() => {
  //   paginate(page)
  //   setTotalResults(financial.contracts.length)
  //   setPageSize(2)
  // }, [financial])

  // const paginate = (page: number) => {
  //   const pageSize = 2
  //   setContracts(
  //     [...financial.contracts].slice((page - 1) * pageSize, page * pageSize),
  //   )
  // }

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
                  <div className="contracts-card">
                    <Row style={{ marginLeft: '1%' }}>
                      <Col>Nome</Col>
                    </Row>
                    <Row style={{ marginLeft: '1%' }}>
                      <Col>Cultivo:</Col>
                    </Row>
                    <Row style={{ marginLeft: '1%', marginRight: '1%' }}>
                      <Col>Inicio: </Col>
                      <Col>Final: </Col>
                      <Col>Pagamento:</Col>
                    </Row>
                  </div>
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
                <span>Valor recebido</span>
              </div>
              <div className="second-box">
                <span>Valor a receber</span>
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
