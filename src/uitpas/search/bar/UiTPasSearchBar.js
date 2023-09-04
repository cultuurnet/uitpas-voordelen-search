import * as React from "react";
import { TopBar, SearchBox, SimpleQueryString } from "searchkit";

import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTPasSearchBar extends React.Component {
  wrapQueryInQuotes(queryString) {
    if (queryString.startsWith(`"`) && queryString.endsWith(`"`))
      return queryString;

    return queryString.includes("-") ? `"${queryString}"` : queryString;
  }
  /**
   * Adds a wildcard to the end of the query to enable more flexible search.
   * @param queryString
   * @returns {{simple_query_string: ({query: any} & SimpleQueryStringOptions)}}
   */
  getQuery() {
    let fields = this.props.searchFields;
    return (queryString) => {
      const wrappedQueryString = this.wrapQueryInQuotes(queryString);

      return SimpleQueryString(
        wrappedQueryString && UiTPasSearchConfig.get("fuzzySearch")
          ? wrappedQueryString.trim() + "*"
          : wrappedQueryString,
        {
          fields: fields,
        },
      );
    };
  }

  render() {
    return (
      <TopBar>
        <SearchBox
          queryFields={this.props.searchFields}
          queryBuilder={this.getQuery()}
          placeholder={UiTPasSearchConfig.get("searchPlaceholderText")}
        />
      </TopBar>
    );
  }
}
