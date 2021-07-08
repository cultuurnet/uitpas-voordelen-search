import * as React from "react";
import PropTypes from "prop-types";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

const CashInType = {
  ONLINE: "ONLINE",
};

export class OnlineLabel extends React.Component {
  static propTypes = {
    cashInType: PropTypes.array,
  };

  isOnlineExchangeable() {
    const cashInType = this.props.cashInType;
    return cashInType ? cashInType.includes(CashInType.ONLINE) : false;
  }

  render() {
    if (
      UiTPasSearchConfig.get("showOnlineExchangeInfo") &&
      this.isOnlineExchangeable()
    ) {
      return <div className="online-exchangeable">online om te ruilen</div>;
    }

    return null;
  }
}
