import * as React from "react";
import {
    SearchkitProvider,
    SearchBox,
} from "searchkit";
import UiTPasSearchContainer from './UiTPasSearchContainer';
import UiTPasSearchHits from './UiTPasSearchHits';


export default class UiTPasWelcomeAdvantageSearchContainer extends UiTPasSearchContainer {
    render() {
        return (
            <SearchkitProvider searchkit={this.state.searchkit.getSearchKit()}>
                <div>
                    <SearchBox queryFields={["jobtitle", "profile", "functiondescription", "offer"]}/>
                    <UiTPasSearchHits/>
                </div>
            </SearchkitProvider>
        );
    }
}