import * as React from "react";
import {SearchkitComponent} from "searchkit";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTResultsLayout extends SearchkitComponent{

    constructor(props){
        super(props);
    }

    componentWillMount() {
        console.log('test');
        console.log(this.props.searchkit);
        if(this.props.searchkit && !UiTPasSearchConfig.globalState.refreshSearchPerformed) {
            console.log(this.props.searchkit.getHitsCount());
            console.log(this.props.searchkit.getHits());
            this.props.searchkit.searchFromUrlQuery(window.location.search);
            UiTPasSearchConfig.globalState.refreshSearchPerformed = true;
            this.props.searchkit.addResultsListener(function(results){
                UiTPasSearchConfig.globalState.refreshSearchPerformed = false;
            });
        }
    }

    render(){
        return (
            <div className="sk-layout__results sk-results-list">
                {this.props.children}
            </div>
        );
    }
}