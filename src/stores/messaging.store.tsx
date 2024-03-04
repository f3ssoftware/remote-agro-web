import { createSlice } from "@reduxjs/toolkit";
import { MessageSeverity } from "primereact/api";

const initialMessages: { message: string, type: MessageSeverity }[] = [];
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