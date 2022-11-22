import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { getMessages } from "./messaging.store";

const farmStore = createSlice({
    name: "commerce",
    initialState: {
        plots: []
    },
    reducers: {
        setPlots(state, action) {
            state.plots = action.payload;
        }
    },
});

export const { setPlots } =
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