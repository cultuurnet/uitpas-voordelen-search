import * as React from "react";
import PropTypes from 'prop-types';
import UiTPasSearchConfig from '../UiTPasSearchConfig';
import {Label} from 'react-bootstrap';

export class LastChanceLabel extends React.Component {
    static propTypes = {
        endDate: PropTypes.string,
    };

    isLastChance(){
        let endDate = Date.parse(this.props.endDate);
        let weeks = UiTPasSearchConfig.get('lastChanceWeeks');
        return (endDate <= (new Date().getTime()) + weeks * 24 * 60 * 60 * 1000);
    }

    isDeprecated(){
        let endDate = Date.parse(this.props.endDate);
        return (endDate < new Date().getTime());
    }

    render(){
        if(this.props.endDate) {
            if (this.isDeprecated()) {
                return (
                    <Label bsStyle="primary">Te laat...</Label>
                );
            }
            else if (this.isLastChance()) {
                return (
                    <Label bsStyle="primary">Laatste kans!</Label>
                );
            }
        }
        return null;
    }
}