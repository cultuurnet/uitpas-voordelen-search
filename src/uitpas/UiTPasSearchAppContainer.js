import React, { Component } from 'react';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';

import UiTPasAdvantageSearchPage from './search/page/UiTPasAdvantageSearchPage';
import UiTPasWelcomeAdvantageSearchPage from './search/page/UiTPasWelcomeAdvantageSearchPage';

class UiTPasSearchAppContainer extends Component {

    render() {
        
        return (
            <div className="App">
                <div className="sk-tabs">
                    <NavLink to="/voordelen" activeClassName="active" className="sk-tabs-option">
                        <div>Voordelen</div>
                    </NavLink>
                    <NavLink to="/welkomstvoordelen" activeClassName="active" className="sk-tabs-option">
                        <div>Welkomstvoordelen</div>
                    </NavLink>
                </div>
                <Switch>
                    <Route path="/voordelen" component={UiTPasAdvantageSearchPage}/>
                    <Route path="/welkomstvoordelen" component={UiTPasWelcomeAdvantageSearchPage}/>
                    <Redirect from="/" exact to="/voordelen"/>
                </Switch>
            </div>
        );
    }
}

export default UiTPasSearchAppContainer;
