import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Row, Col, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../..";
import { getMessages } from "../../../stores/messaging.store";

export function Results() {
    const { home } = useSelector((state: RootState) => state);
    return <Card className="ra-card">
        <Card.Body>
            <h4>Resultados</h4>
            <Table striped bordered hover style={{tableLayout: 'fixed'}}>
                <thead style={{ backgroundColor: '#243C74', color: '#fff' }}>
                    <tr>
                        <th>Nome</th>
                        <th>Temporada</th>
                        <th>Ano Agrícola</th>
                        <th>Receita Total</th>
                        <th>Custos Diretos</th>
                        <th>Custos Indiretos</th>
                        <th>Resultados/ha</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                    {home.results.map((result: any) => {
                        return <tr>
                            <td>{result.name}</td>
                            <td>{result.season}</td>
                            <td>{result.year}</td>
                            <td>{result.totalRevenue}</td>
                            <td>{result.directCosts}</td>
                            <td>{result.indirectCosts}</td>
                            <td>{result.resultsPerHa}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
}