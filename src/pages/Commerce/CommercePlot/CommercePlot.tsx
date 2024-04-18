import { useEffect, useState } from 'react'
import { Container, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Silo } from '../../../models/Silo'
import { asyncFetchSiloData } from '../../../stores/commerce.store'
import '../CommercePlot/Commerceplot.scss'
import { NewCommercePlotModal } from '../modals/NewCommercePlotModal/NewCommercePlotModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { PlotDeleteConfirmation } from './PlotDeleteConfirmation'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const initialSiloList: Silo[] = []
export function CommercePlot() {
  const [showNewCommercePlotModal, setShowNewCommercePlotModal] =
    useState(false)
  const { commerce } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [silos, setSilos] = useState(initialSiloList)
  const [page, setPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [siloId, setSiloId] = useState(0)

  useEffect(() => {
    dispatch(asyncFetchSiloData())
  }, [])

  useEffect(() => {
    setSilos(commerce.silo)
  }, [commerce])

  return (
    <Container>
      <div className="main-box">
        <Row>
          <Col md={2} className="title-box">
            <span>Silos</span>
          </Col>
          <div>
            <Button
              variant="success"
              className="plot-btn"
              onClick={() => setShowNewCommercePlotModal(true)}
            >
              +
            </Button>{' '}
          </div>
        </Row>
        <div className="plot-table">
          <DataTable
            value={silos}
            className="p-datatable-striped p-datatable-hover"
            style={{ backgroundColor: '#fff', color: '#000' }}
          >
            <Column field="name" header="Silo"></Column>
            <Column
              field="cultivations"
              header="Cultivar"
              body={(rowData) => {
                return (
                  <ul>
                    {rowData.cultivations.map((c: any, index: number) => (
                      <li key={index}>{c.name}</li>
                    ))}
                  </ul>
                )
              }}
            ></Column>
            <Column
              field="cultivations"
              header="Quantidade"
              body={(rowData) => {
                return (
                  <ul>
                    {rowData.cultivations.map((c: any, index: number) => (
                      <li key={index}>{c.SiloCultivar.quantity} Sacas</li>
                    ))}
                  </ul>
                )
              }}
            ></Column>
            <Column
              header="Ações"
              body={(rowData) => (
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSiloId(rowData.id)
                    setDeleteModal(true)
                  }}
                />
              )}
            ></Column>
          </DataTable>
          {/* <Table striped bordered hover>
            <thead style={{ backgroundColor: '#243C74', color: '#fff' }}>
              <tr>
                <th>Silo</th>
                <th>Cultivar</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
              {silos.map((silo, index) => {
                return (
                  <tr key={index}>
                    <td>{silo.name}</td>
                    <td>
                      {silo?.cultivations?.map((c: any) => {
                        return (
                          <ul>
                            <li>{c?.name}</li>
                          </ul>
                        )
                      })}
                    </td>
                    <td>
                      {silo?.cultivations?.map((c: any) => {
                        return (
                          <ul>
                            <li>{c?.SiloCultivar?.quantity} Sacas</li>
                          </ul>
                        )
                      })}
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSiloId(silo.id!)
                          setDeleteModal(true)
                        }}
                      ></FontAwesomeIcon>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table> */}
        </div>
      </div>
      <NewCommercePlotModal
        show={showNewCommercePlotModal}
        handleClose={() => setShowNewCommercePlotModal(false)}
      ></NewCommercePlotModal>
      <PlotDeleteConfirmation
        show={deleteModal}
        handleClose={setDeleteModal}
        id={siloId}
      ></PlotDeleteConfirmation>
    </Container>
  )
}
