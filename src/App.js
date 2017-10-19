import React, { Component } from 'react';
import './App.css';
import UiTPasAdvantageSearchContainer from './uitpas/search/UiTPasAdvantageSearchContainer';
import UiTPasWelcomeAdvantageSearchContainer from './uitpas/search/UiTPasWelcomeAdvantageSearchContainer';
import {
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav bsStyle="tabs">
                        <LinkContainer to="/voordelen">
                            <NavItem>Voordelen</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/welkomstvoordelen">
                            <NavItem>Welkomstvoordelen</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Switch>
                        <Route exact path="/voordelen" component={UiTPasAdvantageSearchContainer}/>
                        <Route exact path="/welkomstvoordelen" component={UiTPasWelcomeAdvantageSearchContainer}/>
                        <Route component={UiTPasAdvantageSearchContainer}/>
                    </Switch>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
