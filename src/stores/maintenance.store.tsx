import { createSlice } from "@reduxjs/toolkit";
import { Good } from '../models/Good'
import { AppDispatch } from "..";
import axios from "axios";
import { Part } from "../models/Part";
import { getMessages } from './messaging.store'
import { Tank } from "../models/Tank";
import { PartHistory } from "../models/PartHistory";
import { popLoading, pushLoading } from "./loading.store";

const initialGoods: Good[] = [];
const initialParts: Part[] = [];
const initialTanks: Tank[] = [];
const initialPartHistory: PartHistory[] = [];

const maintenanceStore = createSlice({
  name: "maintenance",
  initialState: {
    goods: initialGoods,
    parts: initialParts,
    tanks: initialTanks,
    goodHistory: [],
    partHistory: initialPartHistory,
    fuellings: [],
  },
  reducers: {
    setGoods(state, action) {
      state.goods = action.payload;
    },
    setParts(state, action) {
      state.parts = action.payload;
    },
    setTanks(state, action) {
      state.tanks = action.payload;
    },
    setGoodHistory(state, action) {
      state.goodHistory = action.payload
    },
    setPartHistory(state, action) {
      state.partHistory = action.payload;
    },
    setFuellings(state, action) {
      state.fuellings = action.payload;
    }
  },
});

export const { setGoods, setParts, setTanks, setPartHistory, setGoodHistory, setFuellings } = maintenanceStore.actions;
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

export function asyncNewGoods(good: Good) {
  return async function (dispatch: AppDispatch) {
    try {
      const result = await axios.post(
        `https://remoteapi.murilobotelho.com.br/goods`,
        good,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      dispatch(
        getMessages({
          message: 'Bem criado com sucesso',
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
export function asyncFetchPartHistory(id: number) {
  return async function (dispatch: AppDispatch) {
    dispatch(popLoading("parts"));
    const results = await axios.get(`https://remoteapi.murilobotelho.com.br/parts/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    dispatch(popLoading("parts"));
    dispatch(setPartHistory(results.data.part_history))
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
export function asyncOutputParts(output: Part[]) {
  return async function (dispatch: AppDispatch) {
    try {
      const result = await axios.put(
        `https://remoteapi.murilobotelho.com.br/parts`,
        {
          parts: output,
          type: 'Saida'
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      dispatch(
        getMessages({
          message: 'Saída de peça salva com sucesso',
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

export function asyncFetchTanks() {
  return async function (dispatch: AppDispatch) {
    try {
      const result = await axios.get(
        `https://remoteapi.murilobotelho.com.br/tanks`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        },
      )
      dispatch(setTanks(result.data));
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

export function asyncFetchFuellings(params: any) {
  return async function (dispatch: AppDispatch) {
    try {
      const result = await axios.get(
        `https://remoteapi.murilobotelho.com.br/fuellings`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          params
        },
      )
      const dailyFuellings = result.data;
      const allFuellings: any[] = []; 
      
      dailyFuellings.forEach((df: any[]) => {
        return df.forEach(fuelling => allFuellings.push(fuelling));
      })
      dispatch(setFuellings(allFuellings));
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

export function asyncGetGoodHistory(params: any) {
  return async function (dispatch: AppDispatch) {
    try {
      const result = await axios.get(
        `https://remoteapi.murilobotelho.com.br/part-histories`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          params,
        },
      )
      dispatch(setGoodHistory(result.data));
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