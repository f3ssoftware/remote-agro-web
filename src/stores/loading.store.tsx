import { createSlice } from "@reduxjs/toolkit";

const stringArr: string[] = []
const loadingStore = createSlice({
    name: 'loading',
    initialState: {
        requests: stringArr,
    },
    reducers: {
        pushLoading(state, action) {
            state.requests.push(action.payload);
        },
        popLoading(state, action) {
            const index = state.requests.indexOf(action.payload);
            if(index !== -1) {
                state.requests.splice(index, 1);
            }
        },
    }
});


export const { pushLoading, popLoading } = loadingStore.actions;
export default loadingStore.reducer;