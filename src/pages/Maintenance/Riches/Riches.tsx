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

export function Riches() {
  const { maintenance } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedRich, setSelectedRich] = useState<Good>()
  const [showNewRichesModal, setShowNewRichesModal] = useState(false)

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
                <div className="contracts-content" style={{maxHeight: '50vh', overflow: 'auto' }}>
                <Table striped hover>
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
                            <td>{good?.name}</td>
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
                  </Table>
                </div>
              </div>
            </div>
        </Col>  
          <Col md={8}>
            <Card  className="second-col-plot">
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
                <Table striped hover>
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
                </Table>
              </Card.Body>
            </Card>
          </Col>
      </Row>
      <NewRichesModal
        show={showNewRichesModal}
        handleClose={() => setShowNewRichesModal(false)}
      ></NewRichesModal>
    </div>
  )
}
