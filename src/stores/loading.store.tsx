import { createSlice } from "@reduxjs/toolkit";

const loadingStore = createSlice({
    name: 'loading',
    initialState: {
        requests: ['']
    },
    reducers: {
        push(state) {
            state.requests.push('new loading');
        }
    }
});


export const { push } = loadingStore.actions;
export default loadingStore.reducer;