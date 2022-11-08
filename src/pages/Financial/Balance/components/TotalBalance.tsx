import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../..";
import { asyncFetchExpensesInvoicesData } from "../../../../stores/financial.store";
import "../Balance.scss"

export function TotalBalance() {
    const financial = useSelector((state: RootState) => state.financial);
    const dispatch = useDispatch<any>();
    const [totalBalance, setTotalBalance] = useState(0);
    

    useEffect(() => {
        fetchExpensesInvoicesData();
    }, [])

    useEffect(() => {
        let balance = 0;
        financial.bankAccounts.forEach((acc, index) => {
            balance = balance + Number(acc.balance);            
        });
        setTotalBalance(balance);
    }, [financial])

    const fetchExpensesInvoicesData = async () => {
        await dispatch(asyncFetchExpensesInvoicesData());
    }

    return <Card className="ra-card">
        <Card.Body>
            <Card.Title>Saldo Total</Card.Title>
            <div className="flex-center">
                <Button className="total-balance-btn">{`${totalBalance.toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}`}</Button>
            </div>
        </Card.Body>
    </Card>
}