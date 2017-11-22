

export default class UiTPasSearchConfig {

    static config = {
        lastChanceWeeks: 1000,
        showActiveAdvantages: true,
        showPublishedAdvantages: false,
        uitDatabankUrlPrefix: 'https://io-acc.uitdatabank.be',
        uitIdAPIUrlPrefix: 'https://acc.uitid.be',
        OAuthConsumerKey: '1fc6b3fcde6e612ede360715045713f3',
        OAuthConsumerSecret: 'e626845f1e95db4330a2a8803d83edf5',
        defaultThumbUrl: 'http://localhost:3000/img/voordelen-placeholder.png',
    };

    static buildConfig(){
        //TODO from url args or on page JSON

    }

    static get(field){
        return UiTPasSearchConfig.config[field];
    }
}