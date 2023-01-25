import { Card, Col, Dropdown } from "react-bootstrap";

export function ContractLoad(){
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
              <Dropdown.Item href="#/action-1">Contrato1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Contrato2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Contrato3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Text>
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