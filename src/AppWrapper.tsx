import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom"
import { TopNav } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login";
import { Plot } from "./pages/Plot/Plot";

export function AppWrapper() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    switch (location.pathname) {
        case "/login": return <Login></Login>;
        case "/home": return <AppStructure>
            <Home></Home>
        </AppStructure>;
        case "/plot": return <AppStructure>
            <Plot></Plot>
        </AppStructure>;
        default: return <div>403 not found</div>
    }
}

function AppStructure({ children }: { children: JSX.Element }) {
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
                <Col lg={12} md={12}>
                    {children}
                </Col>
            </Row>
        </Col>
    </Row>
}