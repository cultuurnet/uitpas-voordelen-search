import * as React from "react";
import { withRouter } from "react-router";
import { SearchkitComponent } from "searchkit";
import { first, get, isArray } from "lodash";
import { Link } from "react-router-dom";

import { UiTImage } from "../component/UiTImage";
import { LastChanceLabel } from "../component/LastChanceLabel";
import { SpotlightLabel } from "../component/SpotlightLabel";

class UiTPasAdvantageItem extends SearchkitComponent {
  render() {
    const { result } = this.props;

    let title = get(result, "_source.title", "UiTPas Voordeel");
    let thumbUrl = get(result, "_source.pictures", this.defaultThumb);

    //_source.pictures can be double array:
    thumbUrl = isArray(thumbUrl)
      ? isArray(first(thumbUrl))
        ? first(first(thumbUrl))
        : first(thumbUrl)
      : thumbUrl;

    let points = get(result, "_source.points", 0);
    let counters = get(result, "_source.balies", []);
    let detailPage = this.getDetailUrl();
    let cashingPeriodEnd = get(result, "_source.cashingPeriodEnd", null);
    let spotlight = get(result, "_source.inSpotlight", null);

    return (
      <div className="sk-grid__item">
        <Link to={detailPage} className="sk-card sk-card--link sk-card--shadow">
          <div className={`sk-card__img${thumbUrl ? "" : " sk-card__img-bg"}`}>
            <LastChanceLabel
              endDate={cashingPeriodEnd}
              className="sk-card__banner"
            />
            <SpotlightLabel spotlight={spotlight} className="sk-card__banner" />
            <UiTImage src={thumbUrl} alt={title} width={480} height={360} />
          </div>
          <div className="sk-card__main">
            <h3 className="sk-card__title">{title}</h3>
            <p className="sk-card__text">{this.renderCounters(counters)}</p>
            <div className="sk-card__label">{this.makePointsLabel(points)}</div>
          </div>
        </Link>
      </div>
    );
  }

  makePointsLabel(points) {
    return points + (points === 1 ? " punt" : " punten");
  }

  renderCounters(counters) {
    let counterItems = counters
      .slice(0, 3)
      .map((counter) => `${counter.name} (${counter.cityName})`);
    let counterHtml = counterItems.join(", ");

    if (counters.length > 3) {
      counterHtml += ", ...";
    }

    return counterHtml;
  }

  getDetailUrl() {
    const { result, match } = this.props;

    //check if we are already on the detail page or not:
    if (match.path.includes(":id")) {
      //detail page
      return match.path.replace(":id", get(result, "_source.id", 0));
    } else {
      //grid
      return `${match.url}/${get(result, "_source.id", 0)}`;
    }
  }
}

export default withRouter(UiTPasAdvantageItem);
