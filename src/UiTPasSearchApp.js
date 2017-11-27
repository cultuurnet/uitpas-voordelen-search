import React, { Component } from 'react';
import './UiTPasSearchApp.css';

import { BrowserRouter, HashRouter} from 'react-router-dom';
import UiTPasSearchAppContainer from "./uitpas/UiTPasSearchAppContainer";

/**
 * This package contains containers for the router. This architecture allows to easily change the app to use
 * a different or multiple routers.
 */

/**
 * This class sets the router to use the hash portion of the url. In this way the server can render
 * his pages the way the server wants and the react app will use the hash portion to do its routing.
 * This is useful to embed the app in existing web pages without causing conflicts with existing
 * url routes or requiring a server like Node.js.
 */
export default class UiTPasSearchEmbeddedApp extends Component {

    render() {
        return (
            <HashRouter>
                <UiTPasSearchAppContainer/>
            </HashRouter>
        );
    }
}

/**
 * This class sets the router to use full paths. This requires a server environment that does not
 * serve static paths using the HTML5 history API. E.g. Node.js.
 */
export class UiTPasSearchStandAloneApp extends Component {

    render() {
        return (
            <BrowserRouter>
                <UiTPasSearchAppContainer/>
            </BrowserRouter>
        );
    }
}

