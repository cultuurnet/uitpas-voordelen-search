import * as React from "react";
import {
    SearchkitProvider,
    Layout,
    LayoutResults,
} from "searchkit";
import UiTPasSearchHits from '../hits/UiTPasSearchHits';
import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchFilters from '../bar/UiTPasSearchFilters';
import './UiTPasAdvantageSearchPage.css';
import UiTPasSearchBar from "../bar/UiTPasSearchBar";


export default class UiTPasAdvantageSearchPage extends UiTPasSearchPage {

    render() {
        
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getSearchKit()}>
                <Layout>
                    <UiTPasSearchBar searchFields={this.state.searchkit.getDefaultSearchFields()}/>
                    <LayoutResults>
                        <UiTPasSearchFilters showCardSystemFilter={true}
                                             showTypeFilter={true}
                                             showExtraOptionFilter={true}
                                             renderCounterFilter={true}/>
                        <UiTPasSearchHits suggestField={this.state.searchkit.getDefaultSuggestField()}/>
                    </LayoutResults>
                </Layout>
            </SearchkitProvider>
        );
    }
}
