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
import Truncate from 'react-truncate';

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
        return (
            <Col xs={12} sm={6} md={4} className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))}>
                <Thumbnail src={thumbUrl} alt={title}>
                    <h3>{title}</h3>
                    <p>
                        <Truncate lines={3} ellipsis={'…'}>
                            {get(this.props.result, '_source.description1', '')}
                        </Truncate>
                    </p>
                    <div className="uitpassearch-grid__hit-shop">
                        {map(shops, (shop) => {
                            return (<Label>{shop.name}</Label>);
                        })}
                    </div>
                    <div className="uitpassearch-grid__hit-points">
                        <Label bsStyle="primary">{this.makePointsLabel(points)}</Label>
                    </div>
                </Thumbnail>
            </Col>
        );
    }

    makePointsLabel(points){
        return (points === 0 ? 'gratis' : points + ' punt' + (points === 1 ? '' : 'en'))
    }

/*<div className="col-sm-6 col-md-4">
                    <div className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item")) + ' thumbnail'}>
                        <img src={thumbUrl} alt={title} className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))}/>
                        <div className="caption">
                            <h3>{title}</h3>
                            <p>{get(this.props.result, '_source.description1', '')}</p>
                            <p>
                                <Button bsStyle="primary">Button</Button>&nbsp;
                                <Button bsStyle="default">Button</Button>
                            </p>
                        </div>
                    </div>
                </div>*/
}