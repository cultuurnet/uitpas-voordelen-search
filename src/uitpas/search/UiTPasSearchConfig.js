

export default class UiTPasSearchConfig {
    static config = {
        lastChanceWeeks: 100,
    };

    static buildConfig(){
        //TODO from url args or on page JSON

    }

    static get(field){
        return UiTPasSearchConfig.config[field];
    }
}