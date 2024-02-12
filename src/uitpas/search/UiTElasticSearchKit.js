import {
  SearchkitManager,
  RangeQuery,
  BoolMust,
  BoolMustNot,
  BoolShould,
  ExistsQuery,
  MatchQuery,
} from "searchkit";

import UiTPasSearchConfig from "./UiTPasSearchConfig";

/**
 * This searchkit container class manages two types of searchit managers:
 * - one for regular advantages
 * - one for welcome advantages
 */
export default class UiTElasticSearchKit {
  ADVANTAGE_TYPE = "pointspromotion";
  WELCOME_ADVANTAGE_TYPE = "welcomeadvantage";

  constructor() {
    this.searchkit = null;
    this.welcomeSearchkit = null;
  }

  getDefaultSearchkit() {
    if (!this.searchkit) {
      this.searchkit = UiTElasticSearchKit.createSearchkit();
      this.initSearchkit(this.searchkit);
    }

    return this.searchkit;
  }

  getWelcomeSearchkit() {
    if (!this.welcomeSearchkit) {
      this.welcomeSearchkit = UiTElasticSearchKit.createSearchkit();
      this.initSearchkit(this.welcomeSearchkit, true);
    }

    return this.welcomeSearchkit;
  }

  initSearchkit(searchkit, isWelcome = false) {
    let defaultQueries = [];

    if (UiTPasSearchConfig.get("showActiveAdvantages")) {
      //only allow active advantages
      defaultQueries.push(MatchQuery("status.keyword", "ACTIVE"));
    }

    if (UiTPasSearchConfig.get("showPublishedAdvantages")) {
      //only allow published advantages
      defaultQueries.push({
        bool: {
          should: [
            {
              range: {
                publicationPeriodEnd: {
                  gte: "now",
                },
              },
            },
            {
              bool: {
                must_not: {
                  exists: {
                    field: "publicationPeriodEnd",
                  },
                },
              },
            },
          ],
        },
      });
    }

    if (UiTPasSearchConfig.get("showPermanentCardSystemAdvantages")) {
      defaultQueries.push(MatchQuery("owningCardSystem.permanent", true));
    }

    defaultQueries.push(
      MatchQuery(
        "doctype",
        isWelcome ? this.WELCOME_ADVANTAGE_TYPE : this.ADVANTAGE_TYPE,
      ),
    );

    //valid period queries:
    let beginPeriodQueries = [];
    beginPeriodQueries.push(
      RangeQuery("publicationPeriodBegin", { lte: "now" }),
    );
    beginPeriodQueries.push(BoolMustNot(ExistsQuery("publicationPeriodBegin")));
    defaultQueries.push(BoolShould(beginPeriodQueries));

    let endPeriodQueries = [];
    endPeriodQueries.push(RangeQuery("publicationPeriodEnd", { gte: "now" }));
    endPeriodQueries.push(BoolMustNot(ExistsQuery("publicationPeriodEnd")));
    defaultQueries.push(BoolShould(endPeriodQueries));

    let cashingPeriodQueries = [];
    cashingPeriodQueries.push(RangeQuery("cashingPeriodEnd", { gte: "now" }));
    cashingPeriodQueries.push(BoolMustNot(ExistsQuery("cashingPeriodEnd")));
    defaultQueries.push(BoolShould(cashingPeriodQueries));

    if (defaultQueries.length > 0) {
      searchkit.addDefaultQuery((query) =>
        query.addQuery(BoolMust(defaultQueries)),
      );
    }
  }

  static createSearchkit() {
    let es_url = UiTPasSearchConfig.get("elasticSearchUrl");

    return new SearchkitManager(es_url);
  }

  getDefaultSearchFields() {
    return [
      "balies.name",
      "balies.cityName",
      "balies.cityName.keyword",
      "balies.cityZip",
      "owningCardSystem.name",
      "title",
    ];
  }

  getDefaultSuggestField() {
    return "balies.name";
  }
}
