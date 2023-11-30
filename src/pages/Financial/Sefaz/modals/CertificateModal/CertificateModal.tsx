import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { ManualRegistration } from "../../../ManualRegistration/ManualRegistration";
import { LegalEntityForm } from "./LegalEntityForm";
import { PersonForm } from "./PersonForm";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";

export function CertificateModal({ show, handleClose }: { show: boolean, handleClose: any }) {
    const [personType, setPersonType] = useState('PF');

    useEffect(() => {
        console.log(personType);
    }, [personType])
    return <Dialog headerStyle={{ backgroundColor: '#7C5529', color: '#FFF' }} contentStyle={{ backgroundColor: '#7C5529' }} header="Certificado" visible={show} style={{ width: '50vw' }} onHide={() => handleClose()}>
        <span className="p-float-label">
            <Dropdown
                value={personType}
                onChange={(e) => {
                    setPersonType(e.value);
                }}
                optionLabel="label"
                optionValue="value"
                options={[{ value: 'PF', label: 'Pessoa Física' }, { value: 'PJ', label: 'Pessoa Jurídica' }]}
                style={{ width: '100%' }}
            />
            <label htmlFor="seedQuantity">Pessoa Física ou Jurídica?</label>
        </span>
        {/* <Form.Label style={{ color: '#fff' }}>Pessoa Física ou Jurídica?</Form.Label>
            <Form.Select aria-label="Pessoa Física ou Jurídica?" onChange={(e) => setPersonType(e.target.value)}>
                <option value="PF">Pessoa Física</option>
                <option value="PJ">Pessoa Jurídica</option>
            </Form.Select> */}
        {personType === 'PF' ? <PersonForm></PersonForm> : <LegalEntityForm></LegalEntityForm>}
    </Dialog>
    // return <Modal backdrop={'static'} show={show} onHide={handleClose} size={'lg'}>
    //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
    //         <Modal.Title> <span style={{ color: '#fff' }}>Vincular Certificado</span></Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
    //         <span className="p-float-label">
    //             <Dropdown
    //                 value={personType}
    //                 onChange={(e) => {
    //                     setPersonType(e.value);
    //                 }}
    //                 optionLabel="label"
    //                 optionValue="value"
    //                 options={[{ value: 'PF', label: 'Pessoa Física' }, { value: 'PJ', label: 'Pessoa Jurídica' }]}
    //                 style={{ width: '100%' }}
    //             />
    //             <label htmlFor="seedQuantity">Pessoa Física ou Jurídica?</label>
    //         </span>
    //         {/* <Form.Label style={{ color: '#fff' }}>Pessoa Física ou Jurídica?</Form.Label>
    //         <Form.Select aria-label="Pessoa Física ou Jurídica?" onChange={(e) => setPersonType(e.target.value)}>
    //             <option value="PF">Pessoa Física</option>
    //             <option value="PJ">Pessoa Jurídica</option>
    //         </Form.Select> */}
    //         {personType === 'PF' ? <PersonForm></PersonForm> : <LegalEntityForm></LegalEntityForm>}
    //     </Modal.Body>
    // </Modal >
}