import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap"
import { InstallmentForm } from "./InstallmentForm"

export function Installments({ installmentsQuantity, onUpdateInstallments, totalAmount }: { installmentsQuantity: number, onUpdateInstallments: any, totalAmount: number }) {
    const [installments, setInstallments]: any = useState([]);
    const onUpdate = (installment: any, index: number) => {
        const newInstallments = [...installments];
        newInstallments[index] = installment;
        setInstallments(newInstallments);
        onUpdateInstallments(newInstallments);
    }

    useEffect(() => {
        setInstallments([]);
        // const installmentsArr = new Array(installmentsQuantity).fill({
        //     amount: totalAmount / installmentsQuantity,
        //     due_date: null
        // });
        let installmentsArr = [];
        for (let i = 0; i < installmentsQuantity; i++) {
            installmentsArr.push({
                amount: totalAmount / installmentsQuantity,
                due_date: new Date(new Date().getFullYear(), new Date().getMonth() + i, new Date().getDate())
            });
        }
        setInstallments(installmentsArr);
    }, [installmentsQuantity, totalAmount]);

    return <div>
        {installments.map((installment: any, index: any) => {
            return <Row>
                <Col>
                    <InstallmentForm index={index} onUpdate={onUpdate} initialAmount={totalAmount / installmentsQuantity}></InstallmentForm>
                </Col>
            </Row>
        })}
    </div>

}