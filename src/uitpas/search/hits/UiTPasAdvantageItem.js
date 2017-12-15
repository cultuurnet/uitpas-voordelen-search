import * as React from 'react';
import { withRouter } from 'react-router'
import { SearchkitComponent } from 'searchkit';
import { first, get, isArray, map } from 'lodash';
import { Link } from 'react-router-dom';

import { UiTImage } from '../component/UiTImage';
import { LastChanceLabel } from '../component/LastChanceLabel';
import { joinNicely } from '../helper/UiTPasArrayUtils';

let HtmlToReactParser = require('html-to-react').Parser;

class UiTPasAdvantageItem extends SearchkitComponent {

    render() {

        const { result, match } = this.props;

        let title = get(result, '_source.title', 'UiTPas Voordeel');
        let thumbUrl = get(result, '_source.pictures', this.defaultThumb);

        //_source.pictures can be double array:
        thumbUrl = (isArray(thumbUrl) ? (isArray(first(thumbUrl)) ? first(first(thumbUrl)) : first(thumbUrl)) : thumbUrl);

        let points = get(result, '_source.points', 0);
        let counters = get(result, '_source.balies', []);
        let detailPage = `${match.url}/${get(result, '_source.id', 0)}`;
        let cashingPeriodEnd = get(result, '_source.cashingPeriodEnd', null);

        return (
            <div className="sk-grid__item">
                <Link to={detailPage} className="sk-card sk-card--link sk-card--shadow">
                    <div className="sk-card__img">
                        <LastChanceLabel endDate={cashingPeriodEnd} className="sk-card__banner"/>
                        <UiTImage src={thumbUrl} alt={title} width={480} height={360}/>
                    </div>
                    <div className="sk-card__main">
                        <h3 className="sk-card__title">{title}</h3>
                        <p className="sk-card__text">{this.renderCounters(counters)}</p>
                        <div className="sk-card__label">{this.makePointsLabel(points)}</div>
                    </div>
                </Link>
            </div>
        );
    }

    makePointsLabel(points) {
        return points + (points === 1 ? ' punt' : ' punten');
    }

    renderCounters(counters) {

        let counterComps = map(counters, (counter) => {
            return '<span>' + counter.name + ', ' + counter.cityName + '</span>';
        });

        let countersHtml = joinNicely(counterComps, ', ', ' en ');
        let parser = new HtmlToReactParser();
        
        return parser.parse(countersHtml);
    }
}

export default withRouter(UiTPasAdvantageItem);