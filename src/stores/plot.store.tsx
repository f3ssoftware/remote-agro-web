import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";
import { Applier } from "../models/Applier";
import { Application } from "../models/Application";

const initialApplications:any[] = [];
const initialAppliers: Applier[] = []
const initialApplicationData: Application[]=[]
const plotStore = createSlice({
    name: 'plot',
    initialState: {
        applications: initialApplications,
        appliers: initialAppliers,
        applicationData: initialApplicationData

    },
    reducers: {
        setApplications(state, action) {
            state.applications = action.payload;
        },
        setAppliers(state, action){
            state.appliers = action.payload;
        },
        setApplicationData(state,action){
            state.applicationData = action.payload
        }
            
    }
});


export const { setApplications, setAppliers, setApplicationData } = plotStore.actions;
export default plotStore.reducer;

// export function asyncFetchServiceOrders() {
//     return async function (dispatch: AppDispatch) {
//         try {
//             const results = await axios.get(
//                 "https://remoteapi.murilobotelho.com.br/service-orders",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             dispatch(setServiceOrders(results.data))
//         } catch (err) {
//             console.error(err);
//         }

//     };
// }


export function asyncFetchApplications(params: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const results = await axios.get(
                "https://remoteapi.murilobotelho.com.br/applications",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    params,
                },
            );
            dispatch(setApplications(results.data.list))
        } catch (err) {
            console.error(err);
        }

    };
}

export function asyncFetchAppliers(params: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const results = await axios.get(
                "https://remoteapi.murilobotelho.com.br/appliers",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    params
                },
            );
            dispatch(setAppliers(results.data))
        } catch (err) {
            console.error(err);
        }

    };
}
export function asyncFetchApplicationData() {
    return async function (dispatch: AppDispatch) {
        try {
            const results = await axios.get(
                "https://remoteapi.murilobotelho.com.br/applications",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                },
            );
            dispatch(setApplicationData(results.data))
        } catch (err) {
            console.error(err);
        }

    };
}