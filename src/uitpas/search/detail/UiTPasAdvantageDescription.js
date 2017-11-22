import * as React from 'react';
import { get, map } from 'lodash';
import moment from 'moment';
import { Label } from 'react-bootstrap';

import { UiTImage } from "../component/UiTImage";
import { UiTPasCounter } from "./UiTPasCounter";
import { LastChanceLabel } from '../component/LastChanceLabel';


import './UiTPasAdvantageDetail.css';

export default class UiTPasAdvantageDescription extends React.Component {

    render() {

        return (
            <div className="sk-grid">
                <div className="sk-grid__12 sk-grid--bp-med__6">
                    <h1>{this.props.advantage.title}</h1>
                    {this.renderCounters()}
                    {this.renderDescription()}
                    {this.renderMoreInfo()}
                    {this.renderPracticalInfo()}
                    {this.renderAvailability()}
                </div>
                <div className="sk-grid__12 sk-grid--bp-med__6">
                    {this.renderPoints()}
                    <LastChanceLabel endDate={this.props.advantage.cashingPeriodEnd}/>
                    {this.renderImage()}
                </div>
            </div>
        );
    }

    renderCounters() {

        if (this.props.advantage.balies && this.props.advantage.balies.length > 0) {

            return (
                <dl>
                    <dt>Omruilen bij:</dt>
                    <dd>{map(this.props.advantage.balies, (counter, index) => {
                        return (<span
                            key={counter.actorId}>{counter.name}{index < this.props.advantage.balies.length - 1 ? ',\u00A0' : ''}</span>);
                    })}
                    </dd>
                </dl>
            );
        } else {
            return null;
        }
    }

    renderDescription() {

        let descriptions = [];

        if (this.props.advantage.description1 && this.props.advantage.description1.trim() !== '') {
            descriptions.push(<p key="description1">{this.props.advantage.description1}</p>);
        }

        if (this.props.advantage.description2 && this.props.advantage.description2.trim() !== '') {
            descriptions.push(<p key={"description2"}>{this.props.advantage.description2}</p>);
        }

        return (
            <div>
                {descriptions}
            </div>
        );
    }

    renderMoreInfo() {

        if (this.props.advantage.moreInfoURL && this.props.advantage.moreInfoURL.trim() !== '') {

            return (
                <dl>
                    <dt>Meer info:</dt>
                    <dd><a href={this.props.advantage.moreInfoURL}>{this.props.advantage.moreInfoURL}</a></dd>
                </dl>
            );
        } else {
            return null;
        }
    }

    renderPracticalInfo() {

        if (this.props.advantage.balies && this.props.advantage.balies.length > 0) {

            return (
                <dl>
                    <dt>Praktische info:</dt>
                    {map(this.props.advantage.balies, function(counter){
                        return (
                            <dd key={counter.actorId}>
                                <UiTPasCounter counterId={counter.actorId}/>
                            </dd>
                        );
                    })}
                </dl>
            );
        } else {
            return null;
        }
    }

    renderPoints() {

        if (this.props.advantage.points) {

            return (
                <h2>
                    <Label className="uitpassearch-detail-points-lbl">{this.props.advantage.points} <small>punten</small></Label>
                </h2>
            );
        } else {
            return null;
        }
    }

    renderImage() {

        if (this.props.advantage.pictures && this.props.advantage.pictures.length > 0 && this.props.advantage.pictures[0].length > 0 ) {

            return (
                <UiTImage src={this.props.advantage.pictures[0][0]}
                          maxWidth={500}
                          maxHeight={500}
                          alt={this.props.advantage.title}/>
            );
        } else {
            return null;
        }
    }

    renderAvailability() {

        let availability = 'Dit voordeel is niet meer voorrading. ';

        if (this.props.advantage.maxAvailableUnits && this.props.advantage.maxAvailableUnits > 0) {

            availability = this.props.advantage.maxAvailableUnits + ' beschikbaar';

            if (this.props.advantage.cashingPeriodBegin) {
                availability += ' vanaf ' + this.formatDate(this.props.advantage.cashingPeriodBegin);
            }

            if (this.props.advantage.cashingPeriodEnd) {
                availability += ' tot ' + this.formatDate(this.props.advantage.cashingPeriodEnd);
            }

            availability += '. ';

            if (this.props.advantage.periodConstraint && this.props.advantage.periodConstraint.type) {
                availability += ' Maximaal ' + this.props.advantage.periodConstraint.volume + ' per ' + this.renderPeriodConstraintType(this.props.advantage.periodConstraint.type) + '.';
            }
        }

        return (
            <dl>
                <dt>Beschikbaarheid:</dt>
                <dd>{availability}</dd>
                {this.renderApplicableCards()}
                {this.renderOwningCardSystem()}
            </dl>
        );
    }

    formatDate(date) {
        return moment(date).format('D/M/YYYY');
    }

    renderPeriodConstraintType(type) {

        switch (type){
            case 'ABSOLUTE':
                return 'persoon';
            case 'DAY':
                return 'dag';
            case 'WEEK':
                return 'week';
            case 'QUARTER':
                return 'kwartaal';
            case 'YEAR':
                return 'jaar';
            default:
                return '';
        }
    }

    renderApplicableCards() {

        let applicableCards = null;

        if (this.props.advantage.allCardSystems) {

            applicableCards = 'Dit voordeel is beschikbaar voor pashouders van alle UiTPAS-regio\'s.';

        } else if (this.props.advantage.applicableCardSystems && this.props.advantage.applicableCardSystems.length > 0) {

            let cardSystems = this.props.advantage.applicableCardSystems.map((system) => {
                return system.name;
            });

            applicableCards = 'Dit voordeel is beschikbaar voor pashouders van: ' + cardSystems.join(', ') + '.';
        }

        if (applicableCards) {

            return (
                <dd>{applicableCards}</dd>
            );
        } else {
            return null;
        }
    }

    renderOwningCardSystem() {

        if (this.props.advantage.owningCardSystem) {

            return (
                <dd>Dit voordeel wordt aangeboden door {this.props.advantage.owningCardSystem.name}.</dd>
            );
        } else {
            return null;
        }
    }
}