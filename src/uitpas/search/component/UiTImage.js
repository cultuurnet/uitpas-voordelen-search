import * as React from "react";
import PropTypes from 'prop-types';
import {
    Thumbnail
} from 'react-bootstrap';


export class UiTImage extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        maxHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        crop: PropTypes.bool,
    };

    static getUiTImageUrl(src, maxHeight, maxWidth, height, width, crop=false){
        let urlParams = [];
        if(maxHeight) {
            urlParams.push('maxheight=' + maxHeight);
        }
        if(maxWidth){
            urlParams.push('maxwidth=' + maxWidth);
        }
        if(height) {
            urlParams.push('height=' + maxHeight);
        }
        if(width){
            urlParams.push('width=' + maxWidth);
        }
        if(crop){
            urlParams.push('crop=' + crop);
        }
        return src + '?' + urlParams.join('&');
    }

    render(){
        return (
            <img src={UiTImage.getUiTImageUrl(this.props.src, this.props.maxHeight, this.props.maxWidth, this.props.height, this.props.width, this.props.crop)}
                 alt={this.props.alt}/>
        );
    }
}

export class UiTPasThumbnail extends Thumbnail {
    render(){
        return (
            <Thumbnail src={UiTImage.getUiTImageUrl(this.props.src, this.props.maxHeight, this.props.maxWidth, this.props.height, this.props.width, this.props.crop)}
                       alt={this.props.alt}
                       href={this.props.href}
                       onError={this.props.onError}
                       onLoad={this.props.onLoad}>
                {this.props.children}
            </Thumbnail>
        );
    }
}

//append extra propTypes to thumbnail propTypes:
let thumbnailPropTypes = Thumbnail.propTypes;
thumbnailPropTypes.maxHeight = PropTypes.number;
thumbnailPropTypes.maxWidth = PropTypes.number;
thumbnailPropTypes.height = PropTypes.number;
thumbnailPropTypes.width = PropTypes.number;
thumbnailPropTypes.crop = PropTypes.bool;

UiTPasThumbnail.propTypes = thumbnailPropTypes;