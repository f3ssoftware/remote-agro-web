import { createSlice } from "@reduxjs/toolkit";
import { Good } from '../models/Good'
import { AppDispatch } from "..";
import axios from "axios";
import { Part } from "../models/Part";
import { getMessages } from './messaging.store'

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

export function asyncNewParts(invoiceId: number, input: Part[]) {
    return async function (dispatch: AppDispatch) {
      try {
        const result = await axios.post(
          `https://remoteapi.murilobotelho.com.br/parts`,
          {
            expenses_invoice_id: invoiceId,
            parts: input,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        )
        dispatch(
          getMessages({
            message: 'Entrada de peça salva com sucesso',
            type: 'success',
          }),
        )
      } catch (err: any) {
        dispatch(
          getMessages({
            message: err.response.data.message,
            type: 'error',
          }),
        )
      }
    }
  }

  export function asyncInputParts(invoiceId: number, input: Part[]) {
    return async function (dispatch: AppDispatch) {
      try {
        const result = await axios.put(
          `https://remoteapi.murilobotelho.com.br/parts`,
          {
            expenses_invoice_id: invoiceId,
            parts: input,
            type: 'Entrada'
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        )
        dispatch(
          getMessages({
            message: 'Entrada de peça salva com sucesso',
            type: 'success',
          }),
        )
      } catch (err: any) {
        dispatch(
          getMessages({
            message: err.response.data.message,
            type: 'error',
          }),
        )
      }
    }
  }