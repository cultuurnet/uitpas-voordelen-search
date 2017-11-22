import * as React from "react";
import {
    TopBar,
    RefinementListFilter,
    SearchBox,
    Select,
} from "searchkit";

export default class UiTPasSearchBar extends React.Component {
    render() {
        return (
            <TopBar>
                <SearchBox queryFields={this.props.searchFields}
                           placeholder={'Naam voordeel, organisator of gemeente'}/>
            </TopBar>
        );
    }
};