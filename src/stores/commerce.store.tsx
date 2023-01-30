import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Silo } from "../models/Silo";
import { getMessages } from "./messaging.store";
import { asyncFetchContractsData } from "./financial.store";
import { Contract } from "../models/Contract";


const initialSilo: Silo [] = [];
const initialContracts: Contract[] = []
const farmStore = createSlice({
    name: "commerce",
    initialState: {
        plots: [],
        silo: initialSilo,
        contracts: initialContracts
    },
    reducers: {
        setPlots(state, action) {
            state.plots = action.payload;
        },
        setSilo(state,action){
            state.silo = action.payload
        },
        setEditContracts(state,action){
            state.contracts = action.payload
        }
        
    },
});

export const { setPlots, setSilo, setEditContracts } =
    farmStore.actions;
export default farmStore.reducer;


export function asyncFetchPlots(farmId: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/fields?farm_id=${farmId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                setPlots(result.data)
            );
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncCreateCommercePlot(silo :Silo) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(`https://remoteapi.murilobotelho.com.br/silos`,
            silo, 
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            dispatch(getMessages({
                message: "Silo cadastrado com sucesso",
                type: "success",
            }));
            dispatch(setSilo(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchSiloData() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(`https://remoteapi.murilobotelho.com.br/silos`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            dispatch(setSilo(result.data));
        } catch (err: any) {
            dispatch(getMessages({
                message: err.response.data.message,
                type: "error",
            }));
        }
    }
}

export function asyncFetchEditContracts(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(setEditContracts(result.data));
        } catch (err: any) {
            dispatch(
                getMessages({
                    message: err.result.data.error,
                    type: "error",
                })
            );
        }
    };
}

export function asyncEditContract(contract: Contract, id:number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.put(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                contract,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: "Contrato editado com sucesso" ,
                    type: "success",
                })
            );
            return 0;
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteContract(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/contracts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(asyncFetchContractsData());
            dispatch(
                getMessages({
                    message: "Contrato excluído com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

export function asyncDeleteSilo(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/silos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(asyncFetchSiloData());
            dispatch(
                getMessages({
                    message: "Contrato excluído com sucesso",
                    type: "success",
                })
            );
        } catch (err: any) {
            console.log(err);
            dispatch(
                getMessages({
                    message: err.response.data.message,
                    type: "error",
                })
            );
        }
    };
}

