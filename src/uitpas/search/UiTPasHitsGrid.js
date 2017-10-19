import * as React from "react";
import {
    ceil, map
} from "lodash";
import UiTPasAdvantageItem from './UiTPasAdvantageItem';
import {
    Grid,
    Row
} from 'react-bootstrap';
const block = require('bem-cn');

export default class UiTPasHitsGrid extends React.Component {
    render(){
        const { hits, mod, className} = this.props;
        const bemBlocks = {
            container: block(mod),
            item: block(`${mod}-hit`)
        };
        let hitsChunks = this.chunkifyArray(hits, ceil(hits.length / 3), false);
        /*style={{width: '100%', boxSizing: 'border-box', padding: 8}}*/
        return (
            <Grid className="uitpassearch-hits-grid" fluid={true}>
                {map(hitsChunks, (chunk) => {
                    return this.makeGridRow(chunk, bemBlocks);
                })}
            </Grid>
        );
    }

    makeGridRow(hits, bemBlocks){
        return (
            <Row>
                {map(hits, (hit, index) => {
                    return (<UiTPasAdvantageItem key={hit._id} bemBlocks={bemBlocks} result={hit} index={index}/>);
                })}
            </Row>
        );
    }

    chunkifyArray(a, n, balanced) {

        if (n < 2)
            return [a];

        var len = a.length,
            out = [],
            i = 0,
            size;

        if (len % n === 0) {
            size = Math.floor(len / n);
            while (i < len) {
                out.push(a.slice(i, i += size));
            }
        }

        else if (balanced) {
            while (i < len) {
                size = Math.ceil((len - i) / n--);
                out.push(a.slice(i, i += size));
            }
        }

        else {

            n--;
            size = Math.floor(len / n);
            if (len % size === 0)
                size--;
            while (i < size * n) {
                out.push(a.slice(i, i += size));
            }
            out.push(a.slice(size * n));

        }

        return out;
    }
}