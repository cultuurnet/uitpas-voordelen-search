# uitpas-voordelen-search

ReactJS library for searching UiTPAS Promotions and WelcomeAdvantages.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run the app for development?

The app uses React.js and all dependency libs can be installed using [NPM](www.npmjs.com) or [Yarn](https://yarnpkg.com/). Using Yarn ensures packages are locked to the correct version.

- Install all dependencies:  `yarn install`
- Run the app using the local Node.js server:  `yarn start`
- Go to [http://localhost:3000/](http://localhost:3000/)

## How to run the app in production?

- Run the following command to create the production build: `yarn run build`

## Advanced configuration

The app can be configured using HTML data attributes on the div where the ReactJS app is loaded with 
javascript. The following configuration options are available:

### data-card-systems-checked:
*type*: string (pipe-separated), *default*: empty

Sets the list of card systems names that are selected as filters. The names should be exactly the 
same as in ElasticSearch. The names need to be separated with a pipe, i.e. '|'.
  
### data-card-systems-visible: 
*type*: boolean, *default*: true

When set to true the owning card systems filter is visible. When set to false the filter is invisible.

### data-default-thumb-url:
*type*: string, *default*: ```window.location.origin + '/img/default-thumb.png'``` 

Sets the url to the default thumbnail that is used when the advantage does not have a thumbnail.

### data-elastic-search-url:
*type*: string, *default*: 'http://acc.uitid.be:9200/promotions/'
 
Sets the url to the ElasticSearch service.

### data-embedded:
*type*: boolean, *default*: true

When this flag is set to true, the app runs as if it is embedded on a web page. This means it uses 
hash routing that does not interfere with the regular HTML page where it is embedded.  Hash routing 
uses the # anchor of the url to store the react.js routing. This is needed when embedding the app on 
existing pages, e.g. an existing drupal page.

When the flag is set to false, the app will run as if it runs on a Node.js server that allows normal
HTML formatting, e.g. [http://example.com/voordelen](http://example.com/voordelen).

### data-fuzzy-search:
*type*: boolean, *default*: true

If set to true, the query in the searchbox is appended with a '%'. This results in matching terms that
start with the query, e.g. the query 'gla' will match 'glass', 'Glasgow', 'glamrock', etc. If the 
flag is false, 'gla' will only match 'gla'.

### data-last-chance-weeks: 
*type*: number, *default*: 2

Sets the number of weeks that is used to calculate when an advantage should be marked as 'last chance'.

### data-search-placeholder-text:
*type*: string, *default*: 'Naam voordeel, organisator of gemeente'

Sets the placeholder string used in the search box.

### data-show-active-advantages: 
*type*: boolean, *default*: true

If set to true, only advantages that are labelled as active will be shown in the search results. 
This appends each query with a search filter.

### data-show-published-advantages: 
*type*: boolean, *default*: false

If set to true, only advantages that are published will be shown in the search results. This appends
each query with a search filter.

### data-show-permanent-card-system-advantages: 
*type*: boolean, *default*: true

If set to true, only advantages of card systems with the flag permanent set to true will be shown in
the results. This appends each search query with a search filter.

### data-uit-databank-url-prefix: 
*type*: string, *default*: 'https://io-acc.uitdatabank.be',

Sets the url to the UiTDatabank API.

### data-in-spotlight-sticky: 
*type*: boolean, *default*: true

If true the default ordering puts advantages that have a flag inSpotlight set to true higher.
