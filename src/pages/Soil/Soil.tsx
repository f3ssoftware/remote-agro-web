import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { asyncFetchSoil } from '../../stores/soil.store'
import { TransactionDates } from '../Financial/Balance/modals/TransactionDates'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export function Soil() {
  const [showModalDates, setShowModalDates] = useState(false)
  const [startDate, setStartDate] = useState(
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth()),
  )
  const [endDate, setEndDate] = useState(
    new Date(new Date().getUTCFullYear(), new Date().getUTCMonth()),
  )
  const [findSoil, setFindSoil] = useState('')
  const { soil } = useSelector((state: RootState) => state)
  const initialSoilAnalysis: any[] = []
  const [soilAnalysis, setSoilAnalysis] = useState(initialSoilAnalysis)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(asyncFetchSoil())
  }, [])

  useEffect(() => {
    setSoilAnalysis(soil.soilAnalysis)
  }, [soil])

  useEffect(() => {
    find()
  }, [findSoil])

  useEffect(() => {
    dispatch(asyncFetchSoil)
  }, [startDate, endDate])

  const find = () => {
    const found = soil.soilAnalysis?.filter((soilAnalysis: any) => {
      const a = soilAnalysis.service_order_farms.filter((sf: any, index: number) => {
        if (sf.farm_name.toUpperCase().includes(findSoil.toUpperCase())) {
          return sf
        }
      });
      if (a.length > 0) {
        return soilAnalysis;
      } else {
        return null;
      }
    })
    setSoilAnalysis(found);
    // console.log(found);
  }

  return (
    <div style={{ marginTop: '2%' }}>
      <Card className="ra-card">
        <Card.Body>
          <Row>
            <Col>
              <h4>Análises de solo</h4>
            </Col>
            <Col>
              <Button variant='success' onClick={() => window.open("https://wa.me/5564992928067?text=Ol%C3%A1%21+Gostaria+de+solicitar+um+or%C3%A7amento+de+an%C3%A1lises+de+solo", "_blank")}>Solicite já sua amostra</Button>
            </Col>
            <Col>
              <Form>
                <Form.Control
                  type="text"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#4F9D24',
                    borderRadius: '100px',
                  }}
                  placeholder="Pesquisar"
                  onChange={(e) => {
                    setFindSoil(e.target.value)
                  }}
                ></Form.Control>
              </Form>
            </Col>
          </Row>
          <div
            className="flex-right"
            style={{ marginTop: '2%', marginBottom: '2%' }}
          >
            <FontAwesomeIcon
              icon={faCalendar}
              onClick={() => setShowModalDates(true)}
              style={{ cursor: 'pointer' }}
            ></FontAwesomeIcon>
          </div>
          <div
            style={{
              overflowX: 'hidden',
              overflowY: 'scroll',
              maxHeight: '300px',
            }}
          >
            <DataTable
              value={soilAnalysis}
              className="p-datatable-striped p-datatable-hover"
              style={{ backgroundColor: '#fff', color: '#000', fontSize: '12px' }}
            >
              <Column
                field="date"
                header="Data"
                body={(rowData) => new Date(rowData?.date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              ></Column>
              <Column
                header="Fazenda"
                body={(rowData) => rowData?.service_order_farms.map((sf: any) => sf.farm_name).join(', ')}
              ></Column>
              <Column
                header="Talhões"
                body={(rowData) => rowData?.service_order_fields.map((field: any) => field.manual_field_name).join(', ')}
              ></Column>
              <Column
                field="operator"
                header="Operador"
                body={(rowData) => rowData?.operator?.name}
              ></Column>
              <Column
                header="Armostragem"
                body={(rowData) =>
                  rowData?.service_order_sampling_methods.map((method: any) => method.sampling_method).join(', ')
                }
              ></Column>
              <Column
                field="laboratory"
                header="Laboratório"
                body={(rowData) => rowData?.laboratory?.name}
              ></Column>
              <Column header="Mapa de fertilidade"></Column>
              <Column header="Mapa de aplicação"></Column>
            </DataTable>
            {/* <Table striped bordered hover>
              <thead
                style={{
                  backgroundColor: '#243C74',
                  color: '#fff',
                  fontSize: '12px',
                }}
              >
                <tr>
                  <th>Data</th>
                  <th>Fazenda</th>
                  <th>Talhões</th>
                  <th>Operador</th>
                  <th>Armostragem</th>
                  <th>Laboratório</th>
                  <th>Mapa de fertilidade</th>
                  <th>Mapa de aplicação</th>
                </tr>
              </thead>
              <tbody
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: '12px',
                }}
              >
                {soilAnalysis.map((soilAnalysis, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {new Date(soilAnalysis.date!).toLocaleDateString(
                          'pt-BR',
                          { timeZone: 'UTC' },
                        )}
                      </td>
                      <td>
                        {soilAnalysis?.service_order_farms?.map(
                          (sf: any) => `${sf.farm_name}, `,
                        )}
                      </td>
                      <td>{soilAnalysis?.service_order_fields?.map((field: any) => {
                        return field.manual_field_name
                      })}</td>
                      <td>{soilAnalysis?.operator?.name}</td>
                      <td>{soilAnalysis?.service_order_sampling_methods?.map((method: any) => `${method.sampling_method}, `)}</td>
                      <td>{soilAnalysis?.laboratory?.name}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table> */}
          </div>
        </Card.Body>
      </Card>
      <TransactionDates
        show={showModalDates}
        handleClose={() => setShowModalDates(false)}
        onUpdate={(startDate: any, endDate: any) => {
          setStartDate(startDate)
          setEndDate(endDate)
          setShowModalDates(false)
        }}
      ></TransactionDates>
    </div>
  )
}
