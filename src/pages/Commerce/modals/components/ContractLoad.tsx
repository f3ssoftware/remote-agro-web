import { useEffect, useState } from "react";
import { Card, Col, Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchContractsData } from "../../../../stores/financial.store";
import { RootState } from "../../../..";
import { asyncFetchOutputWeighingData } from "../../../../stores/commerce.store";
import { WeighingRow } from "../../../../models/WeighingRow";

export function ContractLoad() {
  const dispatch = useDispatch<any>();
  const { financial, commerce, seasons } = useSelector((state: RootState) => state);
  const [outputWeighings, setOutputWeighings] = useState<WeighingRow[]>([]);

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchOutputWeighingData(seasons.selectedSeason.id))
  }, []);

  useEffect(() => {
    setOutputWeighings(commerce?.outputWeighingRows);
  }, [seasons]);

  return <Col xs={8}>
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
              Contratos
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {financial.contracts.map((contract, index) => {
                return <Dropdown.Item
                  key={index}
                  onClick={() => {
                    console.log(contract)
                  }}
                >
                  {contract.name}
                </Dropdown.Item>
              })}

            </Dropdown.Menu>
          </Dropdown>
        </Card.Text>
        <Table striped hover>
          <thead style={{ backgroundColor: '#243C74', color: '#fff', border: 'none' }}>
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
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
            {}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="card-footer">
        <div className="frist-box">
          <span>Valor recebido</span>
        </div>
        <div className="second-box">
          <span>Valor a receber</span>
        </div>
        <div className="second-col-date">
          <span>Data</span>
        </div>
        <div className="second-col-value">
          <span>Valor recebido</span>
        </div>
      </Card.Footer>
    </Card>
  </Col>
}