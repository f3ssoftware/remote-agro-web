import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
import { asyncFetchCultivations, asyncRegisterContract } from '../../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { Contract } from "../../../../models/Contract";
import { Cultivation } from "../../../../models/Cultivation"
import { Typeahead } from "react-bootstrap-typeahead";
import { asyncEditContract, asyncFetchEditContracts } from "../../../../stores/commerce.store";

export function EditContract({show, handleClose, id}: {show: boolean, handleClose: any, id: number}){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [description,setDescription] = useState('');
    const [bags,setBags] = useState(0);
    const [contractPrice,setContractPrice] = useState(0);
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [payDate,setPayDate] = useState(new Date());
    const [selectedCultivations, setSelectedCultivations]: any = useState({})
    const { financial,seasons, commerce } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<any>()

    const edit = () => {
        const contract: Contract = {
            name: contractName,
            code: contractId.toString(),
            description: description,
            sacks: bags.toString(),
            amount: contractPrice*100,
            cultivation_name: selectedCultivations.name,
            cultivation_id: selectedCultivations.id,
            payment_date: payDate.toISOString(),
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            type: "CONTRACT",
            season_id: seasons.selectedSeason.id
            
        }
        dispatch(asyncEditContract(id, contract));
    }
    useEffect(() => {
        setContractName(commerce.editContracts.name!);
        setContractId(Number(commerce.editContracts.code!))
        setDescription(commerce.editContracts.description!)
        setBags(Number(commerce.editContracts.sacks!))
        setContractPrice(Number(commerce.editContracts.amount!))
        setSelectedCultivations(commerce.editContracts.cultivation_name!)
        if(commerce.editContracts.payment_date && commerce.editContracts.start_date && commerce.editContracts.end_date != null ){
            setPayDate(new Date(commerce.editContracts.payment_date!))
            setStartDate(new Date(commerce.editContracts.start_date!))
            setEndDate(new Date(commerce.editContracts.end_date!))
        }
      }, [commerce])

    useEffect(() => {
        dispatch(asyncFetchCultivations())
        setSelectedCultivations(financial?.cultivations[0])
      }, [])

      
    return <div>
        <Row  style={{marginTop: '2%'}}>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Nome para o contrato</Form.Label>
                        <Form.Control type="text" value= {contractName} onChange={(e) => {setContractName(e.target.value);}} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Codigo do contrato</Form.Label>
                        <Form.Control type="number" value={contractId} onChange={(e) => {setContractId(Number(e.target.value));}} />
                    </Form.Group>
                </Col>
                <Row style={{marginTop: '2%'}}>
                <Col>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
                    <Typeahead
                        id="cultivation"
                        onChange={(selected: any) => {
                            setSelectedCultivations(selected[0]);
                        }}
                        options={financial.cultivations.map((cultivation: Cultivation, index) => { return { id: cultivation.id, label: cultivation?.name } })}
                    />
                </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Sacas Totais</Form.Label>
                        <Form.Control type="number" value={bags.toString()} onChange={(e) => {setBags(Number(e.target.value));}} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ color: '#fff' }}>Valor total do contrato</Form.Label>
                        <Form.Control type="number" value={contractPrice} onChange={(e) => {setContractPrice(Number(e.target.value));}} />
                    </Form.Group>
                </Col>  
                </Row>
                <Row style={{marginTop: '2%'}}>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>Inicio do contrato</Form.Label>
                            <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={startDate} value={startDate.toISOString()} onChange={(date:Date)=> setStartDate(date)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>Fim do contrato</Form.Label>
                            <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={endDate} value={endDate.toISOString()} onChange={(date:Date)=> setEndDate(date)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label style={{ color: '#fff' }}>Data de pagamento</Form.Label>
                            <DatePicker locale={pt} dateFormat='dd/MM/yyyy' selected={payDate} value={payDate.toISOString()} onChange={(date:Date)=> setPayDate(date)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="">  
                            <Form.Label style={{ color: '#fff' }}>Descrição adicional</Form.Label>
                            <Form.Control type="text" value={description} onChange={(e) => {setDescription(e.target.value);}} />
                        </Form.Group>
                    </Col>
                </Row>
        </Row>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => {edit();}}>Editar</Button>
        </div>
    </div>
}