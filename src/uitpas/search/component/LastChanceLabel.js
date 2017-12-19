import * as React from 'react';
import PropTypes from 'prop-types';
import UiTPasSearchConfig from '../UiTPasSearchConfig';

// bovenop foto's

export class LastChanceLabel extends React.Component {

    static propTypes = {
        endDate: PropTypes.string,
    };

    isLastChance() {
        let endDate = Date.parse(this.props.endDate);
        let weeks = UiTPasSearchConfig.get('lastChanceWeeks');
        return (endDate <= (new Date().getTime()) + weeks * 24 * 60 * 60 * 1000);
    }

    isDeprecated() {
        let endDate = Date.parse(this.props.endDate);
        return (endDate < new Date().getTime());
    }

    render() {
        
        if (this.props.endDate) {

            if (this.isLastChance()) {

                return (
                    <div className={'sk-label ' + this.props.className}>Laatste kans!</div>
                );
            }
        }

        return null;
    }
}