import React from 'react';
import ReactDOM from 'react-dom';

import UiTPasSearchConfig from './uitpas/search/UiTPasSearchConfig';
import UiTPasSearchEmbeddedApp from './UiTPasSearchApp';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

UiTPasSearchConfig.buildConfig();
ReactDOM.render(<UiTPasSearchEmbeddedApp />, document.getElementById('uitpas-search'));

registerServiceWorker();
