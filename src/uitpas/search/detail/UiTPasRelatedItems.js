import * as React from 'react';
import { get } from 'lodash';
import { SearchkitComponent } from 'searchkit';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import UiTPasAdvantageItem from '../hits/UiTPasAdvantageItem';
import { joinNicely } from '../helper/UiTPasArrayUtils';
import UiTPasSearchConfig from '../UiTPasSearchConfig';

import {stringify} from 'qs';

class UiTPasRelatedItemsContainer extends SearchkitComponent {

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
            let {match, location, history, searchkit} = this.props;
            //const query = new URLSearchParams(history.location.search);
            //query.set('foo', 'bar');
            //let query = parse(window.location.search, { ignoreQueryPrefix: true });
            //history.replace({...history.location, search: query.toString()})

            let query = {};
            this.counterNames.forEach((name, i) => {
                query['q'] = name;
            });

            let url = {
                pathname: '/voordelen',
                search: stringify(query, { addQueryPrefix: true }),
            };

            return (
                <div>
                    <div>
                        <Link to={url}>Alle voordelen in {joinNicely(this.counterNames, ', ', ' of ')} &raquo;</Link>
                    </div>
                    <br/>
                </div>
            );
        }
    }

    getQuery(advantageId, counters) {

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
                    "should": actorIdTerms
                }
            },
            "from": 0,
            "size": 3
        };
    }
}

const UiTPasRelatedItems = withRouter(UiTPasRelatedItemsContainer);
export default UiTPasRelatedItems;