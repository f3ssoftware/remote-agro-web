import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { QueryArray } from "ts-query-array";
import { RootState } from "../..";
import "./Navbar.scss";
import { NavbarActions } from "./NavbarActions";
import Avatar from 'react-avatar';

export function TopNav() {
    const user = useSelector((state: RootState) => state.user);

    let location = useLocation();
    return (
        <Row style={{ padding: "1%" }}>
            <Col md={3}>
                <Row className="season-selection">
                    <Col md={10}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <span>Safrinha</span>
                        </div>

                    </Col>
                    <Col md={2}>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Col>
                </Row>
            </Col>
            <Col md={6}>
                <Row>
                    {NavbarActions.filter((b) => b.pathname === location.pathname).map(button => {
                        return (<Col md={3}>
                            <Button onClick={() => button.action()} style={{ backgroundColor: '#243C74', color: '#fff', textTransform: 'uppercase', fontWeight: 'bold', border: 'none' }}>{button.title}</Button>
                        </Col>)
                    })}
                </Row>
            </Col>
            <Col md={3}>
                <Row>
                    <Col md={3}>
                        <Avatar name={user.name} round={true} size="50"></Avatar>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col>
                                <span style={{ color: '#fff', fontWeight: 'bold' }}>{user.name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span style={{ color: '#968E8E' }}>{user.role}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}