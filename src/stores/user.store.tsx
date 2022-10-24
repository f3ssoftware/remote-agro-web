import { createSlice } from "@reduxjs/toolkit";

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