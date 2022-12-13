import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { PlanningCost } from "../models/PlanningCost";

const initialPlanningData: PlanningCost[] = []
const planningStore = createSlice({
    name: 'planning',
    initialState: {
        planningData: initialPlanningData,
    },
    reducers: {
        setPlanningData(state,action){
            state.planningData=action.payload
        }
    }
});


export const { setPlanningData} = planningStore.actions;
export default planningStore.reducer;
export function asyncFetchPlanning() {
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
        dispatch(setPlanningData(results.data))
      } catch(err) {
        console.error(err);
      }
      
    };
  }