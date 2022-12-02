import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Silo } from "../models/Silo";
import { getMessages } from "./messaging.store";


const initialSilo: Silo [] = [];
const farmStore = createSlice({
    name: "commerce",
    initialState: {
        plots: [],
        silo: initialSilo
    },
    reducers: {
        setPlots(state, action) {
            state.plots = action.payload;
        },
        setSilo(state,action){
            state.silo = action.payload
        }
    },
});

export const { setPlots, setSilo } =
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

