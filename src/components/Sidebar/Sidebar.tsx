import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import "./Sidebar.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMapLocationDot, faLeaf, faMoneyBills, faBuilding, faTractor, faClock, faSeedling, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import { Roles } from "../../utils/roles.enum";

export function Sidebar() {
    let location = useLocation();
    let navigation = useNavigate();
    const navigate = (url: string, e: any) => {
        navigation(url);
    }

    return (
        <div className="ra-sidebar">
            <Container>
                <Row>
                    <Col><img src={logo} className="sidebar-logo" alt="Remote Agro" /></Col>
                </Row>
                <div className="sidebar-items">
                    {SidebarItems.filter((item: any) => item.roles.includes(JSON.parse(sessionStorage.getItem('user')!).role)).map((item, index) => (
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '50%' }}>
                        <Button variant="warning" onClick={() => {
                            sessionStorage.removeItem('token');
                            navigation('/');
                        }}>Logout</Button>
                    </div>
                </div>

            </Container >

        </div >
    )
}

const SidebarItems = [
    {
        icon: faFileAlt,
        title: 'Dashboards',
        url: "report",
        roles: [Roles.OWNER]
    },
    {
        icon: faMapLocationDot,
        title: 'Talhões',
        url: "plot",
        roles: [Roles.OWNER]
    },
    {
        icon: faLeaf,
        title: 'Insumos',
        url: "input",
        roles: [Roles.OWNER]
    },
    {
        icon: faMoneyBills,
        title: 'Financeiro',
        url: "financial",
        roles: [Roles.OWNER]
    },
    {
        icon: faBuilding,
        title: 'Comércio',
        url: "commerce",
        roles: [Roles.ADMINISTRATIVE, Roles.OWNER]
    },
    {
        icon: faTractor,
        title: 'Manutenção',
        url: "maintenance",
        roles: [Roles.OWNER]
    },
    {
        icon: faClock,
        title: 'Planejamento',
        url: "planning",
        roles: [Roles.OWNER]
    },
    {
        icon: faSeedling,
        title: 'Solo',
        url: "soil",
        roles: [Roles.OWNER]
    },

    // {
    //     icon: faFileAlt,
    //     title: 'Relatórios',
    //     url: "report",
    //     roles: [Roles.OWNER]
    // }

]