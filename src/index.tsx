import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch, } from 'react-redux'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userStore from './stores/user.store';
import loadingStore from './stores/loading.store';


const store = configureStore({
  reducer: {
    user: userStore,
    loading: loadingStore,
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.title = 'Remote Agro';
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()