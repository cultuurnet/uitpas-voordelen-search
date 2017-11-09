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
    SortingSelector,
    PageSizeSelector,
    Select,
} from "searchkit";
import UiTPasInitialLoader from './UiTPasInitialLoader';
import UiTPasAdvantageItem from './UiTPasAdvantageItem';
import UiTPasHitsGrid from "./UiTPasHitsGrid";
import './UiTPasSearchHits.css';

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
                        <SelectedFilters/>
                        <ResetFilters translations={this.resetFiltersTranslations}/>
                    </ActionBarRow>
                    <ActionBarRow>
                        <HitsStats translations={this.hitsStatsTranslation}/>
                        <div>
                            <span>Sorteer op</span>
                            <SortingSelector
                                options={[
                                    {label:"Meest recent", field:"creationDate", order:"desc", key: "mostRecent", defaultOption:true},
                                    {label:"Meest omgeruild", field:"unitsTaken", order:"desc", key:"mostBartered"},
                                    {label:"Puntenaantal laag - hoog", field:"points", order:"desc", key:"pointsHighLow"},
                                    {label:"Puntenaantal hoog - laag", field:"points", order:"asc", key:"pointsLowHigh"}
                                ]}/>
                        </div>
                    </ActionBarRow>
                </ActionBar>
                <div className="uitpas-hits">
                    <Hits hitsPerPage={12}
                          itemComponent={UiTPasAdvantageItem}
                          listComponent={UiTPasHitsGrid}/>
                    <NoHits translations={this.noHitsTranslation}
                            suggestionsField={this.props.suggestField}/>
                    <InitialLoader component={UiTPasInitialLoader}/>
                </div>
                <ActionBar>
                    <ActionBarRow>
                        <span className="sort-lbl">Resultaten per pagina</span>
                        <PageSizeSelector options={[12,30,60]} listComponent={Select}/>
                    </ActionBarRow>
                    <ActionBarRow>
                        <Pagination showNumbers={true}
                                    translations={this.paginationTranslation}/>
                    </ActionBarRow>
                </ActionBar>
            </div>
        );
    }
}