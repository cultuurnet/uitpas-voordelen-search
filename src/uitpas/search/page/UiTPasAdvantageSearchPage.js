import * as React from 'react';
import {
    SearchkitProvider,
    Layout,
    LayoutResults,
} from 'searchkit';
import UiTPasSearchHits from '../hits/UiTPasSearchHits';
import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchFilters from '../bar/UiTPasSearchFilters';
import './UiTPasAdvantageSearchPage.css';
import UiTPasSearchBar from '../bar/UiTPasSearchBar';


export default class UiTPasAdvantageSearchPage extends UiTPasSearchPage {

    render() {
        
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getDefaultSearchkit()}>
                <Layout>
                    <UiTPasSearchBar searchFields={this.state.searchkit.getDefaultSearchFields()}/>
                    <LayoutResults>
                        <UiTPasSearchFilters showPointFilter={true}
                                             showCardSystemFilter={true}
                                             showTypeFilter={true}
                                             showExtraOptionFilter={true}
                                             renderCounterFilter={true}
                                             renderOwningCardSystemFilter={true}/>
                        <UiTPasSearchHits suggestField={this.state.searchkit.getDefaultSuggestField()}/>
                    </LayoutResults>
                </Layout>
            </SearchkitProvider>
        );
    }
}
