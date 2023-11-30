import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { asyncLinkCertificate } from "../../../../../stores/financial.store";
import { InputText } from "primereact/inputtext";

export function LegalEntityForm() {
    const [name, setName] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [district, setDistrict] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [password, setPassword] = useState('');
    const [taxRegime, setTaxRegime] = useState('');
    const [isIntegrated, setIsIntegrated] = useState(false);
    const [certificateFile, setCertificateFile]: any = useState({});
    const [certificateBase64, setCertificateBase64]: any = useState()
    const [stateRegistration, setStateRegistration] = useState('');
    const [cityRegistration, setCityRegistrtion] = useState('');

    const dispatch = useDispatch<any>();
    const getBase64 = async () => {
        return new Promise(resolve => {
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(certificateFile);

            // on reader load somthing...
            reader.onload = () => {
                setCertificateBase64(reader.result);
                resolve(reader.result);
            };
        });
    };

    const register = async () => {
        const base64Result = await getBase64() as string;
        const data = {
            name: name,
            commercial_name: commercialName,
            neighborhood: district,
            zip_code: Number(zipcode),
            cpf: document,
            email: email,
            state_registration: Number(stateRegistration),
            city_registration: Number(cityRegistration),
            street: street,
            street_number: Number(number),
            phone: phone,
            city: city,
            state: uf,
            has_integration: isIntegrated,
            certificate_file: base64Result.substring(base64Result.indexOf(',') + 1),
            certificate_password: password,
        }
        dispatch(asyncLinkCertificate(data));

    }

    return <div>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={name} onChange={(e) => {
                        setName(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Nome</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
                    <Form.Control type="text" id="name" onChange={(e) => { setName(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={commercialName} onChange={(e) => {
                        setCommercialName(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Nome Fantasia</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Nome Fantasia</Form.Label>
                    <Form.Control type="text" id="name" onChange={(e) => { setCommercialName(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Bairro</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setDistrict(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>CEP</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setZipcode(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Inscrição Estadual</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setStateRegistration(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Inscriçao Municipal</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setCityRegistrtion(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>CNPJ</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setDocument(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Email</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setEmail(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Rua</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setStreet(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Número</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setNumber(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Telefone</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setPhone(e.target.value); }} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Cidade</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setCity(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Estado</Form.Label>
                    <Form.Select aria-label="Pessoa Física ou Jurídica?" onChange={(e) => setUf(e.target.value)}>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Senha do certificado</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setPassword(e.target.value); }} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Regime tributário</Form.Label>
                    <Form.Select aria-label="Regime Tributário" onChange={(e) => setTaxRegime(e.target.value)}>
                        <option value="SIMPLES_NACIONAL">Simples Nacional</option>
                        <option value="SIMPLES_NACIONAL_EXCESSO">Simples Nacional - excesso de sublimite de receita bruta</option>
                        <option value="NORMAL">Regime Normal</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Possui Integração</Form.Label>
                    <Form.Select aria-label="Pessoa Física ou Jurídica?" onChange={(e) => setIsIntegrated(Boolean(e.target.value))}>
                        <option>Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Selecione o certificado</Form.Label>
                    <Form.Control type="file" onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCertificateFile(target?.files![0]);
                    }} />
                </Form.Group>
            </Col>
        </Row>
        <div className="flex-right">
            <Button variant="success" onClick={() => register()}>Registrar</Button>
        </div>
    </div>
}