import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "..";

const userStore = createSlice({
    name: 'user',
    initialState: {
        name: 'Zerola',
        role: 'Owner'
    },
    reducers: {
        fetchUser(state: any) {
            console.log(state);
            // state += 1;
        }
    }
});


export const { fetchUser } = userStore.actions;
export default userStore.reducer;

export function asyncFetchUser(username: string, password: string) {
    return async function (dispatch: AppDispatch) {
        const results = await axios.post('https://remoteapi.murilobotelho.com.br/sessions', {
            username, password
        });
        sessionStorage.setItem("token", results.data.token);
    }
}