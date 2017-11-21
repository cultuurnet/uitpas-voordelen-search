import * as React from "react";
import {get, map} from 'lodash';
import {SearchkitComponent,} from "searchkit"
import {AdvantageAccessor} from "./AdvantageAccessor";
import {Col, Grid, Label, Row,} from 'react-bootstrap';
import './UiTPasAdvantageDetail.css';
import UiTPasRelatedItems from './UiTPasRelatedItems';
import UiTPasAdvantageDescription from "./UiTPasAdvantageDescription";

export default class UiTPasAdvantageDetail extends SearchkitComponent {

    advantage;
    lastSearchMs;

    defineAccessor() {
        return new AdvantageAccessor();
    }

    resetAdvantage() {

        if (this.advantage) {
            if (this.props.advantageId != this.advantage.id) {
                this.advantage = null;
            }
        }
    }

    initAccessor() {
        this.accessor.setAdvantageId(this.props.advantageId);
    }

    initAdvantage() {

        if (!this.advantage) {

            let now = +new Date();
            let newSearch = now - this.lastSearchMs <= 2000;

            this.lastSearchMs = now;
            this.searchkit.search();

            let results = this.getResults();

            if (this.hasHits()) {
                this.advantage = get(results, 'hits.hits[0]._source', null);
            }
        }
    }

    render() {

        this.resetAdvantage();
        this.initAccessor();
        this.initAdvantage();

        console.log(this.advantage);

        if (this.advantage) {
            return this.renderAdvantage();
        } else {
            return this.renderNoResult();
        }
    }

    renderAdvantage() {

        return (
            <Grid>
                <UiTPasAdvantageDescription advantage={this.advantage}/>
                <hr/>
                <Row>
                    <UiTPasRelatedItems counters={this.advantage.balies} advantage={this.advantage.id}/>
                </Row>
            </Grid>
        );
    }

    renderNoResult() {
        
        return (
            <div>
                <h1>Oeps! Dit voordeel bestaat niet meer...</h1>
            </div>
        );
    }
}