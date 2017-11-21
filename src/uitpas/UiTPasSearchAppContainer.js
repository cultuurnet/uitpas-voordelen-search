import React, { Component } from 'react';
import UiTPasAdvantageSearchPage from './search/page/UiTPasAdvantageSearchPage';
import UiTPasWelcomeAdvantageSearchPage from './search/page/UiTPasWelcomeAdvantageSearchPage';
import {
    Nav,
    NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Switch } from 'react-router-dom';
import UiTPasDetailPage from "./search/page/UiTPasDetailPage";


class UiTPasSearchAppContainer extends Component {

    render() {
        
        return (
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
