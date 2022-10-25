import { useEffect, useState } from "react"
import { Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from ".";
import { TopNav } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Commerce } from "./pages/Commerce/Commerce";
import { Financial } from "./pages/Financial/Financial";
import { Home } from "./pages/Home/Home"
import { FarmInput } from "./pages/Input/FarmInput";
import { Login } from "./pages/Login/Login";
import { Plot } from "./pages/Plot/Plot";

export function AppWrapper() {
    // const [loading, setLoading] = useState([]);

    const loading = useSelector((state: RootState) => state.loading);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    switch (location.pathname) {
        case "/login": return <Login></Login>;
        case "/": return <Navigate to={'/home'}></Navigate>
        case "/home": return <AppStructure loading={loading.requests.length > 0}>
            <Home></Home>
        </AppStructure>;
        case "/plot": return <AppStructure loading={loading.requests.length > 0}>
            <Plot></Plot>
        </AppStructure>;
        case "/financial": return <AppStructure loading={loading.requests.length > 0}>
            <Financial></Financial>
        </AppStructure>;
        case "/input": return <AppStructure loading={loading.requests.length > 0}>
            <FarmInput></FarmInput>
        </AppStructure>;
        case "/commerce": return <AppStructure loading={loading.requests.length > 0}>
            <Commerce></Commerce>
        </AppStructure>;
        default: return <div>403 not found</div>
    }
}

function AppStructure({ children, loading }: { children: JSX.Element, loading: boolean }) {
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
                {loading ? <Col lg={12} md={12}>
                    {children}
                </Col> : <Loading></Loading>}

            </Row>
        </Col>
    </Row>
}

function Loading() {
    return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>)
}