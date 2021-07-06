import React, { Component } from "react";
import PropTypes from "prop-types";

import { intersperse } from "../helper/UiTPasArrayUtils";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export class UiTPasCounter extends Component {
  static propTypes = {
    counterId: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.state = {
      counter: null,
    };
  }

  componentWillMount() {
    let url = this.getUiTCounterUrl();

    if (url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error("Fetching counter: " + response.statusText);
          }

          return response.json();
        })
        .then((data) => {
          if (data && data.name) {
            let counterElem = (
              <div className="uitpassearch-detail-counter">
                <div className="uitpassearch-detail-counter-name">
                  {data.name}
                </div>
                {this.renderCounterAddresses(data)}
                {this.renderCounterContactInfo(data)}
              </div>
            );

            this.setState({ counter: counterElem });
          }
        })
        .catch(function (err) {
          console.log("Fetch Error", err);
        });
    }
  }

  renderCounterAddresses(counter) {
    let addressElems = [];

    if (counter.address) {
      addressElems.push(this.renderCounterAddress(counter.address));
    }

    if (counter.addresses && counter.addresses.length > 0) {
      addressElems = addressElems.concat(
        counter.addresses.map((address) => {
          return this.renderCounterAddress(address);
        }),
      );
    }

    return addressElems;
  }

  renderCounterAddress(address) {
    return (
      <address
        className="uitpassearch-detail-counter-address"
        key={
          address.streetAddress + address.postalCode + address.addressLocality
        }
      >
        {address.streetAddress}
        {address.streetAddress ? <br /> : null}
        {address.postalCode} {address.addressLocality}
        <br />
      </address>
    );
  }

  renderCounterContactInfo(counter) {
    let contactInfo = [];
    let key = 0;

    if (counter.contactPoint) {
      if (counter.contactPoint.phone && counter.contactPoint.phone.length > 0) {
        key++;

        let phones = counter.contactPoint.phone.map((phone, i) => {
          return (
            <a href="tel:{phone}" key={i}>
              {phone}
            </a>
          );
        });

        contactInfo.push(
          <div key={key}>Tel.: {intersperse(phones, ", ")}</div>,
        );
      }

      if (counter.contactPoint.email && counter.contactPoint.email.length > 0) {
        key++;

        let emails = counter.contactPoint.email.map((email, i) => {
          return (
            <a href="mailto:{email}" key={i}>
              {email}
            </a>
          );
        });

        contactInfo.push(
          <div key={key}>E-mail: {intersperse(emails, ", ")}</div>,
        );
      }

      if (counter.contactPoint.url && counter.contactPoint.url.length > 0) {
        key++;

        let urls = counter.contactPoint.url.map((url, i) => {
          return (
            <a href={url} key={i}>
              {url}
            </a>
          );
        });

        contactInfo.push(<div key={key}>Link: {intersperse(urls, ", ")}</div>);
      }
    }

    return contactInfo;
  }

  getUiTCounterUrl() {
    if (this.props.counterId) {
      return (
        UiTPasSearchConfig.get("uitDatabankUrlPrefix") +
        "/organizers/" +
        this.props.counterId
      );
    }
  }

  render() {
    return (
      <div className="uitpassearch-detail-counters">{this.state.counter}</div>
    );
  }
}
