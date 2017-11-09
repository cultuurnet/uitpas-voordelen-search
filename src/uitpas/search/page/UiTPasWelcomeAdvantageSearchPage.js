import * as React from "react";
import {
    SearchkitProvider,
    Layout,
    LayoutResults,
} from "searchkit";
import UiTPasSearchPage from './UiTPasSearchPage';
import UiTPasSearchHits from '../hits/UiTPasSearchHits';
import UiTPasSearchFilters from '../bar/UiTPasSearchFilters';


export default class UiTPasWelcomeAdvantageSearchPage extends UiTPasSearchPage {
    render() {
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getSearchKit()}>
                <Layout>
                    <LayoutResults>
                        <UiTPasSearchFilters showCardSystemFilter={true} showTypeFilter={false}/>
                        <UiTPasSearchHits/>
                    </LayoutResults>
                </Layout>
            </SearchkitProvider>
        );
    }
}