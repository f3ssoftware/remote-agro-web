import { createSlice } from "@reduxjs/toolkit";
import { results } from "../utils/results";

const homeStore = createSlice({
    name: "home",
    initialState: {
        productivity: [],
        results: results
    },
    reducers: {
        setResults(state, action) {
            state.results = action.payload;
        }
    },
});

export const { setResults } =
    homeStore.actions;
export default homeStore.reducer;