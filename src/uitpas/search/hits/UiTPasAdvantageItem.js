import * as React from "react";
import {
    SearchkitComponent
} from "searchkit";
import {
    get, first, isArray, isUndefined, map
} from "lodash";
import {
    Thumbnail,
    Label,
    Col
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import Truncate from 'react-truncate';
import {
    UiTPasThumbnail
} from '../component/UiTImage';

export default class UiTPasAdvantageItem extends SearchkitComponent {

    constructor(props){
        super(props);
        this.defaultThumb = '/img/default-thumb.png';
    }

    render() {
        let title = get(this.props.result, '_source.title', 'UiTPas Voordeel');
        let thumbUrl = get(this.props.result, '_source.pictures', this.defaultThumb);
        //_source.pictures can be double array:
        thumbUrl = (isArray(thumbUrl) ? (isArray(first(thumbUrl)) ? first(first(thumbUrl)) : first(thumbUrl)): thumbUrl);
        thumbUrl = (isUndefined(thumbUrl) ? this.defaultThumb : thumbUrl);
        let points = get(this.props.result, '_source.points', 0);
        let shops = get(this.props.result, '_source.balies', []);
        let detailPage = '/voordeel/' + get(this.props.result, '_source.id', 0);
        return (
            <Col xs={12} sm={6} md={4} className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))}>
                <UiTPasThumbnail src={thumbUrl} alt={title} maxWidth={200} maxHeight={200}>
                    <Link to={detailPage}>
                        <h3>{title}</h3>
                    </Link>
                    <p>
                        <Truncate lines={3} ellipsis={'…'}>
                            {get(this.props.result, '_source.description1', '')}
                        </Truncate>
                    </p>
                    <div className="uitpassearch-grid__hit-shop">
                        {map(shops, (shop) => {
                            return (<Label key={shop.actorId}>{shop.name}</Label>);
                        })}
                    </div>
                    <div className="uitpassearch-grid__hit-points">
                        <Label bsStyle="primary">{this.makePointsLabel(points)}</Label>
                    </div>
                </UiTPasThumbnail>
            </Col>
        );
    }

    makePointsLabel(points){
        return (points === 0 ? 'gratis' : points + ' punt' + (points === 1 ? '' : 'en'))
    }
}