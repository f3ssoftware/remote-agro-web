import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import axios from "axios";

const initialApplications:any[] = [];
const plotStore = createSlice({
    name: 'plot',
    initialState: {
        applications: initialApplications,

    },
    reducers: {
        setApplications(state, action) {
            state.applications = action.payload;
        }
    }
});


export const { setApplications } = plotStore.actions;
export default plotStore.reducer;

// export function asyncFetchServiceOrders() {
//     return async function (dispatch: AppDispatch) {
//         try {
//             const results = await axios.get(
//                 "https://remoteapi.murilobotelho.com.br/service-orders",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//                     },
//                 }
//             );
//             dispatch(setServiceOrders(results.data))
//         } catch (err) {
//             console.error(err);
//         }

//     };
// }


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