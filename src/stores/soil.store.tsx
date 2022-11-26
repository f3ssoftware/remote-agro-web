import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";

const initialSoilAnalysis: any[] = []
const soilStore = createSlice({
    name: 'soil',
    initialState: {
        soilAnalysis: initialSoilAnalysis,
    },
    reducers: {
        setSoilAnalysis(state,action){
            state.soilAnalysis=action.payload
        }
    }
});


export const { setSoilAnalysis} = soilStore.actions;
export default soilStore.reducer;
export function asyncFetchSoil() {
    return async function (dispatch: AppDispatch) {
      try {
        const results = await axios.get(
          "https://remoteapi.murilobotelho.com.br/service-orders",
          {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
        );
        dispatch(setSoilAnalysis(results.data))
      } catch(err) {
        console.error(err);
      }
      
    };
  }