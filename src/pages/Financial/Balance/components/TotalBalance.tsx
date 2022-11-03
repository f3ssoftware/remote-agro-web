import { useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../..";
import { asyncFetchExpensesInvoicesData } from "../../../../stores/financial.store";
import "../Balance.scss"

export function TotalBalance() {
    const financial = useSelector((state: RootState) => state.financial);
    const dispatch = useDispatch<any>();
    

    useEffect(() => {
        fetchExpensesInvoicesData();
    }, [])

    const fetchExpensesInvoicesData = async () => {
        await dispatch(asyncFetchExpensesInvoicesData());
    }

    return <Card className="ra-card">
        <Card.Body>
            <Card.Title>Saldo Total</Card.Title>
            <div className="flex-center">
                <Button className="total-balance-btn">{`R$ ?`}</Button>
            </div>
        </Card.Body>
    </Card>
}