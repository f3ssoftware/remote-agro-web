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
            state.requests.pop();
        }
    }
});


export const { pushLoading, popLoading } = loadingStore.actions;
export default loadingStore.reducer;