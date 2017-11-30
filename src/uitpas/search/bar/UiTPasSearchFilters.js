import * as React from 'react';
import {
    DynamicRangeFilter,
    Panel,
    RefinementListFilter,
    RangeInput,
    CheckboxFilter,
    TermQuery,
    RangeQuery,
} from 'searchkit';
import PropTypes from 'prop-types';
import UiTPasSearchConfig from '../UiTPasSearchConfig';

export default class UiTPasSearchFilters extends React.Component {

    rangeFilterTranslation = {
        "range.submit": "Toepassen",
    };

    renderPointsFilter(){
        if(this.props.showPointFilter){
            return (
                <div className="sk-grid__12 sk-grid--bp-med__3">
                    <DynamicRangeFilter field="points"
                                        id="pointsFilter"
                                        title="Puntenaantal"
                                        containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-point"/>}
                                        rangeComponent={<RangeInput translations={this.rangeFilterTranslation}
                                                                    translate={(lbl) => this.rangeFilterTranslation[lbl]}/>}/>
                </div>);
            //Remark: the translation function of the range component is overridden because the searchkit library contains a bug.
        }
    }

    renderTypeFilter(){
        if(this.props.showTypeFilter){
            return (
                <div className="sk-grid__12 sk-grid--bp-med__3">
                    <RefinementListFilter id="typesFilter"
                                          title="Type"
                                          field="type"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                </div>
            );
        }
    }

    renderCardSystemFilter() {

        if (this.props.showCardSystemFilter) {

            return (
                <div className="sk-grid__12 sk-grid--bp-med__3">
                    <RefinementListFilter field="applicableCardSystems.name.keyword"
                                          id="cardSystemsFilter"
                                          title="Voordeel aangeboden door"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                </div>
            );
        }
    }

    renderExtraOptionFilter() {

        if (this.props.showExtraOptionFilter) {

            return (
                <div className="sk-grid__12 sk-grid--bp-med__3">
                    <Panel title="Extra opties"
                           collapsable={true}
                           defaultCollapsed={true}
                           className="sk-panel--spaced">
                        <CheckboxFilter id="childrenFilter"
                                        label="Speciaal voor kinderen"
                                        title=""
                                        filter={TermQuery("forKids", true)}/>
                        <CheckboxFilter id="sportFilter"
                                        label="Sportactiviteiten"
                                        title=""
                                        filter={TermQuery("sport", true)}/>
                        <CheckboxFilter id="lastChance"
                                        label="Laatste kans"
                                        title=""
                                        filter={RangeQuery("cashingPeriodEnd", {
                                            "lt": "now+" + UiTPasSearchConfig.get('lastChanceWeeks') + "w/d",
                                            "gte": "now/d"
                                        })}/>
                    </Panel>
                </div>
            );
        }
    }

    /**
     * NOTE: This filter is added to be able to easily filter on counters for the link related items block
     * on the detail page. By adding this filter we have created an API to filter on counters on the
     * search pages.
     */
    renderHiddenCounterFilter() {

        if (this.props.renderCounterFilter) {
            //do not show this filter to the user.
            let hideFilterStyle = {
                display: 'none',
            };

            return (
                <div style={hideFilterStyle}>
                    <RefinementListFilter field="balies.name.keyword"
                                          id="countersFilter"
                                          title="Balies"
                                          operator="OR"/>
                </div>
            );
        }
    }

    /**
     * NOTE: This filter is added to be able to easily filter on owning card systems to allow filtering
     * on the owner of an advantage via the configuration.
     */
    renderHiddenOwningCardSystemFilter() {

        if (this.props.renderOwningCardSystemFilter) {
            //do not show this filter to the user.
            let hideFilterStyle = {
                display: 'none',
            };

            return (
                <div style={hideFilterStyle}>
                    <RefinementListFilter field="owningCardSystem.name"
                                          id="owningCardSystemFilter"
                                          title="Voordeel eigendom van"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={false} className="uitpassearch-filters-pnl-owningcardsystem"/>}/>
                </div>
            );
        }
    }

    render() {
        
        return (
            <div>
                <p className="lead">Verfijn je resultaat</p>
                <div className="sk-grid">
                    {this.renderPointsFilter()}
                    {this.renderTypeFilter()}
                    {this.renderExtraOptionFilter()}
                    {this.renderCardSystemFilter()}
                    {this.renderHiddenCounterFilter()}
                </div>
                {this.renderHiddenOwningCardSystemFilter()}
                <hr/>
            </div>
        );
    }
}

UiTPasSearchFilters.propTypes = {
    showPointFilter: PropTypes.bool,
    showTypeFilter: PropTypes.bool,
    showCardSystemFilter: PropTypes.bool,
    showExtraOptionFilter: PropTypes.bool,
    renderCounterFilter: PropTypes.bool,
    renderOwningCardSystemFilter: PropTypes.bool,
};
