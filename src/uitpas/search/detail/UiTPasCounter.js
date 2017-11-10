import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class UiTPasCounter extends Component {
    static propTypes = {
        counterId: PropTypes.string.isRequired,
    };

    constructor(){
        super();
        this.state = {
            counter: null
        };
    }

    componentWillMount(){
        let url = this.getUiTCounterUrl();
        if(url) {
            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    console.log(data);
                    if(data && data.name) {
                        let counterElem = (
                            <div className="uitpassearch-detail-counter">
                                <div
                                    className="uitpassearch-detail-counter-name">{data.name}</div>
                                {this.renderCounterAddresses(data)}
                                {this.renderCounterContactInfo(data)}
                            </div>
                        );
                        this.setState({counter: counterElem})
                    }
                });
        }
    }

    renderCounterAddresses(counter){
        let addressElems = [];
        if(counter.address){
            addressElems.push(this.renderCounterAddress(counter.address));
        }
        if(counter.addresses && counter.addresses.length > 0){
            addressElems = addressElems.concat(counter.addresses.map((address) => {
                return this.renderCounterAddress(address);
            }));
        }
        return addressElems;
    }

    renderCounterAddress(address){
        return (
            <address className="uitpassearch-detail-counter-address" key={address.streetAddress + address.postalCode + address.addressLocality}>
                {address.streetAddress}<br/>
                {address.postalCode} {address.addressLocality}<br/>
            </address>
        );
    }

    renderCounterContactInfo(counter){
        let contactInfo = [];
        let key = 0;
        if(counter.contactPoint){
            if(counter.contactPoint.phone && counter.contactPoint.phone.length > 0){
                let phones = counter.contactPoint.phone.map((phone) => {
                    key ++;
                    return (
                        <div key={key}>
                            Tel.: <a href="tel:{phone}">{phone}</a>
                        </div>);
                });
                contactInfo = contactInfo.concat(phones);
            }
            if(counter.contactPoint.email && counter.contactPoint.email.length > 0){
                let emails = counter.contactPoint.email.map((email) => {
                    key++;
                    return (
                        <div key={key}>
                            E-mail: <a href="mailto:{email}">{email}</a>
                        </div>);
                });
                contactInfo = contactInfo.concat(emails);
            }
            if(counter.contactPoint.url && counter.contactPoint.url.length > 0){
                let urls = counter.contactPoint.url.map((url) => {
                    key++;
                    return (
                        <div key={key}>
                            Link: <a href="{url}">{url}</a>
                        </div>);
                });
                contactInfo = contactInfo.concat(urls);
            }
        }
        return contactInfo;
    }

    getUiTCounterUrl(){
        if(this.props.counterId){
            return 'https://io-acc.uitdatabank.be/organizers/' + this.props.counterId;
        }
    }

    render(){
        return (
            <div className="uitpassearch-detail-counter">
                {this.state.counter}
            </div>
        );
    }
}