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
} from 'searchkit';
import './UiTPasSearchFilters.css';
import PropTypes from 'prop-types';

export default class UiTPasSearchFilters extends React.Component {
    rangeFilterTranslation = {
        "range.submit": "filter",
    };

    renderTypeFilter(){
        if(this.props.showTypeFilter){
            return (<Col sm={12} md={3}>
                        <DynamicRangeFilter field="points"
                                            id="pointsFilter"
                                            title="Puntenaantal"
                                            translations={this.rangeFilterTranslation}
                                            containerComponent={<Panel collapsable={true} defaultCollapsed={false} className="uitpassearch-filters-pnl-type"/>}
                                            rangeComponent={RangeSliderInput}/>
                    </Col>);
        }
    }

    renderCardSystemFilter(){
        if(this.props.showCardSystemFilter){
            return (<Col sm={12} md={3}>
                        <RefinementListFilter field="applicableCardSystems.name.keyword"
                                              id="cardSystemsFilter"
                                              title="Voordeel aangeboden door"
                                              operator="OR"
                                              containerComponent={<Panel collapsable={true} defaultCollapsed={false} className="uitpassearch-filters-pnl-cardsystem"/>}/>
                    </Col>);
        }
    }

    render(){
        return (
            <Row className="uitpassearch-options-filters uitpassearch-row">
                {this.renderTypeFilter()}
                {this.renderCardSystemFilter()}
            </Row>
        );
    }
}

UiTPasSearchFilters.propTypes = {
    showTypeFilter: PropTypes.bool,
    showCardSystemFilter: PropTypes.bool,
};
