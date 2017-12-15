import * as React from 'react';
import PropTypes from 'prop-types';
import {
    DynamicRangeFilter,
    Panel,
    RefinementListFilter,
    RangeInput,
    CheckboxFilter,
    TermQuery,
    RangeQuery,
} from 'searchkit';

import UiTPasSearchConfig from '../UiTPasSearchConfig';

RefinementListFilter.prototype.componentDidMount = function () {

    if (this.props.id !== 'cardSystemsFilter') return;

    const cardSystemsChecked = UiTPasSearchConfig.get('cardSystemsChecked');

    if (!window.location.search.length) {
        //this.setFilters(cardSystemsChecked);
    }
};

export default class UiTPasSearchFilters extends React.Component {

    rangeFilterTranslation = {
        "range.submit": "Toepassen",
    };

    renderPointsFilter() {

        if (!this.props.showPointFilter) return null;

        return (
            <div className="sk-grid__12 sk-grid--bp-med__3">
                <DynamicRangeFilter field="points"
                                    id="pointsFilter"
                                    title="Puntenaantal"
                                    containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                                    rangeComponent={<RangeInput translations={this.rangeFilterTranslation}
                                                                translate={(lbl) => this.rangeFilterTranslation[lbl]}/>}/>
            </div>
        );
        //Remark: the translation function of the range component is overridden because the searchkit library contains a bug.
    }

    renderTypeFilter() {

        if (!this.props.showTypeFilter) return null;

        return (
            <div className="sk-grid__12 sk-grid--bp-med__3">
                <RefinementListFilter id="typesFilter"
                                      title="Type"
                                      field="type"
                                      operator="OR"
                                      containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}/>
            </div>
        );
    }

    renderExtraOptionFilter() {

        if (!this.props.showExtraOptionFilter) return null;

        return (
            <div className="sk-grid__12 sk-grid--bp-med__3">
                <Panel title="Extra opties"
                       collapsable={true}
                       defaultCollapsed={true}>
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

    renderCardSystemFilter() {

        if (!this.props.showCardSystemFilter) return null;

        const cardSystemsVisible = UiTPasSearchConfig.get('cardSystemsVisible');

        let filterStyle = {};

        if (!cardSystemsVisible) {

            filterStyle = { display: 'none' };
        }

        return (
            <div className="sk-grid__12 sk-grid--bp-med__3" style={filterStyle}>
                <RefinementListFilter field="owningCardSystem.name"
                                      id="cardSystemsFilter"
                                      title="Voordeel aangeboden door"
                                      operator="OR"
                                      containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}/>
            </div>
        );
    }

    /**
     * NOTE: This filter is added to be able to easily filter on counters for the link related items block
     * on the detail page. By adding this filter we have created an API to filter on counters on the
     * search pages.
     */
    renderHiddenCounterFilter() {

        if (!this.props.renderCounterFilter) return null;

        //do not show this filter to the user.
        let filterStyle = { display: 'none' };

        return (
            <div style={filterStyle}>
                <RefinementListFilter field="balies.name.keyword"
                                      id="countersFilter"
                                      title="Balies"
                                      operator="OR"/>
            </div>
        );
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
                <hr className="sk-hr"/>
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
