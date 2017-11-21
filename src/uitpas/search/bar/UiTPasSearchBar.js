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
                <RefinementListFilter id="typesFilter"
                                      title="Type"
                                      field="type"
                                      operator="OR"
                                      orderKey="_term"
                                      listComponent={Select}/>
                <SearchBox queryFields={this.props.searchFields}
                           placeholder={'bv. CC De Werf'}/>
            </TopBar>
        );
    }
};