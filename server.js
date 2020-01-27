const express = require('express');
// const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const Parser = require('./Parser');
const asyncHttpsRequest = require('./asyncHttpsRequest');
const app = express();
const ErrHandler = require('./ErrHandler');

app.use(bodyParser.urlencoded({ extended: true }));

const db = {};
require('./app/routes')(app, db);

const infos = { corporama: 'corporama.com', pages_jaunes: 'pagesjaunes.fr', le_figaro: 'entreprises.lefigaro.fr' };
const port = 8000;
class Scraper {
  constructor () {
    this.parser = new Parser();
  }

  generateGoogleUrl (site, siren) {
    const url = 'https://www.google.com/search?q=' + siren + '&as_sitesearch=' + infos[site];
    return (url);
  }

  generatePlaceAPIUrl () {
    const API_KEY = 'AIzaSyBHDriH1JxvPwTBk6zrqZX2sE8oHTCvrN4';
    const place_id = 'ChIJ32g0trEIjEcRMQAYBCmvsmw';
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=international_phone_number&key=' + API_KEY;
    return (url);
  }

  async extractInfoFromSite (url, parseMethod, callback) {
    try {
      const info = asyncHttpsRequest(url).then((url) => {
        return (this.parser[parseMethod](url));
      });
      return (info);
    } catch (err) {
      console.error(err);
    }
  }
}
// https://corporama.com/ajax/legal/audiotel_phone?n=iMzAaXXURYOPMA__

async function searchPhoneNumberFromSiren (siren) {
  try {
    const scraper = new Scraper();
    if (typeof (siren) !== 'string' || siren.length !== 9) {
      throw (new ErrHandler().usageMsg);
    }
    // const google_url_corpo = await scraper.generateGoogleUrl('corporama', siren);
    // // console.log('info extracted : ' + google_url_corpo);
    // const corporama_url = await scraper.extractInfoFromSite(google_url_corpo, 'parseFromGoogle');
    // console.log('info extracted 2 : ' + corporama_url);
    // const url_ajax = await scraper.extractInfoFromSite(corporama_url, 'parseFromCorporama');
    // console.log('info extracted 3 : ' + url_ajax);
    //
    // tel_corpo =

    // const google_url_pj = await scraper.generateGoogleUrl('pages_jaunes', siren);
    // // console.log('info extracted : ' + google_url_pj);
    // const pages_jaunes_url = await scraper.extractInfoFromSite(google_url_pj, 'parseFromGoogle');
    // // console.log('info extracted : ' + pages_jaunes_url);
    // const tel_pj = await scraper.extractInfoFromSite(pages_jaunes_url, 'parseFromPagesJaunes');
    // // console.log('info extracted : ' + tel_pj);

  } catch (err) {
    console.error(err);
  }
}

async function test () {
  // let siren = undefined;
  let siren = [];
  // siren = '301941407'; // OK - OK
  // siren = '303830244'; // OK -
  // siren = '308198449'; // NOP
  // siren = '308701531'; // NOP - OK
  // siren = '310227137'; // NOP
  // siren = '310590773'; // NOP
  // siren = '311935241'; // NOP
  siren = '312180292'; // OK - OK
  // siren = '312520455'; //NOP
  // siren = '312936875'; // OK
  try {
    const scraper = new Scraper();
    const url = scraper.generatePlaceAPIUrl();

    const run = false;
    if (run === true) {
      const ret = await asyncHttpsRequest(url);
      console.log(ret);
      // searchPhoneNumberFromSiren(siren);
    }
  } catch (error) {
    console.error(new Error(error));
  }
}

test();

app.listen(port, () => {
  console.log('Live on port : ' + port);
});
