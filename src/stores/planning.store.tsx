import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Planning } from "../models/Planning";
import { PlanningCost } from "../models/PlanningCost";
import { PlanningInput } from "../models/PlanningInput";
import { setPlannings } from "./financial.store";
import { getMessages } from "./messaging.store";

const initialPlanning: Planning[] = [];
const initialPalnningCost: PlanningCost[]=[];
const initialPlanningInput: PlanningInput[]=[];
const planningStore = createSlice({
    name: 'planning',
    initialState: {
        plannings: initialPlanning,
        planningsCost: initialPalnningCost,
        planningInput: initialPlanningInput
    },
    reducers: {
        setPlannings(state,action){
          state.plannings=action.payload
        },
        setPlanningCost(state,action){
          state.planningsCost=action.payload
        },
        setPlanningInput(state,action){
          state.planningInput=action.payload
        }
    }
});


export const { setPlanningCost,setPlanningInput} = planningStore.actions;
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

  export function asyncNewPlanningsInput(input: PlanningInput) {
    return async function (dispatch: AppDispatch) {
        try {
            const result = await axios.post(
                `https://remoteapi.murilobotelho.com.br/plannings/?type=Insumos&?`,
                input,
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

export function asyncNewPlanningsCost(others: PlanningCost) {
  return async function (dispatch: AppDispatch) {
      try {
          const result = await axios.post(
              `https://remoteapi.murilobotelho.com.br/plannings/?type=Custos%20Indiretos&`,
              others,
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