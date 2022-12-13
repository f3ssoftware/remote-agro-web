import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap"
import { InstallmentForm } from "./InstallmentForm"

export function Installments({ installmentsQuantity, onUpdateInstallments, totalAmount }: { installmentsQuantity: number, onUpdateInstallments: any, totalAmount: number }) {
    const [installments, setInstallments]: any = useState([]);
    const onUpdate = (installment: any, index: number) => {
        const newInstallments = [...installments];
        newInstallments.splice(index, 1);
        newInstallments.push(installment);
        setInstallments(newInstallments);
        console.log(installments);
        onUpdateInstallments(installments);
    }
    return <div>
        {new Array(installmentsQuantity).fill('').map((installment, index) => {
            return <Row>
                <Col>
                    <InstallmentForm index={index} onUpdate={onUpdate} initialAmount={totalAmount / installmentsQuantity}></InstallmentForm>
                </Col>
            </Row>
        })}
    </div>

}