import * as React from 'react';
import { get } from 'lodash';
import { SearchkitComponent } from 'searchkit'
import UiTPasRelatedItems from './UiTPasRelatedItems';
import UiTPasAdvantageDescription from './UiTPasAdvantageDescription';
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTPasAdvantageDetail extends SearchkitComponent {

    advantage = null;
    loading = true;
    currentAdvantageId;

    constructor(props){
        super(props);
        this.state = {
            advantage: null,
            loading: true,
        };
    }

    componentWillMount(){
        let id = this.props.advantageId;
        let url = UiTPasSearchConfig.get('elasticSearchUrl') + '_search';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(this.getQuery(id)),
            headers: headers
        });
        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    advantage: get(data, 'hits.hits[0]._source', null),
                    loading: false,
                });
            });
    }

    render() {

        this.currentAdvantageId = this.props.advantageId;

        this.advantage = this.state.advantage;
        this.loading = this.state.loading;

        console.log(this.advantage);

        if (this.loading) {
            return this.renderLoading();
        }
        else if (this.advantage) {
            return this.renderAdvantage();
        } else {
            return this.renderNoResult();
        }
    }

    renderAdvantage() {

        return (
            <div className="sk-layout__results">
                <UiTPasAdvantageDescription advantage={this.advantage}/>
                <br/>
                <hr/>
                <UiTPasRelatedItems counters={this.advantage.balies} advantage={this.advantage.id} searchkit={this.props.searchkit}/>
            </div>
        );
    }

    renderNoResult() {
        
        return (
            <div className="sk-layout__results">
                <h2>Oeps! Dit voordeel bestaat niet meer...</h2>
            </div>
        );
    }

    renderLoading(){
        return (
            <div className="sk-layout__results">
                <h2>Loading...</h2>
            </div>
        );
    }


    getQuery(id){
        return {
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "id": id
                            }
                        },
                        {
                            "term": {
                                "status.keyword": "ACTIVE"
                            }
                        }
                    ]
                }
            },
            "from": 0,
            "size": 1
        };
    }
}