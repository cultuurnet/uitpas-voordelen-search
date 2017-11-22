import * as React from 'react';
import { get } from 'lodash';
import { SearchkitComponent } from 'searchkit'
import { AdvantageAccessor } from './AdvantageAccessor';
import UiTPasRelatedItems from './UiTPasRelatedItems';
import UiTPasAdvantageDescription from './UiTPasAdvantageDescription';

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
            // let newSearch = now - this.lastSearchMs <= 2000;

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
            <div>
                <UiTPasAdvantageDescription advantage={this.advantage}/>
                <hr/>
                <div className="sk-grid sk-grid--bp-sml-2-col sk-grid--bp-med-3-col">
                    <UiTPasRelatedItems counters={this.advantage.balies} advantage={this.advantage.id}/>
                </div>
            </div>
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