import * as React from "react";
import {
    SearchkitComponent,
    Hits,
    NoHits,
    InitialLoader,
    Pagination,
    HitsStats,
    ActionBar,
    ActionBarRow,
    SelectedFilters,
    ResetFilters,
} from "searchkit";
import UiTPasInitialLoader from './UiTPasInitialLoader';
import UiTPasAdvantageItem from './UiTPasAdvantageItem';
import UiTPasHitsGrid from "./UiTPasHitsGrid";

export default class UiTPasSearchHits extends SearchkitComponent{
    noHitsTranslation = {
        "NoHits.NoResultsFound": "Er werden geen UiTPas-voordelen gevonden voor '{query}'.",
        "NoHits.DidYouMean": "Bedoelde je '{suggestion}'?",
        "NoHits.SearchWithoutFilters": "Zoek op '{query}' zonder filters.",
        "NoHits.NoResultsFoundDidYouMean": "Er werden geen UiTPas-voordelen gevonden voor '{query}'. Bedoelde je '{suggestion}'?"
    };
    hitsStatsTranslation = {
        "hitstats.results_found": "{hitCount} voordelen gevonden"
    };
    paginationTranslation = {
        "pagination.previous": "Vorige",
        "pagination.next": "Volgende",
    };
    resetFiltersTranslations = {
        "reset.clear_all": "Verwijder alle filters",
    };

    render(){
        return (
            <div>
                <ActionBar>
                    <ActionBarRow>
                        <HitsStats translations={this.hitsStatsTranslation}/>
                    </ActionBarRow>
                    <ActionBarRow>
                        <SelectedFilters/>
                        <ResetFilters translations={this.resetFiltersTranslations}/>
                    </ActionBarRow>
                </ActionBar>
                <div className="uitpas-hits">
                    <Hits hitsPerPage={9}
                          itemComponent={UiTPasAdvantageItem}
                          listComponent={UiTPasHitsGrid}/>
                    <NoHits translations={this.noHitsTranslation}
                            suggestionsField={this.props.searchfields}/>
                    <InitialLoader component={UiTPasInitialLoader}/>
                    <Pagination showNumbers={true}
                                translations={this.paginationTranslation}/>
                </div>
            </div>
        );
    }
}