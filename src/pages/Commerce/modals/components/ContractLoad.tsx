import { useEffect, useState } from 'react'
import { Card, Col, Dropdown, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  asyncFetchContractsData,
  asyncFetchExpensesInvoicesData,
} from '../../../../stores/financial.store'
import { RootState } from '../../../..'
import { asyncFetchOutputWeighingData } from '../../../../stores/commerce.store'
import { WeighingRow } from '../../../../models/WeighingRow'
import { tr } from 'date-fns/locale'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function ContractLoad() {
  const dispatch = useDispatch<any>()
  const { financial, commerce, seasons } = useSelector(
    (state: RootState) => state,
  )
  const initialSelectedContract =
    financial && financial.contracts && financial.contracts.length >= 2
      ? financial.contracts[1]
      : null
  const [outputWeighings, setOutputWeighings] = useState<WeighingRow[]>([])
  const [selectedContract, setSelectedContract] = useState<any>(
    initialSelectedContract,
  )
  const [startDate, setStartDate] = useState(
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1),
  )
  const [endDate, setEndDate] = useState(
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0),
  )

  useEffect(() => {
    dispatch(
      asyncFetchExpensesInvoicesData(
        startDate.toLocaleDateString('pt-BR'),
        endDate.toLocaleDateString('pt-BR'),
      ),
    )
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchOutputWeighingData(seasons.selectedSeason.id))
  }, [])

  useEffect(() => {
    setOutputWeighings(commerce?.outputWeighingRows)
  }, [seasons])

  return (
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
                {selectedContract?.code} - {selectedContract?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {financial.contracts.map((contract, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        setSelectedContract(contract)
                      }}
                    >
                      {contract?.code} - {contract?.name}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Text>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <DataTable
              value={selectedContract ? [selectedContract] : []}
              className="p-datatable-striped p-datatable-hover"
              style={{ backgroundColor: '#fff', color: '#000' }}
            >
              <Column field="code" header="Código"></Column>
              <Column field="name" header="Nome"></Column>
              <Column field="cultivation_name" header="Cultura"></Column>
              <Column
                field="start_date"
                header="Início"
                body={(rowData) =>
                  new Date(rowData.start_date).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })
                }
              ></Column>
              <Column
                field="end_date"
                header="Final"
                body={(rowData) =>
                  new Date(rowData.end_date).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })
                }
              ></Column>
              <Column
                field="payment_date"
                header="Pagamento"
                body={(rowData) =>
                  new Date(rowData.payment_date).toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                  })
                }
              ></Column>
              <Column
                field="amount"
                header="Valor do contrato"
                body={(rowData) =>
                  (rowData.amount / 100).toLocaleString('pt-BR', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                    useGrouping: true,
                  })
                }
              ></Column>
              <Column field="sacks" header="Sacas negociadas"></Column>
              <Column
                field="sacks_delivered"
                header="Sacas entregues"
                body={(rowData) => rowData.sacks_delivered / 1000}
              ></Column>
              <Column field="missing_sacks" header="Sacas faltantes"></Column>
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
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Cultura</th>
                  <th>Início</th>
                  <th>Final</th>
                  <th>Pagamento</th>
                  <th>Valor do contrato</th>
                  <th>Sacas negociadas</th>
                  <th>Sacas entregues</th>
                  <th>Sacas faltantes</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                {selectedContract ? (
                  <tr>
                    <td>{selectedContract?.code}</td>
                    <td>{selectedContract?.name}</td>
                    <td>{selectedContract?.cultivation_name}</td>
                    <td>
                      {new Date(
                        selectedContract?.start_date!,
                      )?.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td>
                      {new Date(selectedContract?.end_date!).toLocaleDateString(
                        'pt-BR',
                        { timeZone: 'UTC' },
                      )}
                    </td>
                    <td>
                      {new Date(
                        selectedContract?.payment_date!,
                      ).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td>
                      {(selectedContract?.amount / 100).toLocaleString(
                        'pt-BR',
                        {
                          maximumFractionDigits: 2,
                          style: 'currency',
                          currency: 'BRL',
                          useGrouping: true,
                        },
                      )}
                    </td>
                    <td>{selectedContract?.sacks}</td>
                    <td>{selectedContract?.sacks_delivered / 1000}</td>
                    <td>{selectedContract?.missing_sacks}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </Table> */}
          </div>
        </Card.Body>
        {/* <Card.Footer className="card-footer">
        <Col md={2}>
          <Card onClick={async () => {
            // dispatch(setCardActive('received'));
            // setActiveCard('received');
            // dispatch(asyncFilterByButton('received', financial.filterDates.startDate, financial.filterDates.endDate));
          }}>
            <Card.Body>
              <h6>Valor recebido</h6>
              <Row>
                <Col>
                  <h6>{financial?.expensesInvoiceData?.paidContractsData?.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Card.Footer> */}
      </Card>
    </Col>
  )
}
