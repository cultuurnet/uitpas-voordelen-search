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
    RangeInput,
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

    renderPointsFilter(){
        if(this.props.showPointFilter){
            return (
                <Col sm={12} md={3}>
                    <DynamicRangeFilter field="points"
                                        id="pointsFilter"
                                        title="Puntenaantal"
                                        containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-point"/>}
                                        rangeComponent={<RangeInput translations={this.rangeFilterTranslation}
                                                                    translate={(lbl) => this.rangeFilterTranslation[lbl]}/>}/>
                </Col>);
            //Remark: the translation function of the range component is overridden because the searchkit library contains a bug.
        }
    }

    renderTypeFilter(){
        if(this.props.showTypeFilter){
            return (
                <Col sm={12} md={3}>
                    <RefinementListFilter id="typesFilter"
                                          title="Type"
                                          field="type"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                </Col>
            );
        }
    }

    renderCardSystemFilter(){
        if(this.props.showCardSystemFilter){
            return (
                <Col sm={12} md={3}>
                    <RefinementListFilter field="applicableCardSystems.name.keyword"
                                          id="cardSystemsFilter"
                                          title="Voordeel aangeboden door"
                                          operator="OR"
                                          containerComponent={<Panel collapsable={true} defaultCollapsed={true} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                </Col>);
        }
    }

    renderExtraOptionFilter(){
        if(this.props.showExtraOptionFilter){
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
    renderHiddenCounterFilter(){
        if(this.props.renderCounterFilter){
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

    render(){
        return (
            <div className="uitpassearch-row">
                <p className="lead">Verfijn je resultaat</p>
                <Row className="uitpassearch-options-filters uitpassearch-row">
                    {this.renderPointsFilter()}
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
    showPointFilter: PropTypes.bool,
    showTypeFilter: PropTypes.bool,
    showCardSystemFilter: PropTypes.bool,
    showExtraOptionFilter: PropTypes.bool,
    renderCounterFilter: PropTypes.bool,
};
