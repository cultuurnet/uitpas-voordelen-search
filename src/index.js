import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap/css/bootstrap.css';
import './bootstrap/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
