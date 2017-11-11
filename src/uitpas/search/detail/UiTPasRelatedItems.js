import * as React from "react";
import {get} from 'lodash';
import {SearchkitComponent,} from "searchkit"
import './UiTPasAdvantageDetail.css';
import UiTPasAdvantageItem from '../hits/UiTPasAdvantageItem';
import RelatedItemsAccessor from "./RelatedItemsAccessor";
import {joinNicely} from "../helper/UiTPasArrayUtils";
import PropTypes from 'prop-types';

export default class UiTPasRelatedItems extends SearchkitComponent {
    static propTypes = {
        advantage: PropTypes.number.isRequired,
        counters: PropTypes.array.isRequired,
    };

    items;
    counterIds = [];

    defineAccessor(){
        return new RelatedItemsAccessor();
    }

    initAccessor(){
        if(this.counterIds.length === 0){
            this.counterIds = this.props.counters.map((system) => {
                return system.actorId;
            });
        }
        this.accessor.setCounterIds(this.counterIds);
        this.accessor.setAdvantage(this.props.advantage);
    }

    initItems(){
        if(!this.items){
            this.searchkit.search();
            let results = this.getResults();
            if(this.hasHits()) {
                let hits = get(results, 'hits.hits', null);
                //check if it is not the detail advantage...
                //this is returned first before the new query is executed.
                if(hits.length > 0 && hits[0]._source.id !== this.props.advantage){
                    this.items = hits;
                }
            }
        }
    }

    render(){
        if(this.props.counters){
            if(this.props.counters.length > 0) {
                let counterNames = this.props.counters.map((system) => {
                    return system.name;
                });
                this.initAccessor();
                this.initItems();
                return (
                    <div className="uitpassearch-detail-relateditems">
                        <h2>Andere voordelen in {joinNicely(counterNames, ', ', ' of ')}:</h2>
                        {this.renderRelatedItems()}
                    </div>
                );
            }
        }
        return null;
    }

    renderRelatedItems(){
        if(this.items){
            if(this.items.length > 0){
                let bemBlocks = this.bemBlocks;
                return (
                    <div>
                        {this.items.map((item) => {
                            return (<UiTPasAdvantageItem result={item} bemBlocks={bemBlocks}/>);
                            //return (<p>{item._source.title}</p>)
                        })}
                    </div>
                );
            }
            else{
                return (<div>Er zijn geen andere voordelen bij deze balies...</div>);
            }
        }
        return null;
    }
}