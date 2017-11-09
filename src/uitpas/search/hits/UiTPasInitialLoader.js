import * as React from "react";

import {
    SearchkitComponent
} from "searchkit";

export default class UiTPasInitialLoader extends SearchkitComponent {
    render() {
        return (
            //className={this.props.bemBlocks.item().mix(this.props.bemBlocks.container("item"))}
            <div>
                loading please wait...
            </div>
        )
    }
}