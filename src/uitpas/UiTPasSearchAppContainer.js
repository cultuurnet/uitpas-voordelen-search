import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import UiTPasAdvantageSearchPage from './search/page/UiTPasAdvantageSearchPage';
import UiTPasWelcomeAdvantageSearchPage from './search/page/UiTPasWelcomeAdvantageSearchPage';
import UiTPasDetailPage from './search/page/UiTPasDetailPage';


class UiTPasSearchAppContainer extends Component {

    render() {
        
        return (
            <div className="App">
                <div className="sk-tabs">
                    <Link to="/voordelen" activeClassName="active" className="sk-tabs-option" onlyActiveOnIndex>
                        <div>Voordelen</div>
                    </Link>
                    <Link to="/welkomstvoordelen" activeClassName="active" className="sk-tabs-option" onlyActiveOnIndex>
                        <div>Welkomstvoordelen</div>
                    </Link>
                </div>
                <Switch>
                    <Route exact path="/voordelen" component={UiTPasAdvantageSearchPage}/>
                    <Route exact path="/welkomstvoordelen" component={UiTPasWelcomeAdvantageSearchPage}/>
                    <Route path="/voordeel/:id" component={UiTPasDetailPage}/>
                    <Route component={UiTPasAdvantageSearchPage}/>
                </Switch>
            </div>
        );
    }
}

export default UiTPasSearchAppContainer;
