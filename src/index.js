import React from 'react';
import ReactDOM from 'react-dom';

import UiTPasSearchApp from './UiTPasSearchApp';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<UiTPasSearchApp />, document.getElementById('root'));
registerServiceWorker();
