import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch } from "react-redux";
import { BankAccountDTO } from "../../../../models/dtos/BankAccountsDTO";
import { asyncCreateBankAccount } from "../../../../stores/financial.store";
import { banks } from '../../../../utils/banks';

export function CreateBankAccount({ handleClose }: { handleClose: any }) {
    const [accountNickname, setAccountNickname] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [bankId, setBankId] = useState('');

    const dispatch = useDispatch<any>();
    useEffect(() => {
        console.log(bankId);
    }, [bankId]);

    const register = () => {
        const bankAccountDTO: BankAccountDTO = {
            bank_id: bankId,
            owner_name: ownerName,
            nickname: accountNickname
        }

        dispatch(asyncCreateBankAccount(bankAccountDTO));
        handleClose();
    }
    return <div>
        <Row style={{ marginTop: '2%' }}>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Apelido para a conta</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setAccountNickname(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome do Proprietário</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setOwnerName(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col md={12}>
                <Form.Group className="mb-3" controlId=""> {/*Apenas pra visualizar, ver se vai ser typeahead*/}
                    <Form.Label style={{ color: '#fff' }}>Selecione o banco</Form.Label>
                    <Typeahead
                        id="bank"
                        onChange={(selected: any) => {
                            if (selected.length > 0) {
                                setBankId(selected[0].id);
                            }
                        }}
                        options={banks.map((bank) => { return { id: bank.COMPE, label: bank?.LongName } })}
                    />
                </Form.Group>
            </Col>
        </Row>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
            <Button variant="success" onClick={() => { register() }}>Enviar</Button>
        </div>
    </div>
}