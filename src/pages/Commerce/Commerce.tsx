import "./Commerce.scss";
import { Navigate, useLocation } from "react-router-dom";
import { Contracts } from "./Contracts/Contracts";
import { CommercePlot } from "./CommercePlot/CommercePlot";
import React from "react";
import { CommerceWeighing } from "./CommerceWeighing/CommerceWeighing";
import { InputWeighing } from "./modals/components/InputWeighing";
import { OutputWeighing } from "./modals/components/OutputWeighing";
import { SeparateWeighing } from "./modals/components/SeparateWeighing";
import { EditInputWeighing } from "./modals/components/EditInputWeighing";

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
    case "weighing": {
      if(location.pathname.split('/')[3] === 'input') {
        return <InputWeighing></InputWeighing>  
      }
      if(location.pathname.split('/')[3] === 'output') {
        return <OutputWeighing></OutputWeighing>  
      }if(location.pathname.split('/')[3] === 'separate') {
        return <SeparateWeighing></SeparateWeighing>  
      }if(location.pathname.split('/')[3] === 'inputEvents') {
        return <EditInputWeighing></EditInputWeighing>  
      }
      return <CommerceWeighing></CommerceWeighing>
    }
    default: {
      console.log(location.pathname.split("/"));
      return <div>Not found</div>;
    }
  }
}
