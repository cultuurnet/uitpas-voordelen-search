import * as React from 'react';
import { get } from 'lodash';
import { SearchkitComponent } from 'searchkit';
import PropTypes from 'prop-types';

import UiTPasAdvantageItem from '../hits/UiTPasAdvantageItem';
import { joinNicely } from '../helper/UiTPasArrayUtils';
import UiTPasSearchConfig from '../UiTPasSearchConfig';

export default class UiTPasRelatedItems extends SearchkitComponent {

    static propTypes = {
        advantage: PropTypes.number.isRequired,
        counters: PropTypes.array.isRequired,
    };

    counterNames = [];

    constructor(props) {
        super(props);
        this.state = {
            items: null,
        };
    }

    componentWillMount() {
        //we do our own query to ElasticSearch here because Searchkit was confused by having two searchkitManagers on one page.
        //the searchkitManager keeps the state of the query which makes it very difficult to switch between two completely
        //different queries. Therefore, we force a REST request to ElasticSearch here.
        this.fetchData();
    }

    fetchData() {

        let url = UiTPasSearchConfig.get('elasticSearchUrl') + '_search';
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(this.getQuery(this.props.advantage, this.props.counters)),
            headers: headers
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    items: get(data, 'hits.hits', []),
                });
            });
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.advantage !== nextProps.advantage) {

            setTimeout(this.fetchData.bind(this), 1);
        }
    }

    render() {

        if (this.props.counters) {

            if (this.props.counters.length > 0) {
                this.counterNames = this.props.counters.map((system) => {
                    return system.name;
                });

                return (
                    <div className="uitpassearch-detail-relateditems">
                        <div className="sk-block"/>
                        <div className="sk-block">
                            <div className="sk-grid">
                                <div className="sk-grid__12 sk-grid--bp-med__8">
                                    <h2 className="sk-heading">Andere voordelen in {joinNicely(this.counterNames, ', ', ' of ')}</h2>
                                </div>
                                <div className="sk-grid__12 sk-grid--bp-med__4">
                                    {this.renderMoreRelatedItemsLink()}
                                </div>
                            </div>
                        </div>
                        <div className="sk-block">
                            {this.renderRelatedItems()}
                        </div>
                    </div>
                );
            }
        }

        return null;
    }

    renderRelatedItems() {

        if (this.state.items) {

            if (this.state.items.length > 0) {

                return (
                    <div className="sk-grid sk-grid--bp-sml-2-col sk-grid--bp-med-3-col">
                        {this.state.items.map((item, i) => {
                            return (<UiTPasAdvantageItem result={item} key={i}/>);
                        })}
                    </div>
                );
            } else {
                return (<div>Er zijn geen andere voordelen bij deze {(this.counterNames && this.counterNames.length > 1 ? 'balies' : 'balie')}...</div>);
            }
        }
        else {
            return (<div>Loading...</div>)
        }
    }

    renderMoreRelatedItemsLink() {

        if (this.state.items && this.state.items.length > 0) {

            let urlParams = this.counterNames.map((name, i) => {
                return 'countersFilter[' + i + ']=' + encodeURIComponent(name);
            });

            const url = `?${urlParams.join('&')}#/voordelen`;
            
            return (
                <div>
                    <div>
                        <a href={url}>Alle voordelen in {joinNicely(this.counterNames, ', ', ' of ')} &raquo;</a>
                    </div>
                    <br/>
                </div>
            );
        }
    }

    getQuery(advantageId, counters) {

        let defaultQueries = [];
        if (UiTPasSearchConfig.get('showActiveAdvantages')) {
            //only allow active advantages
            defaultQueries.push({
                "term": {
                    "status.keyword": "ACTIVE"
                }
            });
        }

        if (UiTPasSearchConfig.get('showPublishedAdvantages')) {
            //only allow published advantages
            defaultQueries.push({
                "range": {
                    "publicationPeriodEnd": {
                        "gte": "now"
                    }
                }
            });
        }

        if(UiTPasSearchConfig.get('showPermanentCardSystemAdvantages')){
            defaultQueries.push({
                "term": {
                    "owningCardSystem.permanent": true
                }
            });
        }

        let actorIdTerms = counters.map((counter) => {
            return {
                "term": {
                    "balies.actorId.keyword": counter.actorId
                }};
        });

        return {
            "query": {
                "bool": {
                    "must_not": [
                        {
                            "term": {
                                "id": advantageId
                            }
                        }],
                    "should": actorIdTerms,
                    "must": defaultQueries,
                }
            },
            "from": 0,
            "size": 3
        };
    }
}
