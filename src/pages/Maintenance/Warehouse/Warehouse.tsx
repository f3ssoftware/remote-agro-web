import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { asyncFetchParts } from '../../../stores/maintenance.store'
import { Part } from '../../../models/Part'
import { InputPartsModal } from './modals/InputPartsModal'
import { OutputPartsModal } from './modals/OutputPartsModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { PartHistoryModal } from './modals/PartHistoryModal'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function Warehouse() {
  const dispatch = useDispatch<any>()
  const { maintenance } = useSelector((state: RootState) => state)
  const initialParts: Part[] = []
  const [findParts, setFindParts] = useState('')
  const [parts, setParts] = useState(initialParts)
  const [showInputPartsModal, setShowInputPartsModal] = useState(false)
  const [showOutputPartsModal, setShowOutputPartsModal] = useState(false)
  const [showPartHistoryModal, setShowPartHistoryModal] = useState(false)
  const [selectedPart, setSelectedPart] = useState(new Part())

  const find = () => {
    setParts(
      maintenance?.parts?.filter((parts: Part) => {
        if (parts!.name?.toUpperCase().includes(findParts.toUpperCase())) {
          return parts
        }
        return null
      }),
    )
  }

  useEffect(() => {
    dispatch(asyncFetchParts())
  }, [])

  useEffect(() => {
    find()
  }, [findParts])

  useEffect(() => {
    setParts(maintenance.parts)
  }, [maintenance])

  return (
    <div>
      <Card className="ra-card">
        <Card.Body>
          <Row>
            <Col md={3}>
              <h3>Almoxarifado</h3>
            </Col>
            <Col md={2}>
              <Button
                className="inputs-btn"
                onClick={() => setShowInputPartsModal(true)}
              >
                Entrada
              </Button>
            </Col>
            <Col md={2}>
              <Button
                className="output-btn"
                variant="danger"
                onClick={() => setShowOutputPartsModal(true)}
              >
                Saída
              </Button>
            </Col>
            <Col md={3}>
              <Form>
                <Form.Control
                  type="text"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#4F9D24',
                    borderRadius: '100px',
                    height: '30px',
                  }}
                  placeholder="Pesquisar"
                  onChange={(e) => {
                    setFindParts(e.target.value)
                  }}
                ></Form.Control>
              </Form>
            </Col>
          </Row>
          <DataTable
            value={parts}
            // className="p-datatable-striped p-datatable-hover"
            style={{ backgroundColor: '#fff', color: '#000' , marginTop: '2%'}}
            stripedRows
          >
            <Column
              field="name"
              header="Nome"
              body={(rowData) => (
                <div>
                  <span>{rowData.name}</span>
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{
                      marginLeft: '4%',
                      color: '#000AFF',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setShowPartHistoryModal(true)
                      setSelectedPart(rowData)
                    }}
                  />
                </div>
              )}
            ></Column>
            <Column field="code" header="Código"></Column>
            <Column field="quantity" header="Qntd."></Column>
            <Column
              field="unit_price"
              header="Unitário"
              body={(rowData) =>
                Number(rowData.unit_price).toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                  useGrouping: true,
                })
              }
            ></Column>
            <Column
              header="Total"
              body={(rowData) =>
                Number(rowData.quantity * rowData.unit_price).toLocaleString(
                  'pt-BR',
                  {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                    useGrouping: true,
                  },
                )
              }
            ></Column>
            <Column field="position" header="Posição"></Column>
          </DataTable>
          {/* <Table striped hover>
                    <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
                        <tr>
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Qntd.</th>
                            <th>Unitário</th>
                            <th>Total</th>
                            <th>Posição</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                        {parts.map(part => {
                            return <tr>
                                <td><Row>
                                                <Col md={6}>
                                                {part?.name}
                                                </Col>
                                                <Col md={2}>
                                                    <FontAwesomeIcon icon={faEye} style={{ color: '#000AFF', cursor: 'pointer' }} onClick={() => {
                                                        setShowPartHistoryModal(true);
                                                        setSelectedPart(part);
                                                    }}></FontAwesomeIcon>
                                                </Col>
                                            </Row></td>
                                <td>{part?.code}</td>
                                <td>{part?.quantity}</td>
                                <td>{Number(part.unit_price).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                                <td>{Number(part?.quantity! * part?.unit_price!).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                                <td>{part?.position}</td>
                            </tr>
                        })}

                    </tbody>
                </Table> */}
          {/* <Card.Title>Histórico</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      <InputPartsModal
        show={showInputPartsModal}
        handleClose={() => setShowInputPartsModal(false)}
      ></InputPartsModal>
      <OutputPartsModal
        show={showOutputPartsModal}
        handleClose={() => setShowOutputPartsModal(false)}
      ></OutputPartsModal>
      <PartHistoryModal
        show={showPartHistoryModal}
        handleClose={() => {
          setShowPartHistoryModal(false), setSelectedPart(new Part())
        }}
        part={selectedPart}
      ></PartHistoryModal>
    </div>
  )
}
