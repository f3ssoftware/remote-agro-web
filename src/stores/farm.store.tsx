import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";
import { getMessages } from "./messaging.store";
import { RegisterPlotDTO } from "../models/dtos/RegisterPlotDTO";
import { asyncFetchPlots } from "./commerce.store";

const initialSelectedFarm: any = []
const initialEditPlot: RegisterPlotDTO = {}
const farmStore = createSlice({
    name: "farm",
    initialState: {
        farms: [],
        selectedFarm: initialSelectedFarm,
        editPlot: initialEditPlot
    },
    reducers: {
        setFarms(state, action) {
            state.farms = action.payload;
        },
        selectAFarm(state, action) {
            state.selectedFarm = action.payload;
        },
        setEditPlot(state, action) {
            state.editPlot = action.payload;
        }
        
    },
});

export const { setFarms, selectAFarm, setEditPlot } =
    farmStore.actions;
export default farmStore.reducer;


export function asyncFetchFarms(params?: any) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.get(
                `https://remoteapi.murilobotelho.com.br/farms?include=cultivares&include=cultivations&include=seasons`,
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
export function asyncFetchEditPlots(id: number) {
      return async function (dispatch: AppDispatch) {
          try{
    
          const results = await axios.get(`https://remoteapi.murilobotelho.com.br/fields/${id}?include=cultivares&include=cultivation&`, {
              headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
          });
          dispatch(setEditPlot(results.data));
      } catch (err: any) {
          console.log(err);
          dispatch(
              getMessages({
                  message: err.response.data.message,
                  type: "error",
              })
          );
      }
      }
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
export function asyncEditPlot(id: number, editRequestBody: RegisterPlotDTO) {
    return async function (dispatch: AppDispatch) {
      try {
        await axios.put(
          `https://remoteapi.murilobotelho.com.br/fields/${id}`,
          editRequestBody,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        )
        dispatch(
          getMessages({
            message: 'Talhão editado com sucesso',
            type: 'success',
          }),
        )
      } catch (err: any) {
        console.log(err)
        dispatch(
          getMessages({
            message: err.message,
            type: 'error',
          }),
        )
      }
    }
  }
