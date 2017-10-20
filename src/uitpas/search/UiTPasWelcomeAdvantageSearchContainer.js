import * as React from "react";
import {
    SearchkitProvider,
    Layout,
    LayoutResults,
} from "searchkit";
import UiTPasSearchContainer from './UiTPasSearchContainer';
import UiTPasSearchHits from './UiTPasSearchHits';
import UiTPasSearchFilters from './UiTPasSearchFilters';


export default class UiTPasWelcomeAdvantageSearchContainer extends UiTPasSearchContainer {
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