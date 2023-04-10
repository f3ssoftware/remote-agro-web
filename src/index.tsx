import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch, } from 'react-redux'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userStore from './stores/user.store';
import loadingStore from './stores/loading.store';
import seasonsStore from './stores/seasons.store';
import inputStore from './stores/input.store';
import messagingStore from './stores/messaging.store';
import financialStore from './stores/financial.store';
import homeStore from './stores/home.store';
import farmStore from './stores/farm.store';
import soilStore from './stores/soil.store';
import commerceStore from './stores/commerce.store';
import planningStore from './stores/planning.store';
import plotStore from './stores/plot.store';
import maintenanceStore from './stores/maintenance.store';

const store = configureStore({
  reducer: {
    user: userStore,
    loading: loadingStore,
    seasons: seasonsStore,
    input: inputStore,
    messages: messagingStore,
    financial: financialStore,
    home: homeStore,
    farm: farmStore,
    soil: soilStore,
    commerce: commerceStore,
    planning: planningStore,
    plot: plotStore,
    maintenance: maintenanceStore
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.title = 'Remote Agro';
root.render(
  <Provider store={store}>
    <App />
  </Provider>
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

