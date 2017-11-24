import {
    Accessor,
    TermQuery,
    BoolShould,
    ImmutableQuery,
    BoolMustNot,
} from 'searchkit';

/**
 * Queries for other advantage items of the given owning card system.
 * query:
 *      {"query":{"bool":{"must":[],"must_not":[],"should":[{"term":{"balies.actorId.keyword":"35BA1933-02C6-B5F4-87D62718A901A307"}},{"term":{"balies.actorId.keyword":"31411A1C-9626-E1B6-F4F1973E410EC001"}}]}},"from":0,"size":10,"sort":[],"aggs":{}}
 */
export default class RelatedItemsAccessor extends Accessor {

    counterIds = [];
    advantage;

    setCounterIds(ids) {
        this.counterIds = ids;
    }

    getCounterIds() {
        return this.counterIds;
    }

    setAdvantage(id) {
        this.advantage = id;
    }

    getAdvantage() {
        return this.advantage;
    }

    buildOwnQuery(query) {

        if (this.counterIds && this.counterIds.length > 0) {

            let newQuery = new ImmutableQuery()
                .addQuery(BoolShould(this.counterIds.map((id) => {
                    return TermQuery('balies.actorId.keyword', id)
                })))
                .addQuery(BoolMustNot(new TermQuery('id', this.getAdvantage())))
                .setSize(3);

            return newQuery;
        } else {
            return query;
        }
    }

}
