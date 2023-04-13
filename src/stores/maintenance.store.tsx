import { createSlice } from "@reduxjs/toolkit";
import { Good } from '../models/Good'
import { AppDispatch } from "..";
import axios from "axios";
import { Part } from "../models/Part";

const initialGoods: Good[] = [];
const initialParts: Part[] = [];
const maintenanceStore = createSlice({
    name: "maintenance",
    initialState: {
        goods: initialGoods,
        parts: initialParts
    },
    reducers: {
        setGoods(state, action) {
            state.goods = action.payload;
        },
        setParts(state, action) {
            state.parts = action.payload;
        },
    },
});

export const { setGoods, setParts } = maintenanceStore.actions;
export default maintenanceStore.reducer;

export function asyncFetchGoods() {
    return async function (dispatch: AppDispatch) {
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/goods', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(setGoods(results.data))
    }
}

export function asyncFetchParts() {
    return async function (dispatch: AppDispatch) {
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/parts', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(setParts(results.data))
    }
}