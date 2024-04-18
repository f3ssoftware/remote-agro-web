import { Button, Card, Col, Dropdown, Row, Table } from 'react-bootstrap'
import richesImg from '../../../assets/images/bens.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Good } from '../../../models/Good'
import { useEffect, useState } from 'react'
import {
  asyncFetchGoods,
  asyncFetchParts,
  asyncGetGoodHistory,
} from '../../../stores/maintenance.store'
import { tr } from 'date-fns/locale'
import { NewRichesModal } from './Modals/NewRichesModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DeleteConfirmationModal } from './Modals/DeleteConfirmationModal'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function Riches() {
  const { maintenance } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedRich, setSelectedRich] = useState<Good>()
  const [showNewRichesModal, setShowNewRichesModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteGoods, setDeleteGoods] = useState(0)

  useEffect(() => {
    dispatch(asyncFetchGoods())
  }, [])

  return (
    <div>
      <Row>
        <Col>
          <Col md={4}>
            <img src={richesImg} alt="" />
          </Col>
          <div className="second-card">
            <span className="second-card-text">Bens</span>
            <div>
              <Button
                variant="success"
                className="second-card-button"
                onClick={() => setShowNewRichesModal(true)}
              >
                +
              </Button>
            </div>
            <div
              style={{ marginTop: '2%', marginLeft: '5%', marginRight: '5%' }}
            >
              <div
                className="contracts-content"
                style={{ maxHeight: '50vh', overflow: 'auto' }}
              >
                <DataTable
                  value={maintenance.goods}
                  // className="p-datatable-striped p-datatable-hover"
                  style={{ backgroundColor: '#fff', color: '#000' }}
                  stripedRows
                >
                  <Column
                    field="name"
                    header="Nome"
                    body={(rowData) => (
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ marginRight: '4%', cursor: 'pointer' }}
                          onClick={() => {
                            setShowDeleteModal(true)
                            setDeleteGoods(rowData.id!)
                          }}
                        />
                        {rowData.name}
                      </div>
                    )}
                  ></Column>
                  <Column field="type" header="Tipo"></Column>
                  <Column
                    field="createdAt"
                    header="Criado em"
                    body={(rowData) =>
                      new Date(rowData.createdAt).toLocaleDateString('pt-BR')
                    }
                  ></Column>
                  <Column
                    field="ipva_ends_at"
                    header="Vencimento IPVA"
                    body={(rowData) =>
                      new Date(rowData.ipva_ends_at).toLocaleDateString('pt-BR')
                    }
                  ></Column>
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
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Criado em</th>
                        <th>Vencimento IPVA</th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                      {maintenance.goods.map((good) => {
                        return (
                          <tr>
                            <td><FontAwesomeIcon
                            icon={faTrash}
                            style={{ marginRight:'4%',cursor: 'pointer' }}
                            onClick={() => {
                              setShowDeleteModal(true)
                              setDeleteGoods(good.id!)
                            }}
                          ></FontAwesomeIcon>{good?.name}</td>
                            <td>{good?.type}</td>
                            <td>
                              {new Date(good?.createdAt!).toLocaleDateString(
                                'pt-BR',
                              )}
                            </td>
                            <td>
                              {new Date(good?.ipva_ends_at!).toLocaleDateString(
                                'pt-BR',
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table> */}
              </div>
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
                  {selectedRich ? `${selectedRich.name}` : 'Selecione um bem'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[...maintenance.goods].map((good, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => {
                          setSelectedRich(good)
                          dispatch(asyncGetGoodHistory({ good_id: good.id }))
                        }}
                      >
                        {good?.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <DataTable
                value={maintenance.goodHistory}
                className="p-datatable-striped p-datatable-hover"
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                <Column
                  field="updatedAt"
                  header="Data"
                  body={(rowData) => (
                    <div>
                      {new Date(rowData?.updatedAt).toLocaleDateString('pt-BR')}{' '}
                      {new Date(rowData?.updatedAt).toLocaleTimeString('pt-BR')}
                    </div>
                  )}
                ></Column>
                <Column field="type" header="Tipo"></Column>
                <Column field="quantity" header="Quantidade"></Column>
                <Column field="observations" header="Observações"></Column>
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
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Observações</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                  {maintenance.goodHistory.map((data: any) => {
                    return (
                      <tr>
                        <td>
                          {new Date(data?.updatedAt).toLocaleDateString(
                            'pt-BR',
                          )}{' '}
                          {new Date(data?.updatedAt).toLocaleTimeString(
                            'pt-BR',
                          )}
                        </td>
                        <td>{data?.type}</td>
                        <td>{data?.quantity}</td>
                        <td>{data?.observations}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <NewRichesModal
        show={showNewRichesModal}
        handleClose={() => setShowNewRichesModal(false)}
      ></NewRichesModal>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={deleteGoods}
      ></DeleteConfirmationModal>
    </div>
  )
}
