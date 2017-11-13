import * as React from "react";
import UiTPasSearchConfig from "../UiTPasSearchConfig";

export default class WelcomeAdvantageSearchHits extends React.Component {

    componentWillMount(){
        let url = this.getWelcomeAdvantagesUrl();
        let urlHeaders = this.getWelcomeAdvantagesUrlHeaders(UiTPasSearchConfig.get('uitIdAPIUrlPrefix'));
        console.log(urlHeaders);
        if(url) {
            fetch(url, {
                    method: 'get',
                    mode: 'no-cors',
                    headers: urlHeaders,
                })
                .then(response => {
                    if (!response.ok) {
                        throw Error('Fetching uitpas welcome advantages: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    /*if(data && data.name) {
                        let counterElem = (
                            <div className="uitpassearch-detail-counter">
                                <div className="uitpassearch-detail-counter-name">{data.name}</div>
                                {this.renderCounterAddresses(data)}
                                {this.renderCounterContactInfo(data)}
                            </div>
                        );
                        this.setState({counter: counterElem})
                    }*/
                })
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }

    getWelcomeAdvantagesUrl(url){
        return UiTPasSearchConfig.get('uitIdAPIUrlPrefix') + '/uitid/rest/uitpas/promotion/welcomeAdvantages';
    }

    getWelcomeAdvantagesUrlHeaders(baseUrl){
        let timestamp = Math.ceil((new Date()).getTime() / 1000);
        let consumerKey = UiTPasSearchConfig.get('OAuthConsumerKey');
        let nonce = btoa(consumerKey + ':' + timestamp);
        let consumerSecret = UiTPasSearchConfig.get('OAuthConsumerSecret');
        let accessToken = ''; //no need for an access token for the consumer service OAuth1 version
        let accessTokenSecret = ''; //no need for an access token secret for the consumer service OAuth1 version
        let baseString = this.oAuthBaseString('GET', baseUrl, {}, consumerKey, accessToken, timestamp, nonce);
        let signingKey = this.oAuthSigningKey(consumerSecret, accessTokenSecret);
        let signature  = this.oAuthSignature(baseString, signingKey);

        let oauthHeader = 'OAuth oauth_consumer_key="' + consumerKey +
            '",oauth_signature_method="HMAC-SHA1"' +
            ',oauth_timestamp="' + timestamp +
            '",oauth_nonce="' + nonce +
            '",oauth_version="1.0"' +
            ',oauth_signature="' + signature + '"';
        return {
            'Authorization': oauthHeader,
        };
    }

    oAuthBaseString(method, url, params, key, token, timestamp, nonce) {
        return method
            + '&' + this.percentEncode(url)
            + '&' + this.percentEncode(this.genSortedParamStr(params, key, token, timestamp, nonce));
    };

    oAuthSigningKey(consumer_secret, token_secret) {
        return consumer_secret + '&' + token_secret;
    };

    oAuthSignature(base_string, signing_key) {
        let signature = this.hmac_sha1(base_string, signing_key);
        return this.percentEncode(signature);
    };

    percentEncode(str) {
        return encodeURIComponent(str).replace(/[!*()']/g, (character) => {
            return '%' + character.charCodeAt(0).toString(16);
        });
    };

    hmac_sha1(string, secret) {
        let jsSHA = require("jssha");
        let shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.setHMACKey(secret, "TEXT");
        shaObj.update(string);
        let hmac = shaObj.getHMAC("B64");
        return hmac;
    };

    mergeObjs(obj1, obj2) {
        for (let attr in obj2) {
            obj1[attr] = obj2[attr];
        }
        return obj1;
    };

    genSortedParamStr(params, key, token, timestamp, nonce)  {
        // Merge oauth params & request params to single object
        let paramObj = this.mergeObjs(
            {
                oauth_consumer_key : key,
                oauth_nonce : nonce,
                oauth_signature_method : 'HMAC-SHA1',
                oauth_timestamp : timestamp,
                oauth_token : token,
                oauth_version : '1.0'
            },
            params
        );
        // Sort alphabetically
        let paramObjKeys = Object.keys(paramObj);
        let len = paramObjKeys.length;
        paramObjKeys.sort();
        // Interpolate to string with format as key1=val1&key2=val2&...
        let paramStr = paramObjKeys[0] + '=' + paramObj[paramObjKeys[0]];
        for (let i = 1; i < len; i++) {
            paramStr += '&' + paramObjKeys[i] + '=' + this.percentEncode(decodeURIComponent(paramObj[paramObjKeys[i]]));
        }
        return paramStr;
    };

    render(){
        return (<p>Grid comes here</p>);
    }
}