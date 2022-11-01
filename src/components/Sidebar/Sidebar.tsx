import { Col, Container, Nav, Row } from "react-bootstrap";
import "./Sidebar.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMapLocationDot, faLeaf, faMoneyBills, faBuilding, faTractor, faClock, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
    let location = useLocation();
    let navigation = useNavigate();
    const navigate = (url: string, e: any) => {
        navigation(url);
    }

    return (
        <div className="sidebar">
            <Container>
                <Row>
                    <Col><img src={logo} className="sidebar-logo" alt="Remote Agro" /></Col>
                </Row>
                <div className="sidebar-items">
                    {SidebarItems.map((item, index) => (
                        <Row key={index} onClick={(e) => navigate(item.url, e)}>
                            <Col md={2} lg={2}></Col>
                            <Col md={10} lg={10} className={item.url === location.pathname.split("/")[1] ? 'sidebar-nav-item active' : "sidebar-nav-item"}>
                                <Nav style={{ marginTop: '10px' }}>
                                    <Row>
                                        <Col>
                                            <FontAwesomeIcon icon={item.icon} />
                                        </Col>
                                        <Col>
                                            <span>{item.title}</span>
                                        </Col>
                                    </Row>
                                </Nav>
                            </Col>
                        </Row>
                    ))}
                </div>

            </Container >

        </div >
    )
}

const SidebarItems = [
    {
        icon: faHome,
        title: 'Início',
        url: "home"
    },
    {
        icon: faMapLocationDot,
        title: 'Talhões',
        url: "plot"
    },
    {
        icon: faLeaf,
        title: 'Insumos',
        url: "input"
    },
    {
        icon: faMoneyBills,
        title: 'Financeiro',
        url: "financial"
    },
    {
        icon: faBuilding,
        title: 'Comércio',
        url: "commerce"
    },
    {
        icon: faTractor,
        title: 'Manutenção',
        url: "maintenance"

    },
    {
        icon: faClock,
        title: 'Planejamento',
        url: "planning"
    },
    {
        icon: faSeedling,
        title: 'Solo',
        url: "soil"
    }

]