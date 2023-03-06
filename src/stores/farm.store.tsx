import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";
import { getMessages } from "./messaging.store";
import { FarmInput } from "../pages/Input/FarmInput";
import { RegisterPlotDTO } from "../models/dtos/RegisterPlotDTO";

const initialSelectedFarm: any = []
const farmStore = createSlice({
    name: "farm",
    initialState: {
        farms: [],
        selectedFarm: initialSelectedFarm,
    },
    reducers: {
        setFarms(state, action) {
            state.farms = action.payload;
        },
        selectAFarm(state, action) {
            state.selectedFarm = action.payload;
        }
    },
});

export const { setFarms, selectAFarm } =
    farmStore.actions;
export default farmStore.reducer;


export function asyncFetchFarms(params?: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/farms?include=cultivares&include=cultivations`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                    params,
                }
            );
            dispatch(
                setFarms(result.data)
            );

            return 0;
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

export function asyncRegisterField(requestBody: RegisterPlotDTO) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(
                `https://remoteapi.murilobotelho.com.br/fields`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                getMessages({
                    message: 'Talhão registrado com sucesso',
                    type: "success",
                })
            );
            dispatch(asyncFetchFarms());
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