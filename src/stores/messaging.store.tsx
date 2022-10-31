import { createSlice } from "@reduxjs/toolkit";

const initialMessages: { message: string, type: string }[] = [];
const messagingStore = createSlice({
    name: 'messaging',
    initialState: {
        messages: initialMessages,
    },
    reducers: {
        getMessages(state, action) {
            state.messages.push(action.payload);
        },
        popMessages(state, action) {
            state.messages.pop();
        }
    }
});

export const { getMessages, popMessages } = messagingStore.actions;
export default messagingStore.reducer;