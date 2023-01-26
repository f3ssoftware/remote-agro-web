import { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { Silo } from "../../../../models/Silo";
import { asyncCreateCommercePlot } from "../../../../stores/commerce.store";



export function NewCommercePlot({}){
    const [siloName,setSiloName] = useState('');
    const [description,setDescription] = useState('');
    const dispatch = useDispatch<any>()



    const register = () => {
        const silo: Silo = {
            name: siloName,
            description: description
        }
        dispatch(asyncCreateCommercePlot(silo))
    }

    return <Row style={{marginTop: '2%'}}>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome para o silo</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setSiloName(e.target.value);}} />
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Descrição adicional</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setDescription(e.target.value);}} />
                </Form.Group>
            </Col>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => {register();}}>Enviar</Button>
            </div>
    </Row>
}