import * as React from "react";
import { get } from "lodash";
import UiTPasRelatedItems from "./UiTPasRelatedItems";
import UiTPasAdvantageDescription from "./UiTPasAdvantageDescription";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class UiTPasAdvantageDetail extends React.Component {
  advantage = null;
  loading = true;
  currentAdvantageId;

  constructor(props) {
    super(props);
    this.state = {
      advantage: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    let id = this.props.match.params.id;
    let url = UiTPasSearchConfig.get("elasticSearchUrl") + "_search";
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let request = new Request(url, {
      method: "POST",
      body: JSON.stringify(this.getQuery(id)),
      headers: headers,
    });

    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState(
          {
            advantage: get(data, "hits.hits[0]._source", null),
            loading: false,
          },
          function () {
            window.scrollTo(0, 0);
          },
        );
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      setTimeout(this.fetchData.bind(this), 1);
    }
  }

  render() {
    this.currentAdvantageId = this.props.match.params.id;
    this.advantage = this.state.advantage;
    this.loading = this.state.loading;

    if (this.loading) {
      return this.renderLoading();
    } else if (this.advantage) {
      return this.renderAdvantage();
    } else {
      return this.renderNoResult();
    }
  }

  renderAdvantage() {
    return (
      <div className="sk-layout__results">
        <UiTPasAdvantageDescription advantage={this.advantage} />
        <br />
        <hr className="sk-hr" />
        <UiTPasRelatedItems
          counters={this.advantage.balies}
          advantage={this.advantage.id}
          advantageType={this.advantage.doctype}
        />
      </div>
    );
  }

  renderNoResult() {
    return (
      <div className="sk-layout__results">
        <h2>Oeps! Dit voordeel bestaat niet meer...</h2>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="sk-layout__results">
        <h2>Loading...</h2>
      </div>
    );
  }

  getQuery(id) {
    return {
      query: {
        bool: {
          must: [
            {
              term: {
                id: id,
              },
            },
            {
              term: {
                "status.keyword": "ACTIVE",
              },
            },
          ],
        },
      },
      from: 0,
      size: 1,
    };
  }
}
