import { Modal, Button, Row, Col, Form } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";
import { RootState } from "../../../..";
import { UserProduct } from "../../../../models/UserProduct"
import { WithdrawalProduct } from "../components/WithdrawalProduct"

export function SeedsTreatment({ show, handleClose }: { show: boolean, handleClose: any }) {
    const { input } = useSelector((state: RootState) => state);
    // const [product, setProduct] = useState()
    return <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529" }}>
            <Modal.Title> <span style={{ color: '#fff' }}>Retirada de estoque</span></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Semente</Form.Label>
                        <Typeahead
                            onChange={(selected) => {

                            }}
                            options={input.generalProductsList.map(input => { return { id: input.id, label: input?.name } })}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Quantidade de Sementes</Form.Label>
                        <Form.Control type="text" onChange={(e) => {

                        }} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Responsável</Form.Label>
                        <Form.Control type="text" onChange={(e) => {

                        }} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Observações</Form.Label>
                        <Form.Control type="text" onChange={(e) => {

                        }} />
                    </Form.Group>
                </Col>
            </Row>
            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="primary">Adicionar Linha</Button>
                <Button variant="success">Registrar</Button>
            </div> */}
        </Modal.Body>
    </Modal >
}