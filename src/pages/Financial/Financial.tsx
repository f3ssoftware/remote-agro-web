import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Balance } from './Balance/Balance';
import { Invoice } from './Invoice/Invoice';
import { ManualRegistration } from './ManualRegistration/ManualRegistration';

export function Financial() {
    const location  = useLocation();
    switch (location.pathname.split("/")[2]) {
        case undefined: {
          return <Navigate to="financial/balance"></Navigate>;
        }
        case "balance": {
          return <Balance></Balance>
        }
        case "invoice": {
            return <Invoice></Invoice>
        }
        case "manual-registration": {
          return <ManualRegistration></ManualRegistration>;
        }
        default: {
          console.log(location.pathname.split("/"));
          return <div>Not found</div>;
        }
      }
}
