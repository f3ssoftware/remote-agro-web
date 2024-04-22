import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { History } from '../../../models/History'
import { Product } from '../../../models/Product'
import { asyncFetchProductHistory } from '../../../stores/input.store'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function HistoryModal({
  show,
  product,
  handleClose,
}: {
  show: boolean
  product: Product
  handleClose: any
}) {
  const { input, loading } = useSelector((state: RootState) => state)
  const [history, setHistory] = useState(input.productHistory)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (show) {
      dispatch(asyncFetchProductHistory(product.id!))
    }
  }, [show])

  useEffect(() => {
    const newHistory = [...input.productHistory]
    newHistory.sort((h1: History, h2: History) => {
      if (h1.createdAt! > h2.createdAt!) {
        return -1
      }

      if (h1.createdAt! < h2.createdAt!) {
        return 1
      }

      return 0
    })
    setHistory(newHistory)
  }, [input])

  return (
    <Dialog
      header={<span>Histórico - {product.product?.name}</span>}
      visible={show}
      style={{ width: '70vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
        {loading.requests.filter((r) => r === 'product-flows-by-user-product')
          .length === 0 ? (
          <DataTable
            value={history}
            className="p-datatable-striped p-datatable-hover"
            style={{ backgroundColor: '#fff', color: '#000' }}
          >
            <Column field="flow_type" header="Tipo"></Column>
            <Column
              field="createdAt"
              header="Data"
              body={(rowData) =>
                new Date(rowData.createdAt).toLocaleDateString('pt-BR')
              }
            ></Column>
            <Column field="accountable" header="Responsável"></Column>
            <Column
              field="quantity"
              header="Quantidade"
              body={(rowData) => rowData.quantity / 1000}
            ></Column>
            <Column field="observations" header="Observações"></Column>
            <Column
              field="price"
              header="Custo Total"
              body={(rowData) =>
                (rowData.price / 100).toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                  useGrouping: true,
                })
              }
            ></Column>
          </DataTable>
        ) : (
          // <Table striped hover>
          //   <thead
          //     style={{
          //       backgroundColor: '#243C74',
          //       color: '#fff',
          //       border: 'none',
          //     }}
          //   >
          //     <tr>
          //       <th>Tipo</th>
          //       <th>Data</th>
          //       <th>Responsável</th>
          //       <th>Quantidade</th>
          //       <th>Observações</th>
          //       <th>Custo Total</th>
          //     </tr>
          //   </thead>
          //   <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
          //     {history?.map((history: History, index) => {
          //       return (
          //         <tr key={index}>
          //           <td>{history?.flow_type}</td>
          //           <td>
          //             {new Date(history?.createdAt!).toLocaleDateString(
          //               'pt-BR',
          //             )}
          //           </td>
          //           <td>{history?.accountable}</td>
          //           <td>{history?.quantity! / 1000}</td>
          //           <td>{history?.observations}</td>
          //           <td>
          //             {(history?.price! / 100)?.toLocaleString('pt-BR', {
          //               maximumFractionDigits: 2,
          //               style: 'currency',
          //               currency: 'BRL',
          //               useGrouping: true,
          //             })}
          //           </td>
          //         </tr>
          //       )
          //     })}
          //   </tbody>
          // </Table>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>
    //         Histórico - {product.product?.name}
    //       </span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
