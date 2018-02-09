import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    SearchkitProvider,
    Layout,
} from 'searchkit';

import UiTPasSearchHits from '../hits/UiTPasSearchHits';
import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchFilters from '../bar/UiTPasSearchFilters';
import UiTPasSearchBar from '../bar/UiTPasSearchBar';
import UiTPasAdvantageDetail from '../detail/UiTPasAdvantageDetail';
import UiTResultsLayout from '../component/UiTResultsLayout';


export default class UiTPasAdvantageSearchPage extends UiTPasSearchPage {

    render() {

        const { match } = this.props;
        
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getDefaultSearchkit()}>
                <Layout>
                    <UiTPasSearchBar searchFields={this.state.searchkit.getDefaultSearchFields()}/>
                    <Switch>
                        <Route exact path={`${match.url}/:id`} component={UiTPasAdvantageDetail}/>
                        <Route path={match.url} render={() => (
                            <UiTResultsLayout searchkit={this.state.searchkit.getDefaultSearchkit()}>
                                <UiTPasSearchFilters showPointFilter={true}
                                                     showCardSystemFilter={true}
                                                     showTypeFilter={true}
                                                     showExtraOptionFilter={true}
                                                     renderCounterFilter={true}
                                                     renderOwningCardSystemFilter={true}/>
                                <UiTPasSearchHits suggestField={this.state.searchkit.getDefaultSuggestField()}/>
                            </UiTResultsLayout>
                        )}/>
                    </Switch>
                </Layout>
            </SearchkitProvider>
        );
    }
}
