import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { Product } from "../../../../models/Product";
import { asyncFetchExpensesAndRevenues } from "../../../../stores/financial.store";
import { currencyFormat } from "../../../../utils/currencyFormat";

export function Transactions() {
    const { financial } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchExpensesAndRevenues(1, 300, '01/11/2022', '30/11/2022'));
    }, []);
    return <div style={{ marginTop: '2%' }}>
        <Card className="ra-card">
            <Card.Body>
                <Card.Title>Transações</Card.Title>
                <div>
                    <Table striped bordered hover>
                        <thead style={{ backgroundColor: '#243C74', color: '#fff' }}>
                            <tr>
                                <th>Data</th>
                                <th>Fornecedor/Cliente</th>
                                <th>Valor</th>
                                <th>NF</th>
                                <th>Categoria</th>
                                <th>Obs</th>
                                <th>Pago</th>
                                <th>Conciliado</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#fff', color: '#000' }}>
                            {financial?.expensesRevenue?.map(er => {
                                return <tr>
                                    <td>{`${new Date(er.payment_date!)?.getDay()!}/${new Date(er.payment_date!).getMonth()! + 1}/${new Date(er.payment_date!).getFullYear()!}`}</td>
                                    <td>{er.reference}</td>
                                    <td>{er.amount}</td>
                                    <td>{er.number}</td>
                                    <td>{er.cost_type}</td>
                                    <td>{er.observations}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    </div>
}