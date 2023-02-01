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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { asyncDeleteContract, asyncFetchEditContracts } from '../../../stores/commerce.store'
import { EditContractModal } from '../modals/NewContractModal/EditContractModal'
import { ContractLoad } from '../modals/components/ContractLoad'
import { DeleteConfirmation } from '../modals/components/DeleteConfirmation'

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
  const [showEditContractModal, setShowEditContractModal] = useState(false)
  const [contractId, setContractId] = useState(0)
  const [deleteContracts, setDeleteContracts] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  useEffect(() => {
    dispatch(asyncFetchContractsData())
  }, [])

  useEffect(() => {
    filter()
  }, [selectedCultivations])

  useEffect(() => {
    dispatch(asyncFetchCultivations())
    setSelectedCultivations(financial?.cultivations[0])
  }, [])

  useEffect(() => {
    paginate(page)
    setTotalResults(financial.contracts.length)
    setPageSize(2)
  }, [financial])

  const filter = () => {
    setContracts(contracts.filter((contract: any) => {
        if(contract.id == contract.selectedCultivations){
          return contract;
        }
        return null

    }))
  }

  const paginate = (page: number) => {
    const pageSize = 2
    setContracts(
      [...financial.contracts].slice((page - 1) * pageSize, page * pageSize),
    )
  }

  const editContract = (id: number) =>{
    dispatch(asyncFetchEditContracts(id))
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
                        // value={}
                        onClick={() => setSelectedCultivations(cultivations)}
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
              <div
                style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}
              >
                <div className="contracts-content">
                  {contracts.map((contract, index) => (
                    <div className="contracts-card" key={index}>
                      <Row style={{ marginLeft: '1%' }}>
                        <Col>
                          <b>{contract.name}</b>
                        </Col>
                      </Row>
                      <Row style={{ marginLeft: '1%' }}>
                        <Col>Cultivo: {contract.cultivation_name}</Col>
                      </Row>
                      <Row style={{ marginLeft: '1%', marginRight: '1%' }}>
                        <Col>
                          Inicio:{' '}
                          {new Date(contract.start_date!).toLocaleDateString(
                            'pt-BR',
                            { timeZone: 'UTC' },
                          )}
                        </Col>
                        <Col>
                          Final:{' '}
                          {new Date(contract.end_date!).toLocaleDateString(
                            'pt-BR',
                            { timeZone: 'UTC' },
                          )}
                        </Col>
                        <Col>
                          Pagamento:{' '}
                          {new Date(contract.payment_date!).toLocaleDateString(
                            'pt-BR',
                            { timeZone: 'UTC' },
                          )}
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%' }}>
                        <Col>
                          {' '}
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              console.log(contract.id)
                              setShowDeleteModal(true)
                              setDeleteContracts(contract.id!)
                            }}
                          ></FontAwesomeIcon>
                        </Col>
                        <Col>
                          {' '}
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              console.log(contract.id)
                              editContract(contract.id!)
                              setContractId(contract.id!)
                              setShowEditContractModal(true)
                            }}
                          ></FontAwesomeIcon>
                        </Col>
                        <Col>
                          <div className="flex-right">
                            <h5
                              style={{
                                color:
                                  Number(contract.amount) > 0
                                    ? '#4C9626'
                                    : '#911414',
                              }}
                            >
                              {Number(contract.amount! / 100).toLocaleString(
                                'pt-BR',
                                {
                                  maximumFractionDigits: 2,
                                  style: 'currency',
                                  currency: 'BRL',
                                  useGrouping: true,
                                },
                              )}
                            </h5>
                          </div>
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
        <ContractLoad></ContractLoad>
      </Row>
      <NewContractModal
        show={showNewContractModal}
        handleClose={() => setShowNewContractModal(false)}
      ></NewContractModal>
      <EditContractModal
        show={showEditContractModal}
        handleClose={() => setShowEditContractModal(false)}
        id={contractId}
      ></EditContractModal>
      <DeleteConfirmation show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={deleteContracts}></DeleteConfirmation>
    </Container>
  )
}
