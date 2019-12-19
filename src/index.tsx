import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import '@/assets/styles/index.less';
import '@/assets/styles/public.less';
import App from './App';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={App}></Route>
  </HashRouter>,
  document.getElementById('app') as HTMLElement
);
