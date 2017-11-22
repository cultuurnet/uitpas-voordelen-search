import {
    SearchkitManager,
    TermQuery,
    RangeQuery,
    BoolMust
} from "searchkit";
import UiTPasSearchConfig from './UiTPasSearchConfig';

export default class UiTElasticSearchKit {

    constructor() {
        this.searchkit = null;
    }

    getSearchKit() {

        if (!this.searchkit){
            this.searchkit = UiTElasticSearchKit.createSearchkit();
            this.initSearchkit();
        }
        return this.searchkit;
    }


    initSearchkit() {
        let defaultQueries = [];
        if(UiTPasSearchConfig.get('showActiveAdvantages')){
            //only allow active advantages
            defaultQueries.push(TermQuery('status.keyword', 'ACTIVE'));
        }
        if(UiTPasSearchConfig.get('showPublishedAdvantages')){
            //only allow published advantages
            defaultQueries.push(RangeQuery('publicationPeriodEnd', {
                'gte': 'now'
            }));
        }
        if(defaultQueries.length > 0) {
            this.searchkit.addDefaultQuery(
                (query) => query.addQuery(
                    BoolMust(defaultQueries)
                )
            );
        }
    }

    static createSearchkit() {

        let es_url = 'http://acc.uitid.be:9200/promotions/';

        return new SearchkitManager(es_url);
    }

    getDefaultSearchFields(){
        return ['balies.name', 'balies.cityName', 'balies.cityZip', 'title'];
    }

    getDefaultSuggestField(){
        return 'balies.name';
    }
}