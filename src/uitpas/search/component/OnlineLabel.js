import * as React from "react";
import PropTypes from "prop-types";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

const CashInType = {
  ONLINE: "ONLINE",
};

export class OnlineLabel extends React.Component {

  isOnlineExchangeable() {
    const cashInType = this.props.cashInType;
    return cashInType ? cashInType.includes(CashInType.ONLINE) : false;
  }

  render() {
    if (
      UiTPasSearchConfig.get("showOnlineExchangeInfo") &&
      this.isOnlineExchangeable()
    ) {
      const { link } = this.props;
      const label = "Online om te ruilen";
      return link ? (
        <a href={link} className="online-exchangeable">
          {label}
        </a>
      ) : (
        <div className="online-exchangeable">{label}</div>
      );
    }

    return null;
  }
}

OnlineLabel.propTypes = {
  cashInType: PropTypes.array,
  link: PropTypes.string,
};
