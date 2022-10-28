import { createSlice } from "@reduxjs/toolkit";

const stringArr: string[] = []
const loadingStore = createSlice({
    name: 'loading',
    initialState: {
        requests: stringArr,
    },
    reducers: {
        pushLoading(state, action) {
            console.log(state.requests);
            state.requests.push(action.payload);
        },
        popLoading(state, action) {
            console.log(action.payload);
            state.requests.pop();
        }
    }
});


export const { pushLoading, popLoading } = loadingStore.actions;
export default loadingStore.reducer;