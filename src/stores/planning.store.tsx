import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Planning } from "../models/Planning";
import { PlanningCost } from "../models/PlanningCost";
import { getMessages } from "./messaging.store";

const initialPlanning: Planning[] = [];
const initialEditPlanning: Planning[]=[];
const planningStore = createSlice({
    name: 'planning',
    initialState: {
        plannings: initialPlanning,
        editPlannings: initialEditPlanning,

    },
    reducers: {
        setPlannings(state,action){
          state.plannings=action.payload
        },
        setEditPlannings(state,action){
            state.editPlannings=action.payload
          }
    }
});


export const { setPlannings, setEditPlannings} = planningStore.actions;
export default planningStore.reducer;
export function asyncFetchPlanningData() {
    return async function (dispatch: AppDispatch) {
      try {
        const results = await axios.get(
          "https://remoteapi.murilobotelho.com.br/plannings", 
          {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
        );
        dispatch(setPlannings(results.data))
      } catch(err) {
        console.error(err);
      }
      
    };
  }




export function asyncNewPlannings(register: Planning) {
  return async function (dispatch: AppDispatch) {
      try {
          const results = await axios.post(
              `https://remoteapi.murilobotelho.com.br/plannings`,
              register,
              {
                  headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  },
              }
          );
          dispatch(getMessages({
            message: "Planejamento cadastrado com sucesso",
            type: "success",
        }));
        dispatch(setPlannings(results.data))
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

export function asyncDeletePlanning(id: number) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.delete(
                `https://remoteapi.murilobotelho.com.br/plannings/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(asyncFetchPlanningData());
            dispatch(
                getMessages({
                    message: "Planejamento excluído com sucesso",
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
export function asyncFetchEditPlannings(id: number) {
    return async function (dispatch: AppDispatch) {
        const results = await axios.get(`https://remoteapi.murilobotelho.com.br/plannings/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(setEditPlannings(results.data));
    }
}