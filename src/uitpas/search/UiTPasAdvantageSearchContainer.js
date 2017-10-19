import * as React from "react";
import {
    SearchkitProvider,
    SearchBox,
    RefinementListFilter,
    SelectedFilters,
    PageSizeSelector,
    Select
} from "searchkit";
import UiTPasSearchHits from './UiTPasSearchHits';
import UiTPasSearchContainer from './UiTPasSearchContainer';


export default class UiTPasAdvantageSearchContainer extends UiTPasSearchContainer {
    render() {
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getSearchKit()}>
                <div>
                    <SearchBox queryFields={["jobtitle", "profile", "functiondescription", "offer"]}/>
                    <RefinementListFilter id="functionTypes"
                                          title="Functie"
                                          field="functiontype"
                                          operator="AND"/>
                    <SelectedFilters/>
                    <div className="sk-action-bar__info">
                        <PageSizeSelector options={[9,12,18,24]} listComponent={Select}/>
                    </div>
                    <UiTPasSearchHits/>
                </div>
            </SearchkitProvider>
        );
    }
}