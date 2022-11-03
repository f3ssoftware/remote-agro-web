import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";

const userStore = createSlice({
  name: "user",
  initialState: {
    name: "",
    role: "",
  },
  reducers: {
    fetchUser(state: any, action) {
      console.log(action);
      state.name = action.payload.user.name;
      state.role = action.payload.user.role;
    },
  },
});

export const { fetchUser } = userStore.actions;
export default userStore.reducer;

export function asyncFetchUser(username: string, password: string) {
  return async function (dispatch: AppDispatch) {
    const results = await axios.post(
      "https://remoteapi.murilobotelho.com.br/sessions",
      {
        username,
        password,
      }
    );
    sessionStorage.setItem("token", results.data.token);
    dispatch(fetchUser(results.data));
  };
}
