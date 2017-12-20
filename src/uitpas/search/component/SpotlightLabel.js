import * as React from 'react';
import PropTypes from 'prop-types';

// bovenop foto's

export class SpotlightLabel extends React.Component {

    static propTypes = {
        spotlight: PropTypes.bool,
    };

    render() {

        if (this.props.spotlight) {
            return (
                <div className={'sk-label ' + this.props.className}>In de kijker</div>
            );
        }

        return null;
    }
}
