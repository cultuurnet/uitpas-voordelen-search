import * as React from 'react';
import {
    TopBar,
    SearchBox,
    SimpleQueryString,
} from 'searchkit';

import UiTPasSearchConfig from '../UiTPasSearchConfig';

export default class UiTPasSearchBar extends React.Component {

    /**
     * Adds a wildcard to the end of the query to enable more flexible search.
     * @param queryString
     * @returns {{simple_query_string: ({query: any} & SimpleQueryStringOptions)}}
     */
    getQuery(queryString){
        return SimpleQueryString((queryString ? queryString.trim() + '*' : queryString));
    }

    render() {
      
        return (
            <TopBar>
                <SearchBox queryFields={this.props.searchFields}
                           queryBuilder={this.getQuery}
                           placeholder={UiTPasSearchConfig.get('searchPlaceholderText')}/>
            </TopBar>
        );
    }
};