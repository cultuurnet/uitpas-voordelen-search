import {
    SearchkitManager,
    TermQuery,
} from "searchkit";

export default class UiTElasticSearchKit {

    constructor(){
        this.searchkit = null;
    }

    getSearchKit() {
        if(!this.searchkit){
            this.searchkit = UiTElasticSearchKit.createSearchkit();
            this.initSearchkit();
        }
        return this.searchkit;
    }

    initSearchkit(){
        //only allow active advantages
        this.searchkit.addDefaultQuery(
            (query) => query.addQuery(
                TermQuery("status.keyword", "ACTIVE")
            )
        );
    }

    static createSearchkit(){
        let es_url = "http://acc.uitid.be:9200/promotions/";
        return new SearchkitManager(es_url);
    }

    getDefaultSearchFields(){
        return ["balies.name", "balies.cityName", "balies.cityZip"];
    }

    getDefaultSuggestField(){
        return "balies.name";
    }
}