import * as React from "react"
import { map } from 'lodash'

import {
    Accessor,
    AggsContainer,
    SearchkitComponent,
    FilterBucket,
    Utils,
    GeohashBucket,
    GeoBoundsMetric,
    SignificantTermsBucket,
    FilteredQuery,
    TermQuery,
} from "searchkit"


export class AdvantageAccessor extends Accessor{
    advantageId = 0;

    setAdvantageId(id){
        this.advantageId = id;
    }

    getAdvantageId(){
        return this.advantageId;
    }

    /*buildSharedQuery(query){
        if(this.advantageId){
            return query.addQuery(FilteredQuery({
                filter:{
                    geo_bounding_box:{
                        location:this.area
                    }
                }
            }))
        }
        return query
    }*/

    buildOwnQuery(query){
        return query.addQuery(TermQuery('id', this.getAdvantageId())).setSize(1);
    }
}