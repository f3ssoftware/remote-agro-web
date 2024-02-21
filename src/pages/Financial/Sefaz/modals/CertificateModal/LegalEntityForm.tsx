import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { asyncLinkCertificate } from "../../../../../stores/financial.store";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

export function LegalEntityForm() {
    const [name, setName] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [district, setDistrict] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState<number>();
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
    const states = [
        { value: "AC", name: "Acre" },
        { value: "AL", name: "Alagoas" },
        { value: "AP", name: "Amapá" },
        { value: "AM", name: "Amazonas" },
        { value: "BA", name: "Bahia" },
        { value: "CE", name: "Ceará" },
        { value: "DF", name: "Distrito Federal" },
        { value: "ES", name: "Espírito Santo" },
        { value: "GO", name: "Goiás" },
        { value: "MA", name: "Maranhão" },
        { value: "MT", name: "Mato Grosso" },
        { value: "MS", name: "Mato Grosso do Sul" },
        { value: "MG", name: "Minas Gerais" },
        { value: "PA", name: "Pará" },
        { value: "PB", name: "Paraíba" },
        { value: "PR", name: "Paraná" },
        { value: "PE", name: "Pernambuco" },
        { value: "PI", name: "Piauí" },
        { value: "RJ", name: "Rio de Janeiro" },
        { value: "RN", name: "Rio Grande do Norte" },
        { value: "RS", name: "Rio Grande do Sul" },
        { value: "RO", name: "Rondônia" },
        { value: "RR", name: "Roraima" },
        { value: "SC", name: "Santa Catarina" },
        { value: "SP", name: "São Paulo" },
        { value: "SE", name: "Sergipe" },
        { value: "TO", name: "Tocantins" }
    ];

    const taxRegimeOptions = [
        { value: "SIMPLES_NACIONAL", name: "Simples Nacional" },
        { value: "SIMPLES_NACIONAL_EXCESSO", name: "Simples Nacional - excesso de sublimite de receita bruta" },
        { value: "NORMAL", name: "Regime Normal" }
    ];


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
                <span className="p-float-label">
                    <InputText value={district} onChange={(e) => {
                        setDistrict(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Bairro</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Bairro</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setDistrict(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputMask value={zipcode} onChange={(e) => setZipcode(e.value!)} mask="99999-999" placeholder="99-999999" style={{ width: '100%' }} />
                    <label htmlFor="zipcode">CEP</label>
                </span>
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={stateRegistration} onChange={(e) => {
                        setStateRegistration(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Inscrição Estadual</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Inscrição Estadual</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setStateRegistration(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={cityRegistration} onChange={(e) => {
                        setCityRegistrtion(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Inscrição Estadual</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Inscriçao Municipal</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setCityRegistrtion(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={document} onChange={(e) => {
                        setDocument(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">CNPJ</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>CNPJ</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setDocument(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={email} onChange={(e) => {
                        setEmail(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Email</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Email</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setEmail(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={street} onChange={(e) => {
                        setStreet(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Rua</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Rua</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setStreet(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputNumber value={number} onChange={(e) => {
                        setNumber(e.value!);
                    }} style={{ width: '100%' }}></InputNumber>
                    <label htmlFor="number">Número</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Número</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setNumber(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <InputText value={phone} onChange={(e) => {
                        setPhone(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="number">Telefone</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Telefone</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setPhone(e.target.value); }} />
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={city} onChange={(e) => {
                        setCity(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="number">Cidade</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Cidade</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setCity(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <Dropdown value={uf} onChange={(e) => setUf(e.value)} options={states} optionLabel="name"
                        optionValue="value" style={{ width: '100%' }} />
                    <label htmlFor="city">Estado</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
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
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <InputText value={password} onChange={(e) => {
                        setPassword(e.target.value!);
                    }} style={{ width: '100%' }}></InputText>
                    <label htmlFor="city">Senha do certificado</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Senha do certificado</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setPassword(e.target.value); }} />
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <span className="p-float-label">
                    <Dropdown value={taxRegime} onChange={(e) => setTaxRegime(e.value)} options={taxRegimeOptions} optionLabel="name"
                        optionValue="value" style={{ width: '100%' }} />
                    <label htmlFor="city">Regime Tributário</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Regime tributário</Form.Label>
                    <Form.Select aria-label="Regime Tributário" onChange={(e) => setTaxRegime(e.target.value)}>
                        <option value="SIMPLES_NACIONAL">Simples Nacional</option>
                        <option value="SIMPLES_NACIONAL_EXCESSO">Simples Nacional - excesso de sublimite de receita bruta</option>
                        <option value="NORMAL">Regime Normal</option>
                    </Form.Select>
                </Form.Group> */}
            </Col>
            <Col>
                <span className="p-float-label">
                    <Dropdown value={isIntegrated} onChange={(e) => setIsIntegrated(e.value)} options={[{ name: 'Sim', value: true }, { name: 'Não', value: false }]} optionLabel="name"
                        optionValue="value" style={{ width: '100%' }} />
                    <label htmlFor="city">Possui Integração?</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>Possui Integração</Form.Label>
                    <Form.Select aria-label="Pessoa Física ou Jurídica?" onChange={(e) => setIsIntegrated(Boolean(e.target.value))}>
                        <option>Selecione uma opção</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </Form.Select>
                </Form.Group> */}
            </Col>
        </Row>
        <Row>
            <Col>
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="*" maxFileSize={1000000} onUpload={(e) => {
                    setCertificateFile(e.files[0]);
                }} />
                {/* <Form.Group className="mb-3">
                    <Form.Label>Selecione o certificado</Form.Label>
                    <Form.Control type="file" onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCertificateFile(target?.files![0]);
                    }} />
                </Form.Group> */}
            </Col>
        </Row>
        <div className="flex-right">
            <Button variant="success" onClick={() => register()}>Registrar</Button>
        </div>
    </div>
}