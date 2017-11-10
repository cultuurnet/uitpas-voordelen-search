import * as React from "react";
import {get, map} from 'lodash';
import {SearchkitComponent,} from "searchkit"
import {AdvantageAccessor} from "./AdvantageAccessor";
import {Col, Grid, Label, Row,} from 'react-bootstrap';
import './UiTPasAdvantageDetail.css';
import {UiTImage} from "../component/UiTImage";
import {UiTPasCounter} from "./UiTPasCounter";
import {LastChanceLabel} from '../component/LastChanceLabel';
import moment from 'moment';

export default class UiTPasAdvantageDetail extends SearchkitComponent {
    advantage;

    constructor(props){
        super(props);
    }

    defineAccessor(){
        return new AdvantageAccessor();
    }

    initAccessor(){
        if(this.accessor.getAdvantageId() === 0){
            this.accessor.setAdvantageId(this.props.advantageId);
        }
    }

    initAdvantage(){
        if(!this.advantage){
            let results = this.getResults();
            if(this.hasHits()) {
                this.advantage = get(results, 'hits.hits[0]._source', null);
            }
        }
    }

    render(){
        this.initAccessor();
        this.initAdvantage();
        console.log(this.advantage);
        if(this.advantage){
            return this.renderAdvantage();
        }
        else{
            return this.renderNoResult();
        }
    }

    renderAdvantage(){
        return (
            <Grid>
                <Row>
                    <Col md={6} sm={12}>
                        <h1>{this.advantage.title}</h1>
                        {this.renderCounters()}
                        {this.renderDescription()}
                        {this.renderMoreInfo()}
                        {this.renderPracticalInfo()}
                        {this.renderAvailability()}
                        {this.renderApplicableCards()}
                        {this.renderOwningCardSystem()}
                    </Col>
                    <Col md={6} sm={12}>
                        {this.renderPoints()}
                        {<LastChanceLabel endDate={this.advantage.cashingPeriodEnd}/>}
                        {this.renderImage()}
                    </Col>
                </Row>
            </Grid>
        );
    }

    renderNoResult(){
        return (
            <div>
                <h1>Oeps! Dit voordeel bestaat niet meer...</h1>
            </div>
        );
    }

    renderCounters(){
        if(this.advantage.balies && this.advantage.balies.length > 0) {
            return (
                <dl>
                    <dt>Omruilen bij:</dt>
                    <dd>{map(this.advantage.balies, (counter, index) => {
                        return (<span
                            key={counter.actorId}>{counter.name}{index < this.advantage.balies.length - 1 ? ',\u00A0' : ''}</span>);
                    })}
                    </dd>
                </dl>
            );
        }
    }

    renderDescription(){
        let descriptions = [];
        if(this.advantage.description1 && this.advantage.description1.trim() !== ''){
            descriptions.push(<p key="description1">{this.advantage.description1}</p>);
        }
        if(this.advantage.description2 && this.advantage.description2.trim() !== ''){
            descriptions.push(<p key={"description2"}>{this.advantage.description2}</p>);
        }
        return (
            <div>
                {descriptions}
            </div>
        );
    }

    renderMoreInfo(){
        if(this.advantage.moreInfoURL && this.advantage.moreInfoURL.trim() !== ''){
            return (
                <dl>
                    <dt>Meer info:</dt>
                    <dd><a href={this.advantage.moreInfoURL}>{this.advantage.moreInfoURL}</a></dd>
                </dl>
            );
        }
    }

    renderPracticalInfo(){
        if(this.advantage.balies && this.advantage.balies.length > 0){
            return (
                <dl>
                    <dt>Praktische info:</dt>
                    {map(this.advantage.balies, function(counter){
                        return (
                            <dd key={counter.actorId}>
                                <UiTPasCounter counterId={counter.actorId}/>
                            </dd>
                        );
                    })}
                </dl>
            );
        }
    }

    renderPoints(){
        if(this.advantage.points){
            return (
                <h2>
                    <Label className="uitpassearch-detail-points-lbl">{this.advantage.points} <small>punten</small></Label>
                </h2>
            );
        }
    }

    renderImage(){
        if(this.advantage.pictures && this.advantage.pictures.length > 0 && this.advantage.pictures[0].length > 0 ){
            return (
                <UiTImage src={this.advantage.pictures[0][0]}
                          maxWidth={500}
                          maxHeight={500}
                          alt={this.advantage.title}/>
            );
        }
    }

    renderAvailability(){
        let availability = "Dit voordeel is niet meer voorrading. ";
        if(this.advantage.maxAvailableUnits && this.advantage.maxAvailableUnits > 0) {
            availability = this.advantage.maxAvailableUnits + ' beschikbaar';
            if(this.advantage.cashingPeriodBegin){
                availability += ' vanaf ' + this.formatDate(this.advantage.cashingPeriodBegin);
            }
            if(this.advantage.cashingPeriodEnd){
                availability += ' tot ' + this.formatDate(this.advantage.cashingPeriodEnd);
            }
            availability += '. ';
            if(this.advantage.periodConstraint && this.advantage.periodConstraint.type){
                availability += ' Maximaal ' + this.advantage.periodConstraint.volume + ' per ' + this.renderPeriodConstraintType(this.advantage.periodConstraint.type) + '.';
            }
        }
        return (
            <dl>
                <dt>Beschikbaarheid:</dt>
                <dd>{availability}</dd>
            </dl>
        );
    }

    formatDate(date){
        return moment(date).format('D/M/YYYY');
    }

    renderPeriodConstraintType(type){
        switch(type){
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

    renderApplicableCards(){
        let applicableCards = '';
        if(this.advantage.allCardSystems){
            applicableCards = 'Dit voordeel is beschikbaar voor pashouders van alle UiTPAS-regio\'s.';
        }
        else if(this.advantage.applicableCardSystems && this.advantage.applicableCardSystems.length > 0){
            let cardSystems = this.advantage.applicableCardSystems.map((system) => {
                return system.name;
            });
            applicableCards = 'Dit voordeel is beschikbaar voor pashouders van: ' + cardSystems.join(', ') + '.';
        }
        return (
            <p>{applicableCards}</p>
        );
    }

    renderOwningCardSystem(){
        if(this.advantage.owningCardSystem){
            return (
                <p>Dit voordeel wordt aangeboden door {this.advantage.owningCardSystem.name}.</p>
            );
        }
    }

}