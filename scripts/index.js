import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom/modules/BrowserRouter';
import App from './App';
import Run from './Run';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/Run" component={Run}/>
        </div>
    </BrowserRouter>,document.getElementById('root')
);

