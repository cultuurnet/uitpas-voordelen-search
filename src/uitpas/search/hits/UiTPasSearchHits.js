import * as React from 'react';
import {
    SearchkitComponent,
    Hits,
    NoHits,
    InitialLoader,
    // Pagination,
    HitsStats,
    ActionBar,
    ActionBarRow,
    SelectedFilters,
    ResetFilters,
    SortingSelector,
    PageSizeSelector,
    Select,
} from 'searchkit';

import CustomPagination from '../component/CustomPagination';
import UiTPasInitialLoader from './UiTPasInitialLoader';
import UiTPasAdvantageItem from './UiTPasAdvantageItem';
import UiTPasHitsGrid from './UiTPasHitsGrid';
import UiTPasFilterItem from './UiTPasFilterItem';
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTPasSearchHits extends SearchkitComponent {

    noHitsTranslation = {
        "NoHits.NoResultsFound": "Er werden geen UiTPas-voordelen gevonden voor '{query}'.",
        "NoHits.DidYouMean": "Bedoelde je '{suggestion}'?",
        "NoHits.SearchWithoutFilters": "Zoek op '{query}' zonder filters.",
        "NoHits.NoResultsFoundDidYouMean": "Er werden geen UiTPas-voordelen gevonden voor '{query}'. Bedoelde je '{suggestion}'?",
        "NoHits.Error":"Oeps! Er is wat misgelopen bij het ophalen van de UiTPas voordelen. Probeer het later nog eens.",
        "NoHits.ResetSearch":"Herinitialiseer de zoekopdracht",
    };

    hitsStatsTranslation = {
        "hitstats.results_found": "{hitCount} voordelen gevonden"
    };

    paginationTranslation = {
        "pagination.previous": "‹",
        "pagination.next": "›",
    };

    resetFiltersTranslations = {
        "reset.clear_all": "Verwijder alle filters",
    };

    render() {

        return (
            <div>
                <ActionBar>
                    <ActionBarRow>
                        <SelectedFilters itemComponent={UiTPasFilterItem}/>
                        <ResetFilters translations={this.resetFiltersTranslations}/>
                    </ActionBarRow>
                    <ActionBarRow>
                        <HitsStats translations={this.hitsStatsTranslation}/>
                        <div>
                            <span>Sorteer op</span>
                            <SortingSelector
                                options={[
                                    /*{ label: 'Meest recent', field: 'creationDate', order: 'desc', key: 'mostRecent', defaultOption: true },*/
                                    { label: 'Meest recent', key: 'mostRecent', defaultOption: true, fields: this.getMostRecentSortingFields()},
                                    { label: 'Meest omgeruild', field: 'unitsTaken', order: 'desc', key: 'mostBartered' },
                                    { label: 'Puntenaantal laag - hoog', field: 'points', order: 'asc', key: 'pointsHighLow' },
                                    { label: 'Puntenaantal hoog - laag', field: 'points', order: 'desc', key: 'pointsLowHigh' }
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
                        <PageSizeSelector options={[12,24,36]} listComponent={Select}/>
                    </ActionBarRow>
                    <ActionBarRow>
                        <CustomPagination showNumbers={true}
                                          translations={this.paginationTranslation}/>
                    </ActionBarRow>
                </ActionBar>
            </div>
        );
    }

    getMostRecentSortingFields(){
        let fields = [];
        if(UiTPasSearchConfig.get('inSpotlightSticky')){
            fields.push({field:"inSpotlight", options: {order:"desc"}});
        }
        fields.push({field:"creationDate", options: {order:"desc"}});
        return fields;
    }
}