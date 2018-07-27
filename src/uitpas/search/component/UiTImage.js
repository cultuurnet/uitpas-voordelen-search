import * as React from 'react';
import PropTypes from 'prop-types';

import UitPasSearchConfig from '../UiTPasSearchConfig';

export class UiTImage extends React.Component {

    static propTypes = {
        src: PropTypes.string,
        maxHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        crop: PropTypes.bool,
    };

    static getUiTImageUrl(src, maxHeight, maxWidth, height, width, crop = false) {

        if (!src) return UitPasSearchConfig.get('defaultThumbUrl');
        src = src.replace(/^http:\/\//i, 'https://');

        let urlParams = [];

        if (maxHeight) {
            urlParams.push('maxheight=' + maxHeight);
        }

        if (maxWidth) {
            urlParams.push('maxwidth=' + maxWidth);
        }

        if (height) {
            urlParams.push('height=' + height);
        }

        if (width) {
            urlParams.push('width=' + width);
        }

        if (crop) {
            urlParams.push('crop=' + crop);
        }

        return src + '?' + urlParams.join('&');
    }

    render() {
        return (
            <img src={UiTImage.getUiTImageUrl(this.props.src, this.props.maxHeight, this.props.maxWidth, this.props.height, this.props.width, this.props.crop)}
                 alt={this.props.alt}/>
        );
    }
}