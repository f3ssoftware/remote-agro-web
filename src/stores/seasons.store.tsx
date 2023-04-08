import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";

const initalSeasons:any = []
const seasonStore = createSlice({
    name: 'season',
    initialState: {
        selectedSeason: {
            "id": 1,
            "owner_id": 1,
            "year": "2019/2020",
            "type": "Safra",
            "deleted_at": null,
            "createdAt": "2021-02-28T21:07:54.000Z",
            "updatedAt": "2021-02-28T21:07:54.000Z"
        },
        seasons: [initalSeasons],
    },
    reducers: {
        getSeasons(state, action) {
            state.seasons = action.payload;
        },
        selectSeason(state, action) {
            state.selectedSeason = action.payload;
        },
    },
});


export const { getSeasons, selectSeason } = seasonStore.actions;
export default seasonStore.reducer;

export function asyncFetchSeasons() {
    return async function (dispatch: AppDispatch) {
        const results = await axios.get('https://remoteapi.murilobotelho.com.br/seasons', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        dispatch(getSeasons(results.data));
        dispatch(selectSeason(results.data[results.data.length - 1]));
    }
}