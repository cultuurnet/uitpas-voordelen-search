import * as React from "react";
import {
    Col,
    Row,
} from 'react-bootstrap';
import {
    DynamicRangeFilter,
    Panel,
    RefinementListFilter,
    RangeSliderInput,
    CheckboxFilter,
    TermQuery,
    RangeQuery,
} from 'searchkit';
import PropTypes from 'prop-types';
import UiTPasSearchConfig from '../UiTPasSearchConfig';

export default class UiTPasSearchFilters extends React.Component {

    rangeFilterTranslation = {
        "range.submit": "filter",
    };

    renderTypeFilter() {

        if (this.props.showTypeFilter) {

            return (
                <Col sm={12} md={3}>
                    <DynamicRangeFilter field="points"
                                        id="pointsFilter"
                                        title="Puntenaantal"
                                        translations={this.rangeFilterTranslation}
                                        containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-type"/>}
                                        rangeComponent={RangeSliderInput}/>
                </Col>
            );
        }
    }

    renderCardSystemFilter() {

        if (this.props.showCardSystemFilter) {

            return (
                <Col sm={12} md={3}>
                    <RefinementListFilter field="applicableCardSystems.name.keyword"
                                          id="cardSystemsFilter"
                                          title="Voordeel aangeboden door"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                </Col>
            );
        }
    }

    renderExtraOptionFilter() {
        if (this.props.showExtraOptionFilter) {
            return (
                <Col sm={12} md={3}>
                    <Panel title="Extra opties"
                           collapsable={true}
                           defaultCollapsed={true}
                           className="uitpassearch-filters-pnl-extraoptions">
                        <CheckboxFilter id="childrenFilter"
                                        label="Speciaal voor kinderen"
                                        filter={TermQuery("forKids", true)} />
                        <CheckboxFilter id="sportFilter"
                                        label="Sportactiviteiten"
                                        filter={TermQuery("sport", true)} />
                        <CheckboxFilter id="lastChance"
                                        label="Laatste kans"
                                        filter={RangeQuery("cashingPeriodEnd", {
                                            "lt": "now+" + UiTPasSearchConfig.get('lastChanceWeeks') + "w/d",
                                            "gte": "now/d"
                                        })} />
                    </Panel>
                </Col>
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

    render() {
        
        return (
            <div className="uitpassearch-row">
                <p className="lead">Verfijn je resultaat</p>
                <Row className="uitpassearch-options-filters uitpassearch-row">
                    {this.renderTypeFilter()}
                    {this.renderExtraOptionFilter()}
                    {this.renderCardSystemFilter()}
                    {this.renderHiddenCounterFilter()}
                </Row>
                <hr/>
            </div>
        );
    }
}

UiTPasSearchFilters.propTypes = {
    showTypeFilter: PropTypes.bool,
    showCardSystemFilter: PropTypes.bool,
    showExtraOptionFilter: PropTypes.bool,
    renderCounterFilter: PropTypes.bool,
};
