import {
  Row,
  Col,
  Card,
  Table,
  Pagination,
  Dropdown,
  Button,
} from 'react-bootstrap'
import richesImg from '../../../assets/images/bens.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import {
  asyncFetchFuellings,
  asyncFetchTanks,
} from '../../../stores/maintenance.store'
import './Fuel.scss'
import { Tank } from '../../../models/Tank'
import { NewTankModal } from './Modals/NewTankModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump } from '@fortawesome/free-solid-svg-icons'
import { InputTankModal } from './Modals/InputTankModal'
import { OutputTankModal } from './Modals/OutputTankModal'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const PAGE_SIZE = 3
export function Fuel() {
  const [tanks, setTanks] = useState<Tank[]>([])
  const [showNewTankModal, setShowNewTankModal] = useState(false)
  const [showInputTankModal, setShowInputTankModal] = useState(false)
  const [showOutputTankModal, setShowOutputTankModal] = useState(false)
  const [tankId, setTankId] = useState(0)
  const [page, setPage] = useState(1)
  // const [history, setHistory] = useState<>([]);
  const { maintenance } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(asyncFetchTanks())
  }, [])

  useEffect(() => {
    setTanks([...maintenance.tanks].slice(0, 3))
  }, [maintenance])

  const paginate = (page: number) => {
    // [...financial.bankAccounts].slice((page - 1) * pageSize, page * pageSize)
    setTanks(
      [...maintenance.tanks].slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    )
  }

  return (
    <div>
      <Row>
        <Col>
          <Col md={4}>
            <img src={richesImg} alt="" />
          </Col>
          <div className="second-card">
            <span className="second-card-text">Tanques</span>
            <div>
              <Button
                variant="success"
                className="second-card-button"
                onClick={() => setShowNewTankModal(true)}
              >
                +
              </Button>
            </div>

            {tanks.map((tank) => {
              return (
                <div className="fuel-card">
                  <Row>
                    <Col>
                      <h3>{tank?.name}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <FontAwesomeIcon
                        icon={faGasPump}
                        style={{
                          color: '#71f207',
                          marginLeft: '2%',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setShowInputTankModal(true)
                          setTankId(tank.id!)
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faGasPump}
                        style={{
                          color: '#ed0707',
                          marginLeft: '6%',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setShowOutputTankModal(true)
                          setTankId(tank.id!)
                        }}
                      />
                    </Col>
                    <Col md={4}>{tank?.quantity} L</Col>
                  </Row>
                </div>
              )
            })}
            <div className="flex-center" style={{ marginTop: '10%' }}>
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
                    if (page < maintenance.tanks.length / PAGE_SIZE) {
                      console.log(maintenance.tanks.length / PAGE_SIZE)
                      paginate(page + 1)
                      setPage(page + 1)
                    }
                  }}
                />
              </Pagination>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <Card className="second-col-plot">
            <Card.Body>
              <Card.Title className="second-col-text">Histórico</Card.Title>
              <Dropdown>
                <Dropdown.Toggle
                  className="second-col-dropdown"
                  variant="success"
                  id="dropdown-basic"
                >
                  Tanques
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[...maintenance.tanks].map((tank, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          dispatch(
                            asyncFetchFuellings({
                              page: 1,
                              tank_id: tank?.id,
                            }),
                          )
                        }}
                      >
                        {tank?.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <DataTable
                value={maintenance.fuellings}
                className="p-datatable-striped p-datatable-hover"
                style={{ backgroundColor: '#fff', color: '#000' }}
                showGridlines
              >
                <Column
                  field="updatedAt"
                  header="Data"
                  body={(rowData) => (
                    <div>
                      {new Date(rowData.updatedAt).toLocaleDateString('pt-BR')}{' '}
                      {new Date(rowData.updatedAt).toLocaleTimeString('pt-BR')}
                    </div>
                  )}
                ></Column>
                <Column field="good.name" header="Bem"></Column>
                <Column
                  field="quantity"
                  header="Quantidade"
                  body={(rowData) => (
                    <span
                      style={{
                        color: rowData.type === 'Saida' ? '#ff0000' : '#008000',
                      }}
                    >
                      {rowData.quantity}
                    </span>
                  )}
                ></Column>
                <Column field="tank.name" header="Tanque"></Column>
              </DataTable>
              {/* <Table striped hover>
                <thead
                  style={{
                    backgroundColor: '#243C74',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  <tr>
                    <th>Data</th>
                    <th>Bem</th>
                    <th>Quantidade</th>
                    <th>Tanque</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                  {maintenance.fuellings.map((f: any) => {
                    return (
                      <tr>
                        <td>
                          {new Date(f?.updatedAt)?.toLocaleDateString('pt-BR')}{' '}
                          {new Date(f?.updatedAt)?.toLocaleTimeString('pt-BR')}
                        </td>
                        <td>{f?.good.name}</td>
                        {f?.type == 'Saida' ? <td style={{color: '#ff0000'}}>{f?.quantity}</td> : <td style={{color: '#008000'}}>{f?.quantity}</td>}
                        <td>{f?.tank?.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <NewTankModal
        show={showNewTankModal}
        handleClose={() => setShowNewTankModal(false)}
      ></NewTankModal>
      <InputTankModal
        show={showInputTankModal}
        handleClose={() => setShowInputTankModal(false)}
        id={tankId}
      ></InputTankModal>
      <OutputTankModal
        show={showOutputTankModal}
        handleClose={() => setShowOutputTankModal(false)}
        id={tankId}
      ></OutputTankModal>
    </div>
  )
}
