import React, { Component } from 'react';
import './UiTPasSearchApp.css';
import { BrowserRouter} from 'react-router-dom';
import UiTPasSearchAppContainer from "./uitpas/UiTPasSearchAppContainer";


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
