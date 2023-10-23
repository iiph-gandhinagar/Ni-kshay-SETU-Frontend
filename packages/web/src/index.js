import configureStore from '@tb-frontend/shared/Store/index';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-chat-widget/lib/styles.css';
import 'react-responsive-modal/styles.css';
import './css/bootstrap.min.css';
import './css/icofont.min.css';
import './css/ProgressLine.css';
import './css/responsive.css';
import './index.css';
import MainApp from './MainApp';
import reportWebVitals from './reportWebVitals';
import 'regenerator-runtime/runtime';

const store = configureStore;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);

reportWebVitals();
