import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom"
import { RootState } from ".";
import { TopNav } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Commerce } from "./pages/Commerce/Commerce";

import { Financial } from "./pages/Financial/Financial";
import { Home } from "./pages/Home/Home"
import { FarmInput } from "./pages/Input/FarmInput";
import { Login } from "./pages/Login/Login";
import { Plot } from "./pages/Plot/Plot";
import { popMessages } from "./stores/messaging.store";

export function AppWrapper() {
    // const [loading, setLoading] = useState([]);
    const navigate = useNavigate();
    const { loading, messages } = useSelector((state: RootState) => state);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/login" && sessionStorage.getItem('token') === null) {
            navigate("/login");
        }
    }, [location]);

    useEffect(() => {
        console.log(loading);
    }, [loading]);

    switch (location.pathname.split("/")[1]) {
        case "login": return <Login></Login>;
        case "": return <Navigate to={'/home'}></Navigate>
        case "home": return <AppStructure loading={loading.requests.length > 0}>
            <Home></Home>
        </AppStructure>;
        case "plot": return <AppStructure loading={loading.requests.length > 0}>
            <Plot></Plot>
        </AppStructure>;
        case "financial": return <AppStructure loading={loading.requests.length > 0}>
            <Financial></Financial>
        </AppStructure>;
        case "input": return <AppStructure loading={false}>
            <FarmInput></FarmInput>
        </AppStructure>;
        case "commerce": return <AppStructure loading={loading.requests.length > 0}>
            <Commerce></Commerce>
        </AppStructure>;
        default: return <div>403 not found</div>
    }
}

function AppStructure({ children, loading }: { children: JSX.Element, loading: boolean }) {
    const { messages } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    const [showMessages, setShowMessages] = useState(false);
    useEffect(() => {
        messages.messages.length > 0 ? setShowMessages(true) : setShowMessages(false);
    }, [messages]);

    return <Row>
        <Col lg={2} md={2}>
            <Sidebar></Sidebar>
        </Col>
        <Col lg={10} md={10}>
            <Row>
                <Col lg={12} md={12}>
                    <TopNav></TopNav>
                </Col>
            </Row>
            <Row>
                {!loading ? <Col lg={12} md={12}>
                    {children}
                </Col> : <Loading></Loading>}

            </Row>
        </Col>
        {messages.messages.map((m, index) => {
            return <Modal show={showMessages} onHide={() => { setShowMessages(false); dispatch(popMessages('')) }} key={index}>
                <Modal.Header closeButton style={{ backgroundColor: '#ECE4B4' }}>
                    <Modal.Title>{m.type === 'success' ? 'Sucesso' : 'Erro'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#ECE4B4' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <FontAwesomeIcon icon={m.type === 'success' ? faCircleCheck : faCircleXmark} style={{
                            fontSize: 100,
                            color: (m.type === 'success' ? '#A5CD33' : '#bb5252')
                        }}></FontAwesomeIcon>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: (m.type === 'success' ? '#A5CD33' : '#bb5252'), fontSize: 20, marginBottom: '50%' }}>{m.message}</span>
                            <Button variant="primary" style={{ backgroundColor: (m.type === 'success' ? '#A5CD33' : '#bb5252'), border: 'none' }} onClick={() => { setShowMessages(false); dispatch(popMessages('')) }}>
                                Ok
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#ECE4B4' }}>

                </Modal.Footer>
            </Modal>
        })}
    </Row >
}

function Loading() {
    return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>)
}