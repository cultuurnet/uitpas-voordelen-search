import * as React from "react";
import {
    FastClick
} from "searchkit";

/**
 * Adapted copy of searchkit's FilterItem to override the label so it does not include the filter title.
 */
export default class UiTPasFilterItem extends React.Component {

    render(){
        let props = this.props;
        return (
            <div className={props.bemBlocks.option()
                .mix(props.bemBlocks.container("item"))
                .mix(`selected-filter--${props.filterId}`)()}>
                <div className={props.bemBlocks.option("name")}>{props.labelValue}</div>
                <FastClick handler={props.removeFilter}>
                    <div className={props.bemBlocks.option("remove-action")}>x</div>
                </FastClick>
            </div>
        )
    }
};