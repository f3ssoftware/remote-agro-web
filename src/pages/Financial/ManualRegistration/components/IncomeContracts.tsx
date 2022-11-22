import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt-BR";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchCultivations, asyncRegisterContract } from "../../../../stores/financial.store";
import { RootState } from "../../../..";
import { Cultivation } from "../../../../models/Cultivation";
import { Contract } from "../../../../models/Contract";
import { start } from "repl";
import { Typeahead } from "react-bootstrap-typeahead";


export function IncomeContracts() {
    const { financial } = useSelector((state: RootState) => state);
    const [contractName, setContractName] = useState('');
    const [contractId, setContractId] = useState(0);
    const [totalBags, setTotalBags] = useState(0);
    const [contractValue, setContractValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [payDate, setPayDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [cultivation, setCultivation] = useState(new Cultivation());
    const dispatch = useDispatch<any>();

    const register = () => {
        const contract: Contract = {
            amount: contractValue,
            code: contractId.toString(),
            cultivation_id: cultivation.id,
            cultivation_name: cultivation.name,
            description,
            end_date: new Date().toISOString(),
            start_date: startDate.toISOString(),
            name: contractName,
            payment_date: payDate.toISOString(),
        }

        dispatch(asyncRegisterContract(contract));
    }
    useEffect(() => {
        dispatch(asyncFetchCultivations());
    }, []);

    useEffect(() => {
        console.log(cultivation);
    }, [contractName, contractId, totalBags, contractValue, startDate, payDate, description, cultivation]);



    return <div>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => { return setContractName(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Código</Form.Label>
                    <Form.Control type="number" onChange={(e) => { return setContractId(Number(e.target.value)); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Cultivo</Form.Label>
                    <Typeahead
                        id="cultivation"
                        onChange={(selected: any) => {
                            setCultivation(selected[0]);
                        }}
                        options={financial.cultivations.map((cultivation: Cultivation, index) => { return { id: cultivation.id, label: cultivation?.name } })}
                    />
                    {/* <Form.Select aria-label="" onChange={(e) => { setCultivation(e.target.value) }}>
                            {financial.cultivations.map((cultivation: any, index) => {
                                return <option value={cultivation} key={index}>{cultivation.name}</option>
                            })}
                        </Form.Select> */}
                </Form.Group>
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Sacas totais</Form.Label>
                    <Form.Control type="number" onChange={(e) => { return setTotalBags(Number(e.target.value)); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Valor total do contrato</Form.Label>
                    <Form.Control type="text" onBlur={(e) => {
                        if (isNaN(Number(e.currentTarget.value))) {
                            e.currentTarget.value = '';
                        } else {
                            setContractValue(Number(e.target.value))
                            e.currentTarget.value = Number(e.currentTarget.value).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })
                        }
                    }} onKeyUp={(e) => {
                        if (e.key === 'Backspace') {
                            e.currentTarget.value = '';
                        }
                    }} />
                </Form.Group>
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Inicio do contrato</Form.Label>
                    <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Data de pagamento</Form.Label>
                    <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={payDate} onChange={(date: Date) => setPayDate(date)} />
                </Form.Group>
            </Col>
        </Row>
        <Row style={{ marginTop: '2%' }}>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label >Descrição adicional</Form.Label>
                    <Form.Control type="text" onChange={(e) => { return setDescription(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <div className="flex-right">
            <Button variant="success" onClick={() => register()}>Registrar</Button>
        </div>
    </div>
}