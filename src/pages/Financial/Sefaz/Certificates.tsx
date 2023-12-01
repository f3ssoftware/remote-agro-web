import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../..";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { asyncFetchCertificates } from "../../../stores/financial.store";
import { CertificateModal } from "./modals/CertificateModal/CertificateModal";


export function Certificates() {

    const dispatch = useDispatch<any>();
    const { financial, loading } = useSelector((state: RootState) => state);
    const [showModalCertificates, setShowModalCertificates] = useState(false);

    useEffect(() => {
        dispatch(asyncFetchCertificates());
    }, []);
    return <div>
        {showModalCertificates ? <CertificateModal show={showModalCertificates} handleClose={() => setShowModalCertificates(false)}></CertificateModal> : <></>}
        <Card className="ra-card">
            <Row>
                <Col md={10}>
                    <h4>Certificados</h4>
                </Col>
                <Col>
                    <Button variant="success" onClick={() => setShowModalCertificates(true)}>Novo Certificado</Button>
                </Col>
            </Row>
            <DataTable  value={financial.certificates} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Nome"></Column>
                <Column field="commercial_name" header="Nome Fantasia"></Column>
                <Column field="city_registration" header="Inscrição Municipal"></Column>
                <Column field="state_registration" header="Inscrição Estadual"></Column>
                <Column field="cnpj" header="CNPJ"></Column>
                <Column field="cpf" header="CPF"></Column>
                <Column field="tax_regime" header="Regime Tarifário"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="phone" header="Telefone"></Column>
                <Column field="street" header="Rua"></Column>
                <Column field="street_number" header="Número"></Column>
                <Column field="neighborhood" header="Bairro"></Column>
                <Column field="zip_code" header="CEP"></Column>
                <Column field="city" header="Município"></Column>
                <Column field="state" header="UF"></Column>
            </DataTable>
        </Card>
    </div>
}