import * as React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import moment from 'moment';

import { UiTImage } from '../component/UiTImage';
import { LastChanceLabel } from '../component/LastChanceLabel';
import { joinNicely } from '../helper/UiTPasArrayUtils';

const CashInType = {
    ONLINE: 'ONLINE',
    FYSICAL: 'FYSICAL',
}

export default class UiTPasAdvantageDescription extends React.Component {

    render() {

        let backLink = (this.props.advantage.doctype === 'pointspromotion' ? '/voordelen' : '/welkomstvoordelen');
        let backName = (this.props.advantage.doctype === 'pointspromotion' ? 'voordelen' : 'welkomstvoordelen');

        return (
            <div>
                <div className="sk-block">
                    <Link to={backLink}>&laquo; Terug naar {backName}</Link>
                </div>
                <div className="sk-block">
                    <div className="sk-grid">
                        <div className="sk-grid__12 sk-grid--bp-med__7">
                            <h1 className="sk-heading">{this.props.advantage.title}</h1>
                        </div>
                        <div className="sk-flex__row space-between sk-grid--bp-med__7">
                            <div>
                                {this.renderPoints()}                                
                            </div>
                            <div>
                                {this.renderIsOnlineExchangable()}                            
                            </div>
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
                            {this.renderOnlineExchangeButton()}
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
                <div className="counters">
                    <strong>Omruilen bij: </strong>
                    {map(this.props.advantage.balies, (counter, index) => {
                        return (<span key={counter.actorId}>
                            <strong>
                                {counter.name} ({counter.cityName}){index < this.props.advantage.balies.length - 1 ? ',\u00A0' : ''}
                            </strong>
                        </span>);
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

        return (
            <div className="descriptions">
                {descriptions}
            </div>
        );
    }

    renderMoreInfo() {

        if (this.props.advantage.moreInfoURL && this.props.advantage.moreInfoURL.trim() !== '') {

            return (
                <div className="more-info sk-more-info">
                    <strong>Meer info:</strong> <a href={this.props.advantage.moreInfoURL}>{this.props.advantage.moreInfoURL}</a>
                </div>
            );
        } else {
            return null;
        }
    }

    renderPracticalInfo() {

        if (this.props.advantage.description2 && this.props.advantage.description2.trim() !== '') {
          return (
            <div className="practical-info">
                <strong>Hoe omruilen?</strong>
                <p>{this.props.advantage.description2}</p>
            </div>
        );
        } else {
          return null;
        }
    }

    renderPoints() {
        let points = (this.props.advantage.points ? this.props.advantage.points : 0);
        return (
            <div className="sk-label">{points} <small>{(points === 1 ? 'punt' : 'punten')}</small></div>
        );
    }

    isOnlineExchangable() {
        const cashInType = this.props.advantage.cashInType;
        return cashInType ? cashInType.includes(CashInType.ONLINE) : false;
    }

    renderIsOnlineExchangable() {
        if (this.isOnlineExchangable()) {
            return <div className="online-exchangable">online om te ruilen</div>
        }

        return null;
    }

    onlineExchangeUrl() {
        console.log('env', process.env.REACT_APP_UITPAS_URL);
        return `${process.env.REACT_APP_UITPAS_URL}/omruilen/${this.props.advantage.id}`;
    }

    renderOnlineExchangeButton() {
        if (this.isOnlineExchangable()) {
            return <a href={this.onlineExchangeUrl()} target="_blank" rel="noopener" className="sk-button">Nu omruilen</a>
        }

        return null;
    }

    renderImage() {

        let imageSrc = null;

        if (this.props.advantage.pictures && this.props.advantage.pictures.length > 0 && this.props.advantage.pictures[0].length > 0 ) {
            imageSrc = this.props.advantage.pictures[0][0];
        }

            return (
                <UiTImage src={imageSrc}
                          maxWidth={500}
                          maxHeight={500}
                          alt={this.props.advantage.title}/>
            );
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
        else if(this.props.advantage.maxAvailableUnits == null){
            availability = 'Onbeperkt voorradig. ';
        }

        if (this.renderApplicableCards()) {
            var cards = <p>{this.renderApplicableCards()}</p>
        }
        if (this.renderAvailableCities()) {
            var cities = <p>{this.renderAvailableCities()}</p>
        }
        if (this.renderOwningCardSystem()) {
            var owner = <p>{this.renderOwningCardSystem()}</p>
        }

        return (
            <div className="availability">
                <strong>Beschikbaarheid:</strong><p> {availability}</p>
                {cards}
                {cities}
                {owner}
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
                <div className="owning-card-system">Dit voordeel wordt aangeboden door {this.props.advantage.owningCardSystem.name}.</div>
            );
        } else {
            return null;
        }
    }

    renderAvailableCities(){
        if(this.props.advantage.validForCities && this.props.advantage.validForCities.length > 0){
            let cities = this.props.advantage.validForCities.map((city) => {
                return city.name;
            });
            return (
                <div className="available-cities">Dit voordeel is beschikbaar voor pashouders uit de gemeenten: {joinNicely(cities, ', ', ' en ')}. </div>
            );
        }
        else return null;
    }
}
