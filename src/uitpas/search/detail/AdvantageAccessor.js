import {
    Accessor,
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

    buildOwnQuery(query){
        return query.addQuery(TermQuery('id', this.getAdvantageId())).setSize(1);
    }
}