import React from 'react';
import * as ReactDOM from 'react-dom';
import AppCalendar from './AppCalendar';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store/store';


const rootNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <AppCalendar />
    </BrowserRouter>
  </Provider>, rootNode);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
