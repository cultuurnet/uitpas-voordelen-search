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

    render() {

        const { hits, mod} = this.props;
        const bemBlocks = {
            container: block(mod),
            item: block(`${mod}-hit`)
        };

        let rowId = 0;
        let hitsChunks = this.chunkifyArray(hits, ceil(hits.length / 3), false);

        /*style={{width: '100%', boxSizing: 'border-box', padding: 8}}*/
        return (
            <Grid className="uitpassearch-hits-grid" fluid={true}>
                {map(hitsChunks, (chunk) => {
                    rowId++;
                    return this.makeGridRow(chunk, bemBlocks, rowId);
                })}
            </Grid>
        );
    }

    makeGridRow(hits, bemBlocks, rowId) {

        return (
            <Row key={rowId}>
                {map(hits, (hit, index) => {
                    return (<UiTPasAdvantageItem key={hit._id} bemBlocks={bemBlocks} result={hit} index={index}/>);
                })}
            </Row>
        );
    }

    /**
     * Splits an array a into "equal" chunks (based on whether the length of the array a is dividable
     * by the number n, if the number is not exactly dividable by n the last chunk will contain the
     * modulo.
     * @param a             the input array
     * @param n             the maximum length of the chunks
     * @param balanced      when this flag is set to true, the chunks will try to be more balanced. so, some chunks will contain one less item.
     * @returns array
     */
    chunkifyArray(a, n, balanced) {

        if (n < 2) {
            return [a];
        }

        var len = a.length,
            out = [],
            i = 0,
            size;

        if (len % n === 0) {

            size = Math.floor(len / n);

            while (i < len) {
                out.push(a.slice(i, i += size));
            }
        } else if (balanced) {

            while (i < len) {
                size = Math.ceil((len - i) / n--);
                out.push(a.slice(i, i += size));
            }
        } else {

            n--;
            size = Math.floor(len / n);

            if (len % size === 0) {
                size--;
            }

            while (i < size * n) {
                out.push(a.slice(i, i += size));
            }

            out.push(a.slice(size * n));
        }

        return out;
    }
}