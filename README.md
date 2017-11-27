# uitpas-voordelen-search

ReactJS library for searching UiTPAS Promotions and WelcomeAdvantages.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## How to run the app for development?

The app uses React.js and all dependency libs can be installed using [npm](www.npmjs.com) or [Yarn](https://yarnpkg.com/). 

- Install all dependencies:  `npm install`
- Run the app using the local Node.js server:  `npm start`
- Go to [http://localhost:3000/](http://localhost:3000/)

## How to run the app in production?

- Run the following command to create the production build: `npm run build`

## Advanced configuration

### Changing the routing format

The app can use normal url formatting, e.g. [http://example.com/voordelen](http://example.com/voordelen),
which typically requires a Node.js server. To do this you can use the UiTPasSearchStandAloneApp in `index.js`. 

Or use hash routing which uses the # anchor of the url to store the react.js routing. This is needed
when embedding the app on existing pages, e.g. an existing drupal page. To achieve this, one can use
the UiTPasSearchEmbeddedApp in `index.js` (which is configured by default).
