import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import UiTPasAdvantageSearchPage from './search/page/UiTPasAdvantageSearchPage';
import UiTPasWelcomeAdvantageSearchPage from './search/page/UiTPasWelcomeAdvantageSearchPage';
import UiTPasDetailPage from './search/page/UiTPasDetailPage';


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
                    <Route exact path="/voordelen" component={UiTPasAdvantageSearchPage}/>
                    <Route path="/voordeel/:id" component={UiTPasDetailPage}/>
                    <Route exact path="/welkomstvoordelen" component={UiTPasWelcomeAdvantageSearchPage}/>
                    <Route component={UiTPasAdvantageSearchPage}/>
                </Switch>
            </div>
        );
    }
}

export default UiTPasSearchAppContainer;
