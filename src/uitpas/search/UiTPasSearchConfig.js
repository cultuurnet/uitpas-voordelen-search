
export default class UiTPasSearchConfig {

    static config = {
        lastChanceWeeks: 1000,
        showActiveAdvantages: true,
        showPublishedAdvantages: false,
        uitDatabankUrlPrefix: 'https://io-acc.uitdatabank.be',
        defaultThumbUrl: 'http://localhost:3000/img/voordelen-placeholder.png',
        elasticSearchUrl: 'http://acc.uitid.be:9200/promotions/'
    };

    static configTypes = {
        lastChanceWeeks: 'number',
        showActiveAdvantages: 'boolean',
        showPublishedAdvantages: 'boolean',
        uitDatabankUrlPrefix: 'string',
        defaultThumbUrl: 'string',
        elasticSearchUrl: 'string'
    };

    static buildConfig() {

        let rootElement = document.getElementById('uitpas-search');
        let configData = rootElement.dataset;

        for (const setting in UiTPasSearchConfig.config) {

            if (configData.hasOwnProperty(setting)) {

                let configValue;
                const configSetting = configData[setting];

                switch (UiTPasSearchConfig.configTypes[setting]) {

                    case 'number':

                        if (!isNaN(parseInt(configSetting, 10))) {
                            configValue = parseInt(configSetting, 10);
                        } else {
                            console.warn(`Invalid config value '${configSetting}' for ${setting}. Must be number.`);
                        }

                        break;

                    case 'boolean':

                        if (!isNaN(parseInt(configSetting, 10))) {
                            configValue = !!parseInt(configSetting, 10);

                        } else {

                            if (configSetting.toLowerCase() === 'true') {
                                configValue = true;

                            } else if (configSetting.toLowerCase() === 'false') {
                                configValue = false;

                            } else {
                                console.warn(`Invalid config value '${configSetting}' for ${setting}. Must be boolean.`);
                            }
                        }

                        break;

                    case 'string':
                    default:
                        configValue = configData[setting];
                }

                if (typeof configValue !== 'undefined') {
                    UiTPasSearchConfig.set(setting, configValue);
                }
            }
        }

        console.log(UiTPasSearchConfig.config);
    }

    static set(field, value) {
        UiTPasSearchConfig.config[field] = value;
    }

    static get(field) {
        return UiTPasSearchConfig.config[field];
    }
}