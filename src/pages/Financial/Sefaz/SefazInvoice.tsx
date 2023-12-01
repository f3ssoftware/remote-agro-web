import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { ExternalInvoice } from "../../../models/ExternalInvoice";
import financialStore, { asyncFetchSefaz } from "../../../stores/financial.store";
import { CertificateModal } from "./modals/CertificateModal/CertificateModal";
import { LaunchModal } from "./modals/LauchModal";
import "./SefazInvoice.scss";
import { useNavigate } from "react-router-dom";

const initialExternalInvoices: ExternalInvoice[] = [];
export function SefazInvoice() {
    const { financial } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    const [externalInvoices, setExternalInvoices] = useState(initialExternalInvoices);
    const [showModalLaunch, setShowModalLaunch] = useState(false);
    const [reference, setReference] = useState('');
    const [amount, setAmount] = useState(0);
    const [number, setNumber] = useState('');
    const [showModalCertificates, setShowModalCertificates] = useState(false);
    const [externalInvoiceId, setExternalInvoiceId] = useState(0);
    const [findTerm, setFindTerm] = useState('');
    const navigate = useNavigate();

    const find = () =>{
        setExternalInvoices(financial?.externalInvoices?.filter((ref: ExternalInvoice) =>{
            if(ref!.issuer_name!.toUpperCase().includes(findTerm.toUpperCase())){
                return ref;
            }
            return null;
        }))
    }

    useEffect(() =>{
        find();
    }, [findTerm])

    useEffect(() => {
        dispatch(asyncFetchSefaz());
    }, []);

    useEffect(() => {
        const newExternalInv = [...financial.externalInvoices];
        newExternalInv.sort((ext1: ExternalInvoice, ext2: ExternalInvoice) => {
            if (new Date(ext1.issued_date!) > new Date(ext2.issued_date!)) {
                return -1;
            }
            if (new Date(ext1.issued_date!) < new Date(ext2.issued_date!)) {
                return 1;
            }
            return 0;
        })
        setExternalInvoices(newExternalInv);
    }, [financial]);


    const fillSefaz = (ext: ExternalInvoice) => {
        setReference(ext.issuer_name!);
        setAmount(Number(ext.total_value)!);
        setNumber(ext.nfe_key!);
        setExternalInvoiceId(ext.id!);
    }
    return <div>
        <Card className="ra-card">
            <Row>
                <Col md={8}>
                    <h4>Notas Sefaz</h4>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => navigate('financial/certificates')}>Certificados</Button>
                </Col>
                <Col md={6} sm={5} style={{marginBottom: '2%'}}>
                            <Form>
                                <Form.Control type="text" style={{ backgroundColor: "transparent", borderColor: '#4F9D24', borderRadius: '100px' }} placeholder="Pesquisar" onChange={(e) => setFindTerm(e.target.value)}></Form.Control>
                            </Form>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead style={{ backgroundColor: '#243C74', color: '#fff', fontSize: '12px' }}>
                    <tr>
                        <th>Data</th>
                        <th>Referência</th>
                        <th>Responsável</th>
                        <th>NF</th>
                        <th>Valor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: '#fff', color: '#000', fontSize: '12px' }}>
                    {externalInvoices.filter(ext => ext.status === 'autorizada').map((extInv, index) => {
                        return <tr key={index}>
                            <td>{new Date(extInv?.issued_date!).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                            <td>{extInv.issuer_name}</td>
                            <td>{extInv?.entity?.name}</td>
                            <td>{extInv.nfe_key!.slice(28, 33)}</td>
                            <td>{Number(extInv.total_value)!.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</td>
                            <td><Button className="launch-btn" disabled={extInv.expenses_invoice_id !== null} variant="success" onClick={() => {
                                setShowModalLaunch(true);
                                fillSefaz(extInv);
                            }}>{extInv.expenses_invoice_id === null ? 'Lançar' : 'Lançada'}</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Card>

        {showModalLaunch ? <LaunchModal show={showModalLaunch} handleClose={() => setShowModalLaunch(false)} sefaz={{ reference, amount, number: number.slice(28, 34), externalInvoiceId: externalInvoiceId }}></LaunchModal> : <></>}
        {showModalCertificates ? <CertificateModal show={showModalCertificates} handleClose={() => setShowModalCertificates(false)}></CertificateModal> : <></>}
    </div>
}