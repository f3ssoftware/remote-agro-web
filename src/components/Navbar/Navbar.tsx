import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./Navbar.scss";
import { NavbarActions } from "./NavbarActions";
import Avatar from 'react-avatar';
import { useEffect, useState } from "react";
import { SeasonSelection } from "./SeasonsSelection";
import { asyncFetchSeasons, getSeasons, selectSeason } from "../../stores/seasons.store";
import { RootState } from "../..";

export function TopNav() {
    const { user, seasons } = useSelector((state: RootState) => state);
    const [showModalSeasons, setShowModalSeasons] = useState(false);
    const handleClose = () => setShowModalSeasons(false);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(asyncFetchSeasons());
    }, [dispatch]);

    let location = useLocation();
    return (
        <>
            <Row style={{ padding: "1%" }}>
                <Col md={3}>
                    <Row className="season-selection" onClick={() => setShowModalSeasons(true)}>
                        <Col md={10}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <span>{`${seasons.selectedSeason.type} - ${seasons.selectedSeason.year}`}</span>
                            </div>
                        </Col>
                        <Col md={2}>
                            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        {NavbarActions.filter((b) => b.pathname === location?.pathname?.split("/")[1]).map((button, index) => {
                            return (<Col md={3} key={index}>
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
            <SeasonSelection show={showModalSeasons} handleClose={handleClose}></SeasonSelection>
        </>

    )
}