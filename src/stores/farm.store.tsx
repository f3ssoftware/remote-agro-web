import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";
import { getMessages } from "./messaging.store";

const farmStore = createSlice({
    name: "farm",
    initialState: {
        farms: []
    },
    reducers: {
        setFarms(state, action) {
            state.farms = action.payload;
        }
    },
});

export const { setFarms } =
    farmStore.actions;
export default farmStore.reducer;


export function asyncFetchFarms() {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/farms`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(
                setFarms(result.data)
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