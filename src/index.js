import React from "react";
import ReactDOM from "react-dom";

import UiTPasSearchConfig from "./uitpas/search/UiTPasSearchConfig";
import UiTPasSearchApp from "./UiTPasSearchApp";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

UiTPasSearchConfig.buildConfig();

ReactDOM.render(<UiTPasSearchApp />, document.getElementById("uitpas-search"));

registerServiceWorker();
