const express = require ('express');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require ('body-parser');

const Parser = require('./Parser');
const async_https_request = require('./async_https_request');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const db = {}
require('./app/routes')(app, db);

const infos = { 'corporama': 'corporama.com' , 'pages_jaunes': 'pagesjaunes.fr', 'le_figaro': 'entreprises.lefigaro.fr' };

const port = 8000;

class Scraper {
  constructor() {
    this.parser = new Parser;
  };

  generateGoogleUrl(site, siren) {
    const url = 'https://www.google.com/search?q=' + siren + '&as_sitesearch=' + infos[site];
    return(url);
  };

  async extractInfoFromSite(url, parseMethod) {
    const data = await async_https_request(url);
    const info = this.parser[parseMethod](data);
  };
}


const site = 'corporama';
const siren = 301941407
const scraper = new Scraper();
const url_google = scraper.generateGoogleUrl(site, siren);
console.log(url_google);
try {
  const url_corporama = scraper.extractInfoFromSite(url_google, 'parseFromGoogle');
  // const url_ajax = scraper.extractInfoFromSite(url_corporama, 'parseFromCorporama');
} catch (err) {
  console.log('My Error : ' + err);
}

app.listen(port, () => {
  console.log("Live on port : " + port);
});
