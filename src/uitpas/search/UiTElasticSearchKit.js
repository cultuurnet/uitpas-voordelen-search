import {
    SearchkitManager,
} from "searchkit";

export default class UiTElasticSearchKit {

    constructor(){
        this.searchkit = null;
    }

    getSearchKit() {
        if(!this.searchkit){
            this.searchkit = UiTElasticSearchKit.createSearchkit();
        }
        return this.searchkit;
    }

    static createSearchkit(){
        let es_url = "http://acc.uitid.be:9200/promotions/";
        return new SearchkitManager(es_url);
    }

    getDefaultSearchFields(){
        return ["balies.name", "balies.cityName", "balies.cityZip"];
    }
}