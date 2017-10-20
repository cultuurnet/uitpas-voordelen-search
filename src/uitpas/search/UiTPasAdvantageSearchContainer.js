import * as React from "react";
import {
    SearchkitProvider,
    SearchBox,
    RefinementListFilter,
    Layout,
    TopBar,
    Select,
    LayoutResults,
} from "searchkit";
import UiTPasSearchHits from './UiTPasSearchHits';
import UiTPasSearchContainer from './UiTPasSearchContainer';
import UiTPasSearchFilters from './UiTPasSearchFilters';
import './UiTPasAdvantageSearchContainer.css';


export default class UiTPasAdvantageSearchContainer extends UiTPasSearchContainer {
    render() {
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getSearchKit()}>
                <Layout>
                    <TopBar>
                        <RefinementListFilter id="typesFilter"
                                              title="Type"
                                              field="type"
                                              operator="AND"
                                              orderKey="_term"
                                              listComponent={Select}/>
                        <SearchBox queryFields={this.state.searchkit.getDefaultSearchFields()}
                                   placeholder={'Aanbieder of gemeente'}/>
                    </TopBar>
                    <LayoutResults>
                        <UiTPasSearchFilters showCardSystemFilter={true}
                                             showTypeFilter={true}
                                             showExtraOptionFilter={true}/>
                        <UiTPasSearchHits searchfields={this.state.searchkit.getDefaultSearchFields()}/>
                    </LayoutResults>
                </Layout>
            </SearchkitProvider>
        );
    }
}
