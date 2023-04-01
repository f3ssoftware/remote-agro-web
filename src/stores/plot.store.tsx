import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";
import { Applier } from "../models/Applier";
import { Application } from "../models/Application";
import { getMessages } from './messaging.store'

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

export function asyncPrescription(prescription: any) {
    return async function (dispatch: AppDispatch) {
      try {
        const result = await axios.post(
          `https://remoteapi.murilobotelho.com.br/applications`,
          prescription,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        )
        dispatch(
          getMessages({
            message: 'Receituário  salvo com sucesso',
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
  export function asyncPrescriptionTable(prescription: any) {
    return async function (dispatch: AppDispatch) {
      try {
        const result = await axios.post(
          `https://remoteapi.murilobotelho.com.br/application-tables`,
          prescription,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        )
        // dispatch(
        //   getMessages({
        //     message: 'Receituário  salvo com sucesso',
        //     type: 'success',
        //   }),
        // )
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