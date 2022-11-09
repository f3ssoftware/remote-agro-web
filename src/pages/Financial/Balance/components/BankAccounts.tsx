import { useEffect, useState } from "react";
import { Card, Row, Col, Pagination, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { BankAccount } from "../../../../models/BankAccount";
import { asyncFetchBankAccountsData } from "../../../../stores/financial.store";
import { CreateBankAccountModal } from "../modals/CreateBankAccountModal";
import "./BankAccounts.scss";

const initialBankAccountsList: BankAccount[] = [];
export function BankAccounts() {
    const dispatch = useDispatch<any>();
    const { financial } = useSelector((state: RootState) => state);
    const [bankAccounts, setBankAccounts] = useState(initialBankAccountsList);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [showBalanceModal, setShowBalanceModal] = useState(false);

    useEffect(() => {
        dispatch(asyncFetchBankAccountsData());
    }, [])

    useEffect(() => {
        paginate(page);
        setTotalResults(financial.bankAccounts.length);
        setPageSize(2);
    }, [financial]);


    const paginate = (page: number) => {
        const pageSize = 2;
        setBankAccounts([...financial.bankAccounts].slice((page - 1) * pageSize, page * pageSize));
    }
    return <div style={{ marginTop: '2%' }}>
        <Card className="ra-card">
            <Card.Body>
                <Card.Title>Contas bancárias</Card.Title>|
                <Button className="bankBtn" variant="success" onClick={() => setShowBalanceModal(true)}>+</Button>
                <div className="bank-accounts-content">
                    {bankAccounts.map((account, index) => <div className="bank-account-card" key={index}>
                        <Row>
                            <Col>
                                <b>{account.nickname}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Prorietário: {account.owner_name}
                            </Col>
                        </Row>
                        <div className="flex-right">
                            <h5 style={{ color: (Number(account.balance)) > 0 ? '#4C9626' : '#911414' }}>{Number(account.balance).toLocaleString('pt-BR', { maximumFractionDigits: 2, style: 'currency', currency: 'BRL', useGrouping: true })}</h5>
                        </div>
                    </div>)}
                </div>
                <div className="flex-center" style={{marginTop: '10%'}}>
                    <Pagination size="sm" >
                        <Pagination.Prev onClick={() => {
                            if (page > 1) {
                                paginate(page - 1);
                                setPage(page - 1);
                            }
                        }} />
                        <Pagination.Next onClick={() => {
                            if (page < (totalResults / pageSize)) {
                                console.log((totalResults / pageSize));
                                paginate(page + 1);
                                setPage(page + 1);
                            } else {
                                console.log('else: ', totalResults / pageSize);
                            }
                        }} />
                    </Pagination>
                </div>

            </Card.Body>
        </Card>
        <CreateBankAccountModal show={showBalanceModal} handleClose={() => setShowBalanceModal(false)}></CreateBankAccountModal>
    </div>
}