import * as React from "react";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTResultsLayout extends React.Component{

    componentWillMount() {
        if(this.props.searchkit && !UiTPasSearchConfig.globalState.refreshSearchPerformed) {
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