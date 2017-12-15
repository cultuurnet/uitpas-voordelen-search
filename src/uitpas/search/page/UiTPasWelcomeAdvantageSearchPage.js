import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    SearchkitProvider,
    Layout,
    LayoutResults,
} from 'searchkit';

import UiTPasSearchHits from '../hits/UiTPasSearchHits';
import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchFilters from '../bar/UiTPasSearchFilters';
import UiTPasAdvantageDetail from '../detail/UiTPasAdvantageDetail';


export default class UiTPasWelcomeAdvantageSearchPage extends UiTPasSearchPage {

    render() {

        const { match } = this.props;
        
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getWelcomeSearchkit()}>
                <Layout>
                    <Switch>
                        <Route exact path={`${match.url}/:id`} component={UiTPasAdvantageDetail}/>
                        <Route path={match.url} render={() => (
                            <LayoutResults>
                                <UiTPasSearchFilters showCardSystemFilter={true}
                                                     showPointsFilter={false}
                                                     showTypeFilter={false}
                                                     renderCounterFilter={false}
                                                     renderOwningCardSystemFilter={true}/>
                                <UiTPasSearchHits suggestField={this.state.searchkit.getDefaultSuggestField()}/>
                            </LayoutResults>
                        )}/>
                    </Switch>
                </Layout>
            </SearchkitProvider>
        );
    }
}