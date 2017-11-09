import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap/css/bootstrap.css';
import './bootstrap/css/bootstrap-theme.css';
import './index.css';
import UiTPasSearchApp from './UiTPasSearchApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UiTPasSearchApp />, document.getElementById('root'));
registerServiceWorker();
