import { Col, Container, Nav, Row } from "react-bootstrap";
import "./Sidebar.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMapLocationDot, faLeaf, faMoneyBills, faBuilding, faTractor, faClock, faSeedling } from '@fortawesome/free-solid-svg-icons';

export function Sidebar() {
    return (
        <div className="sidebar">
            <Container>
                <Row>
                    <Col><img src={logo} className="sidebar-logo" alt="Remote Agro" /></Col>
                </Row>
                <div className="sidebar-items">
                    {SidebarItems.map((item, index) => (
                        <Row className="sidebar-row" key={index}>
                            <Col>
                                <Nav>
                                    <Row>
                                        <Col><FontAwesomeIcon icon={item.icon} /></Col><Col><span>{item.title}</span></Col>
                                    </Row>
                                </Nav>
                            </Col>
                        </Row>
                    ))}
                </div>

            </Container>

        </div>
    )
}

const SidebarItems = [
    {
        icon: faHome,
        title: 'Início'
    },
    {
        icon: faMapLocationDot,
        title: 'Talhões'
    },
    {
        icon: faLeaf,
        title: 'Insumos'
    },
    {
        icon: faMoneyBills,
        title: 'Financeiro'
    },
    {
        icon: faBuilding,
        title: 'Comércio'
    },
    {
        icon: faTractor,
        title: 'Manutenção'
    },
    {
        icon: faClock,
        title: 'Planejamento'
    },
    {
        icon: faSeedling,
        title: 'Solo'
    }

]