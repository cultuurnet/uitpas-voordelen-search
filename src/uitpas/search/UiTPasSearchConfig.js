export default class UiTPasSearchConfig {
  static globalState = {
    refreshSearchPerformed: false,
  };

  static config = {
    cardSystemsChecked: [],
    cardSystemsVisible: true,
    defaultThumbUrl: window.location.origin + "/img/default-thumb.png",
    elasticSearchUrl: "http://acc.uitid.be:9200/promotions/",
    uitpasUrl: "https://www.uitpas.be",
    embedded: true,
    fuzzySearch: true,
    lastChanceWeeks: 2,
    searchPlaceholderText: "Naam voordeel, organisator of gemeente",
    showActiveAdvantages: true,
    showPublishedAdvantages: false,
    showOnlineExchangeInfo: false,
    showPermanentCardSystemAdvantages: true,
    uitDatabankUrlPrefix: "https://io-acc.uitdatabank.be",
    inSpotlightSticky: true,
  };

  static configTypes = {
    cardSystemsChecked: "array", // pipe-separated string (|)
    cardSystemsVisible: "boolean",
    defaultThumbUrl: "string",
    elasticSearchUrl: "string",
    uitpasUrl: "string",
    embedded: "boolean",
    fuzzySearch: "boolean",
    lastChanceWeeks: "number",
    searchPlaceholderText: "string",
    showActiveAdvantages: "boolean",
    showPublishedAdvantages: "boolean",
    showOnlineExchangeInfo: "boolean",
    showPermanentCardSystemAdvantages: "boolean",
    uitDatabankUrlPrefix: "string",
    inSpotlightSticky: "boolean",
  };

  static buildConfig() {
    let rootElement = document.getElementById("uitpas-search");
    let configData = rootElement.dataset;

    for (const setting in UiTPasSearchConfig.config) {
      if (configData.hasOwnProperty(setting)) {
        let configValue;
        const configSetting = configData[setting];

        switch (UiTPasSearchConfig.configTypes[setting]) {
          case "number":
            if (!isNaN(parseInt(configSetting, 10))) {
              configValue = parseInt(configSetting, 10);
            } else {
              console.warn(
                `Invalid config value '${configSetting}' for ${setting}. Must be number.`,
              );
            }

            break;

          case "boolean":
            if (!isNaN(parseInt(configSetting, 10))) {
              configValue = !!parseInt(configSetting, 10);
            } else {
              if (configSetting.toLowerCase() === "true") {
                configValue = true;
              } else if (configSetting.toLowerCase() === "false") {
                configValue = false;
              } else {
                console.warn(
                  `Invalid config value '${configSetting}' for ${setting}. Must be boolean.`,
                );
              }
            }

            break;

          case "array":
            configValue = configSetting.split("|");
            break;

          case "string":
          default:
            configValue = configData[setting];
            break;
        }

        if (typeof configValue !== "undefined") {
          UiTPasSearchConfig.set(setting, configValue);
        }
      }
    }
  }

  static set(field, value) {
    UiTPasSearchConfig.config[field] = value;
  }

  static get(field) {
    return UiTPasSearchConfig.config[field];
  }
}
