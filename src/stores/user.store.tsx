import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { popLoading, pushLoading } from "./loading.store";

const userStore = createSlice({
  name: "user",
  initialState: {
    name: "",
    role: "",
    reportUrl: "",
  },
  reducers: {
    fetchUser(state: any, action) {
      console.log(action);
      state.name = action.payload.user.name;
      state.role = action.payload.user.role;
      state.reportUrl = action.payload.user.web_reports_url;
    },
  },
});

export const { fetchUser } = userStore.actions;
export default userStore.reducer;

export function asyncFetchUser(username: string, password: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(pushLoading('sessions'));
    try {
      const results = await axios.post(
        "https://remoteapi.murilobotelho.com.br/sessions",
        {
          username,
          password,
        }
      );
      sessionStorage.setItem("token", results.data.token);
      dispatch(fetchUser(results.data));
      dispatch(popLoading('sessions'));
    } catch(err) {
      console.error(err);
    }
    
  };
}
