import * as React from "react";
import { map, debounce, min, get } from 'lodash';
import {
    SearchkitComponent,
} from "searchkit"
import {AdvantageAccessor} from "./AdvantageAccessor";
import {
    Grid,
    Row,
    Col,
    Label,
} from 'react-bootstrap';
import './UiTPasAdvantageDetail.css';
import {
    UiTImage
} from "../component/UiTImage";

export default class UiTPasAdvantageDetail extends SearchkitComponent {
    advantage;

    constructor(){
        super();
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
                        {this.renderBalies()}
                        {this.renderDescription()}
                        {this.renderMoreInfo()}
                        {this.renderPracticalInfo()}
                    </Col>
                    <Col md={6} sm={12}>
                        {this.renderPoints()}
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

    renderBalies(){
        if(this.advantage.balies && this.advantage.balies.length > 0) {
            return (
                <dl>
                    <dt>Omruilen bij:</dt>
                    <dd>{map(this.advantage.balies, (shop, index) => {
                        return (<span
                            key={shop.actorId}>{shop.name}{index < this.advantage.balies.length - 1 ? ',\u00A0' : ''}</span>);
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
                    <dt>Praktische info</dt>
                    {map(this.advantage.balies, function(shop){
                        return (
                            <dd>
                                <div className="uitpassearch-detail-address">
                                    <p>TODO: {shop.actorId}</p>
                                </div>
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
        if(this.advantage.pictures && this.advantage.pictures.length > 0){
            return (
                <UiTImage src={this.advantage.pictures[0]} maxWidth={500} maxHeight={500}/>
            );
        }
    }
}