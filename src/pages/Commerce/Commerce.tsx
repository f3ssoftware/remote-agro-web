import "./Commerce.scss";
import { Navigate, useLocation } from "react-router-dom";
import { Contracts } from "./Contracts/Contracts";
import { CommercePlot } from "./CommercePlot/CommercePlot";
import React from "react";

export function Commerce() {
  const location = useLocation();

  switch (location.pathname.split("/")[2]) {
    case undefined: {
      console.log("value", location.pathname.split("/")[2]);
      return <Navigate to="commerce/contract"></Navigate>;
    }
    case "contract": {
      return <Contracts></Contracts>;
    }
    case "plot": {
      return <CommercePlot></CommercePlot>;
    }
    default: {
      console.log(location.pathname.split("/"));
      return <div>Not found</div>;
    }
  }
}
