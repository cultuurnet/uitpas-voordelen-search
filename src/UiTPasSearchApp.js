import React, { Component } from 'react';
import './UiTPasSearchApp.css';
import { BrowserRouter} from 'react-router-dom';
import UiTPasSearchAppContainer from "./uitpas/UiTPasSearchAppContainer";

/**
 * This class is a container for the router. This architecture allows to easily change the app to use
 * a different or multiple routers.
 */
class UiTPasSearchApp extends Component {

    render() {
        return (
            <BrowserRouter>
                <UiTPasSearchAppContainer/>
            </BrowserRouter>
        );
    }
}

export default UiTPasSearchApp;
