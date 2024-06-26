import { useEffect, useState } from 'react'
import { Col, Modal, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function DefensiveEventModal({
  show,
  handleClose,
  application,
}: {
  show: boolean
  handleClose: any
  application: any
}) {
  const { plot } = useSelector((state: RootState) => state)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(
      plot?.applications?.findIndex((app) => application?.id === app?.id),
    )
  }, [application])

  return (
    <Dialog
      header={
        <span>
          #{plot?.applications[index]?.number} -{' '}
          {plot?.applications[index]?.type}
        </span>
      }
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <h5>
        {plot?.applications[index]?.was_applied
          ? 'Aplicação realizada'
          : 'Aplicação não realizada'}
      </h5>
      <Row>
        <Col>Aplicação: {plot?.applications[index]?.number}</Col>
      </Row>
      <Row>
        <Col>Área Aplicada: {plot?.applications[index]?.seed_area}</Col>
      </Row>
      <Row>
        <Col>Tipo: {plot?.applications[index]?.application_type}</Col>
      </Row>
      <Row>
        <Col>Bico: {plot?.applications[index]?.block}</Col>
      </Row>
      <Row>
        <Col>Vazão: {plot?.applications[index]?.flow_rate} L/ha</Col>
      </Row>
      <Row>
        <Col>Área por tanque: {plot?.applications[index]?.area} ha</Col>
      </Row>
      <Row>
        <Col>
          Número de tanques: {plot?.applications[index]?.number_of_tanks}
        </Col>
      </Row>
      <Row>
        <Col>
          Calda total:{' '}
          {plot?.applications[index]?.flow_rate *
            plot?.applications[index]?.area *
            plot?.applications[index]?.number_of_tanks!}
        </Col>
      </Row>
      <Row>
        <Col>
          Calda/tanque:{' '}
          {plot?.applications[index]?.flow_rate *
            plot?.applications[index]?.area *
            plot?.applications[index]?.number_of_tanks!}
        </Col>
      </Row>
      <Row>
        <Col>Pressão: {plot?.applications[index]?.pressure}</Col>
      </Row>
      <DataTable
        value={plot?.applications[index]?.application_tables}
        className="p-datatable-striped p-datatable-hover"
        style={{ backgroundColor: '#fff', color: '#000' }}
      >
        <Column field="product_name" header="Produto" />
        <Column field="test" header="Teste (mL)" />
        <Column field="quantity" header="Qtd/ha (L)" />
        <Column field="tank" header="Tanque (L)" />
        <Column
          header="Aplicados Totais (L)"
          body={(rowData) => rowData.total_quantity / 1000}
        />
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
              <th>Produto</th>
              <th>Teste (mL)</th>
              <th>Qtd/ha (L)</th>
              <th>Tanque (L)</th>
              <th>Aplicados Totais (L)</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
            {plot?.applications[index]?.application_tables?.map(
              (applicationTable: any) => {
                return (
                  <tr>
                    <td>{applicationTable?.product_name}</td>
                    <td>{applicationTable?.test}</td>
                    <td>{applicationTable?.quantity}</td>
                    <td>{applicationTable?.tank}</td>
                    <td>{applicationTable?.total_quantity / 1000}</td>
                  </tr>
                )
              },
            )}
          </tbody>
        </Table> */}
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>
    //         #{plot?.applications[index]?.number} -{' '}
    //         {plot?.applications[index]?.type}
    //       </span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529', color: '#fff' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
