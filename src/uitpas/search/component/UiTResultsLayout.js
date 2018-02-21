import * as React from "react";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTResultsLayout extends React.Component{

    componentWillMount() {
        //this extra forced search is necessary to make sure when one navigates back from a detail view
        //that the search results and filters are properly refreshed (sometimes the filters were not
        //shown).
        if(this.props.searchkit && !UiTPasSearchConfig.globalState.refreshSearchPerformed) {
            //it appears that run InitialSearch is the only way to bypass the similarity checks of
            // searchkit on the old query and the new query. when using an other function the old and
            // new query are the same and no search is executed.
            this.props.searchkit.runInitialSearch();
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