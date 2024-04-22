import { useEffect, useState } from 'react'
import { Col, Modal, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../..'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function SeedingEventModal({
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
  // useEffect(() => {

  // }, [application]);
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
        <Col>
          Talhão:{' '}
          {plot?.applications[index]?.fields.map((f: any) => {
            f.name
          })}
        </Col>
      </Row>
      <Row>
        <Col>Área Aplicada: {plot?.applications[index]?.seed_area}</Col>
      </Row>
      <Row>
        <Col>Aplicador: {plot?.applications[index]?.applier.name}</Col>
      </Row>
      <Row>
        <Col>Dose/ha(kg): {plot?.applications[index]?.fertilizer_quantity}</Col>
      </Row>
      <Row>
        <Col>
          População(sementes/ha): {plot?.applications[index]?.seed_quantity}
        </Col>
      </Row>
      <Row>
        <Col>
          Espaçamento entre linhas: {plot?.applications[index]?.lines_spacing}
        </Col>
      </Row>
      <Row>
        <Col>Vazão(L/ha): {plot?.applications[index]?.flow_rate}</Col>
      </Row>

      <DataTable
        value={plot?.applications[index]?.application_tables}
        className="p-datatable-striped p-datatable-hover"
        style={{ backgroundColor: '#fff', color: '#000' }}
      >
        <Column field="product_name" header="Produto" />
        <Column field="quantity" header="Qtd/ha (L)" />
        <Column
          header="Aplicados Totais (L)"
          body={(rowData) => rowData.totalAppliedLabel / 1000}
        />
      </DataTable>

      {/* <Table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Teste (mL)</th>
              <th>Qtd/ha (L)</th>
              <th>Tanque (L)</th>
              <th>Aplicados Totais (L)</th>
            </tr>
          </thead>
          <tbody>
            {plot?.applications[index]?.application_tables?.map(
              (applicationTable: any) => {
                return (
                  <tr>
                    <td>{applicationTable?.product_name}</td>
                    <td>{applicationTable?.quantity}</td>
                    <td>{applicationTable?.totalAppliedLabel / 1000}</td>
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
