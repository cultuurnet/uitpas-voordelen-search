import React from 'react';
import ReactDOM from 'react-dom';

import UiTPasSearchEmbeddedApp from './UiTPasSearchApp';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<UiTPasSearchEmbeddedApp />, document.getElementById('root'));
registerServiceWorker();
