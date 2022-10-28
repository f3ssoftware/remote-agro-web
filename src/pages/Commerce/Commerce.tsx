import "./Commerce.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Contracts } from "./Contracts/Contracts";
import { CommercePlot } from "./CommercePlot/CommercePlot";

export function Commerce() {
    const location = useLocation();

    switch (location.pathname.split("/")[2]) {
        case undefined: {
            console.log('value', location.pathname.split("/")[2]);
            return <Navigate to={"commerce/contract"}></Navigate>
        }
        case "contract": {
            return <Contracts></Contracts>
        }
        case "plot": {
            return <CommercePlot></CommercePlot>
        }
        default: {
            console.log(location.pathname.split("/"));
            return <div>Not found</div>
        }
    }
}