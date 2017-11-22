import * as React from "react";
import { map } from "lodash";
import UiTPasAdvantageItem from './UiTPasAdvantageItem';

const block = require('bem-cn');

export default class UiTPasHitsGrid extends React.Component {

    render() {

        const { hits, mod } = this.props;
        const bemBlocks = {
            container: block(mod),
            item: block(`${mod}-hit`)
        };

        /*style={{width: '100%', boxSizing: 'border-box', padding: 8}}*/
        return (
            <div className="sk-grid sk-grid--bp-sml-2-col sk-grid--bp-sml-3-col">
                {map(hits, (hit, key) => {
                    return (<UiTPasAdvantageItem key={hit._id} bemBlocks={bemBlocks} result={hit} index={key}/>);
                })}
            </div>
        );
    }
}