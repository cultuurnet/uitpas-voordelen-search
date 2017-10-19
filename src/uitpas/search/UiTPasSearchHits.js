import * as React from "react";
import {
    SearchkitComponent,
    Hits,
    NoHits,
    InitialLoader,
    Pagination,
} from "searchkit";
import UiTPasInitialLoader from './UiTPasInitialLoader';
import UiTPasAdvantageItem from './UiTPasAdvantageItem';
import UiTPasHitsGrid from "./UiTPasHitsGrid";

export default class UiTPasSearchHits extends SearchkitComponent{
    render(){
        return (
            <div className="uitpas-hits">
                <Hits hitsPerPage={9}
                      itemComponent={UiTPasAdvantageItem}
                      listComponent={UiTPasHitsGrid}/>
                <NoHits translations={{
                        "NoHits.NoResultsFound":"Er werden geen UiTPas-voordelen gevonden voor {query}",
                        "NoHits.DidYouMean":"Bedoelde je {suggestion}?",
                        "NoHits.SearchWithoutFilters":"Zoek op {query} zonder filters"
                        }}
                        suggestionsField="jobtitle"/>
                <InitialLoader component={UiTPasInitialLoader}/>
                <Pagination showNumbers={true}/>
            </div>
        );
    }
}