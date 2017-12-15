import * as React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import moment from 'moment';

import { UiTImage } from '../component/UiTImage';
import { UiTPasCounter } from './UiTPasCounter';
import { LastChanceLabel } from '../component/LastChanceLabel';

export default class UiTPasAdvantageDescription extends React.Component {

    render() {

        return (
            <div>
                <div className="sk-block">
                    <Link to='/voordelen'>Terug naar voordelen</Link>
                </div>
                <div className="sk-block">
                    <div className="sk-grid">
                        <div className="sk-grid__12 sk-grid--bp-med__7">
                            <h1 className="sk-heading">{this.props.advantage.title}</h1>
                        </div>
                        <div className="sk-grid__12 sk-grid--bp-med__5">
                            {this.renderPoints()}
                        </div>
                    </div>
                </div>
                <div className="sk-block">
                    <div className="sk-grid">
                        <div className="sk-grid__12 sk-grid--bp-med__7">
                            {this.renderCounters()}
                            {this.renderDescription()}
                            {this.renderMoreInfo()}
                            {this.renderPracticalInfo()}
                            {this.renderAvailability()}
                        </div>
                        <div className="sk-grid__12 sk-grid--bp-med__5">
                            <div className="sk-card">
                                <div className="sk-card__img">
                                    {this.renderImage()}
                                    <LastChanceLabel endDate={this.props.advantage.cashingPeriodEnd} className="sk-card__banner"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCounters() {

        if (this.props.advantage.balies && this.props.advantage.balies.length > 0) {

            return (
                <div>
                    <strong>Omruilen bij: </strong>
                    {map(this.props.advantage.balies, (counter, index) => {
                        return (<span
                            key={counter.actorId}>{counter.name} ({counter.cityName}){index < this.props.advantage.balies.length - 1 ? ',\u00A0' : ''}</span>);
                    })}
                </div>
            );
        } else {
            return null;
        }
    }

    renderDescription() {

        let descriptions = [];

        if (this.props.advantage.description1 && this.props.advantage.description1.trim() !== '') {
            descriptions.push(<p className="sk-text--lrg" key="description1">{this.props.advantage.description1}</p>);
        }

        if (this.props.advantage.description2 && this.props.advantage.description2.trim() !== '') {
            descriptions.push(<p className="sk-text--lrg" key={"description2"}>{this.props.advantage.description2}</p>);
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
                <div>
                    <strong>Meer info:</strong> <a href={this.props.advantage.moreInfoURL}>{this.props.advantage.moreInfoURL}</a>
                </div>
            );
        } else {
            return null;
        }
    }

    renderPracticalInfo() {

        if (this.props.advantage.balies && this.props.advantage.balies.length > 0) {

            return (
                <div>
                    <h2>Praktische info</h2>
                    <div className="sk-grid sk-grid--bp-med-2-col">
                    {map(this.props.advantage.balies, function(counter){
                        return (
                            <div className="sk-grid__item" key={counter.actorId}>
                                <UiTPasCounter counterId={counter.actorId}/>
                                <br/>
                            </div>
                        );
                    })}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }

    renderPoints() {

        if (this.props.advantage.points) {

            return (
                <div className="sk-label">{this.props.advantage.points} <small>{(this.props.advantage.points === 1 ? 'punt' : 'punten')}</small></div>
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

        let availability = 'Dit voordeel is niet meer voorradig. ';

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
            <div>
                <strong>Beschikbaarheid:</strong> {availability}<br/>
                <br/>
                {this.renderApplicableCards()}
                <br/>
                {this.renderOwningCardSystem()}
            </div>
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
                <div>{applicableCards}</div>
            );
        } else {
            return null;
        }
    }

    renderOwningCardSystem() {

        if (this.props.advantage.owningCardSystem) {

            return (
                <div>Dit voordeel wordt aangeboden door {this.props.advantage.owningCardSystem.name}.</div>
            );
        } else {
            return null;
        }
    }
}