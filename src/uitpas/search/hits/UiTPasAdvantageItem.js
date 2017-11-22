import * as React from "react";
import {SearchkitComponent} from "searchkit";
import {first, get, isArray, isUndefined, map} from "lodash";
import {Col, Label} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {UiTPasThumbnail} from '../component/UiTImage';
import {LastChanceLabel} from "../component/LastChanceLabel";
import {joinNicely} from "../helper/UiTPasArrayUtils";
import './UiTPasAdvantageItem.css';

let HtmlToReactParser = require('html-to-react').Parser;

export default class UiTPasAdvantageItem extends SearchkitComponent {

    render() {
        let title = get(this.props.result, '_source.title', 'UiTPas Voordeel');
        let thumbUrl = get(this.props.result, '_source.pictures', this.defaultThumb);
        //_source.pictures can be double array:
        thumbUrl = (isArray(thumbUrl) ? (isArray(first(thumbUrl)) ? first(first(thumbUrl)) : first(thumbUrl)): thumbUrl);
        let points = get(this.props.result, '_source.points', 0);
        let counters = get(this.props.result, '_source.balies', []);
        let detailPage = '/voordeel/' + get(this.props.result, '_source.id', 0);
        let cashingPeriodEnd = get(this.props.result, '_source.cashingPeriodEnd', null);
        return (
            <Col xs={12} sm={6} md={4} className="uitpassearch-hits-item">
                <UiTPasThumbnail src={thumbUrl} alt={title} maxWidth={200} maxHeight={200}>
                    <LastChanceLabel endDate={cashingPeriodEnd}/>
                    <Link to={detailPage}>
                        <h3>{title}</h3>
                    </Link>
                    <div className="uitpassearch-grid__hit-counter">
                        {this.renderCounters(counters)}
                    </div>
                    <div className="uitpassearch-grid__hit-points">
                        <h3><Label bsStyle="primary">{this.makePointsLabel(points)}</Label></h3>
                    </div>
                </UiTPasThumbnail>
            </Col>
        );
    }

    makePointsLabel(points){
        return (points === 0 ? 'gratis' : points + ' punt' + (points === 1 ? '' : 'en'))
    }

    renderCounters(counters){
        let counterComps = map(counters, (counter) => {
            return '<span>' + counter.name + ' te ' + counter.cityName + '</span>';
        });
        let countersHtml = joinNicely(counterComps, ', ', ' en ');
        let parser = new HtmlToReactParser();
        return parser.parse(countersHtml);
    }
}