import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Card,
  Pagination,
} from 'react-bootstrap'
import './Contracts.scss'
import { NewContractModal } from '../modals/NewContractModal/NewContractModal'
import { useEffect, useState } from 'react'
import {
  asyncFetchContractsData,
  asyncFetchCultivations,
} from '../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { Contract } from '../../../models/Contract'

const initialContractList: Contract[] = []
export function Contracts() {
  const [showNewContractModal, setShowNewContractModal] = useState(false)
  const [selectedCultivations, setSelectedCultivations]: any = useState({})
  const { financial } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [contracts, setContracts] = useState(initialContractList)
  const [pageSize, setPageSize] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(asyncFetchContractsData())
  }, [])

  useEffect(() => {
    dispatch(asyncFetchCultivations())
    setSelectedCultivations(financial?.cultivations[0])
  }, [])

  useEffect(() => {
    paginate(page)
    setTotalResults(financial.contracts.length)
    setPageSize(2)
  }, [financial])

  const paginate = (page: number) => {
    const pageSize = 2
    setContracts(
      [...financial.contracts].slice((page - 1) * pageSize, page * pageSize),
    )
  }

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
              <div style={{ marginTop: '2%', marginLeft: '5%', marginRight:'5%' }}>
                    <div className="contracts-content">
                      {contracts.map((contract, index) => (
                        <div  className="contracts-card" key={index}>
                          <Row style={{marginLeft: '1%'}}>
                            <Col>
                              <b>{contract.name}</b>
                            </Col>
                          </Row >
                          <Row style={{marginLeft: '1%'}}>
                            <Col>Cultivo: {contract.cultivation_name}</Col>
                          </Row>
                          <Row style={{marginLeft: '1%' ,marginRight: '1%'}}>
                            <Col>Inicio: {new Date(contract.start_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Col>
                            <Col>Final: {new Date(contract.end_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Col>
                            <Col>Pagamento: {new Date(contract.payment_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Col>
                          </Row>

                          <div style={{marginTop: '2%', marginRight: '2%'}} className="flex-right">
                            <h5 style={{ color: (Number(contract.amount)) > 0 ? '#4C9626' : '#911414' }}>{Number(contract.amount!/100).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h5>
                        </div>
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
