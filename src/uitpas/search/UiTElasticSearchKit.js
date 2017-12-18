import {
    SearchkitManager,
    TermQuery,
    RangeQuery,
    BoolMust
} from 'searchkit';

import UiTPasSearchConfig from './UiTPasSearchConfig';

/**
 * This searchkit container class manages two types of searchit managers:
 * - one for regular advantages
 * - one for welcome advantages
 */
export default class UiTElasticSearchKit {
    ADVANTAGE_TYPE = 'pointspromotion';
    WELCOME_ADVANTAGE_TYPE = 'welcomeadvantage';

    constructor() {
        this.searchkit = null;
        this.welcomeSearchkit = null;
    }

    getDefaultSearchkit() {

        if (!this.searchkit){
            this.searchkit = UiTElasticSearchKit.createSearchkit();
            this.initSearchkit(this.searchkit);
        }

        return this.searchkit;
    }

    getWelcomeSearchkit(){

        if (!this.welcomeSearchkit){
            this.welcomeSearchkit = UiTElasticSearchKit.createSearchkit();
            this.initSearchkit(this.welcomeSearchkit, true);
        }

        return this.welcomeSearchkit;
    }


    initSearchkit(searchkit, isWelcome = false) {

        let defaultQueries = [];

        if (UiTPasSearchConfig.get('showActiveAdvantages')) {
            //only allow active advantages
            defaultQueries.push(TermQuery('status.keyword', 'ACTIVE'));
        }

        if (UiTPasSearchConfig.get('showPublishedAdvantages')) {
            //only allow published advantages
            defaultQueries.push(RangeQuery('publicationPeriodEnd', {
                'gte': 'now'
            }));
        }

        if(UiTPasSearchConfig.get('showPermanentCardSystemAdvantages')){
            defaultQueries.push(TermQuery('owningCardSystem.permanent', true));
        }

        defaultQueries.push(TermQuery('doctype', (isWelcome ? this.WELCOME_ADVANTAGE_TYPE : this.ADVANTAGE_TYPE)));

        if (defaultQueries.length > 0) {

            searchkit.addDefaultQuery(
                (query) => query.addQuery(
                    BoolMust(defaultQueries)
                )
            );
        }
    }

    static createSearchkit() {

        let es_url = UiTPasSearchConfig.get('elasticSearchUrl');

        return new SearchkitManager(es_url);
    }

    getDefaultSearchFields() {
        return ['balies.name', 'balies.cityName', 'balies.cityZip', 'title'];
    }

    getDefaultSuggestField() {
        return 'balies.name';
    }
}