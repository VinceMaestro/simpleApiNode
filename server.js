const express = require('express');
// const MongoClient = require ('mongodb').MongoClient;
const app = express();
const bodyParser = require('body-parser');
const Parser = require('./Parser');
const ErrHandler = require('./ErrHandler');
const asyncHttpsRequest = require('./asyncHttpsRequest');
const fs = require('fs');
const API_KEY = fs.readFileSync('./credentials', 'utf8');

app.use(bodyParser.urlencoded({ extended: true }));

const db = {};
require('./app/routes')(app, db);

const infos = { corporama: 'corporama.com', pages_jaunes: 'pagesjaunes.fr', le_figaro: 'entreprises.lefigaro.fr' };
const port = 8000;

async function extractInfoFromSite (url, parseMethod, useHttpProtocole = false) {
  try {
    const info = asyncHttpsRequest(url, useHttpProtocole).then((url) => {
      return (parser[parseMethod](url));
    });
    return (info);
  } catch (err) {
    console.error('Catch error : ', err);
    throw (err);
  }
}

async function isDissolved (siren) {
  const url_google = generator.generateGoogleUrl(siren, 'le_figaro');
  console.log(url_google);
  const url_le_figaro = await extractInfoFromSite(url_google, 'parseFromGoogle');
  const dissolved = await extractInfoFromSite(url_le_figaro, 'parseFromLeFigaro', true);
  console.log('dissolved ::::::::::::', dissolved);
  return (true);
  // return (dissolved);
}

class AddressAndUrlGenerator {
  generateFullAddress (name, address) {
    const full_address = name + ', ' + address;
    return (full_address);
  }

  generateGoogleUrl (siren, site) {
    const url = 'https://www.google.com/search?q=' + siren + '&as_sitesearch=' + infos[site];
    return (url);
  }

  generatePlaceAPIUrl (place_id) {
    // const API_KEY = 'AIzaSyBHDriH1JxvPwTBk6zrqZX2sE8oHTCvrN4';
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=international_phone_number&key=' + API_KEY;
    return (url);
  }
}

class GoogleApiManager {
  getPlaceID (address) {
    return ('ChIJ32g0trEIjEcRMQAYBCmvsmw');
  }

  async getPhoneNumberFromPlaceId (url) {
    const res = await asyncHttpsRequest(url);
    return (res);
  }
}
// https://corporama.com/ajax/legal/audiotel_phone?n=iMzAaXXURYOPMA__

async function searchPhoneNumber (siren, name, address) {
  try {
    if (siren == null || name == null || address == null || typeof (siren) !== 'string' || typeof (name) !== 'string' || typeof (address) !== 'string' || siren.length !== 9 || name.length < 1 || address.length < 1) {
      throw (errHandler.usageMsg);
    }
    if (isDissolved(siren) === false) {
      const full_address = generator.generateFullAddress(name, address);
      const place_id = apiManager.getPlaceID(full_address);
      const url = generator.generatePlaceAPIUrl(place_id);
      const res = apiManager.getPhoneNumberFromPlaceAPI(url);
      return (res.phoneNumber);
    } else {
      console.log(errHandler.dissolvedMsg);
      return;
    }

    // const google_url_corpo = await scraper.generateGoogleUrl('corporama', siren);
    // // console.log('info extracted : ' + google_url_corpo);
    // const corporama_url = await scraper.extractInfoFromSite(google_url_corpo, 'parseFromGoogle');
    // console.log('info extracted 2 : ' + corporama_url);
    // const url_ajax = await scraper.extractInfoFromSite(corporama_url, 'parseFromCorporama');
    // console.log('info extracted 3 : ' + url_ajax);
    //
    // tel_corpo =
    //
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
  // const siren = '301941407'; // OK - OK
  // const siren = '303830244'; // OK -
  // const siren = '308198449'; // NOP
  // const siren = '308701531'; // NOP - OK
  // const siren = '310227137'; // NOP
  // const siren = '310590773'; // NOP
  // const siren = '311935241'; // NOP
  const siren = '312180292'; // OK - OK
  // const siren = '312520455'; //NOP
  // const siren = '312936875'; // OK
  const name = 'EXPERDECO';
  const address = '74970 MARIGNIER';
  try {
    const run = true;
    if (run === true) {
      searchPhoneNumber(siren, name, address);
    }
  } catch (error) {
    console.error(new Error(error));
  }
}

const errHandler = new ErrHandler();
const parser = new Parser();
const apiManager = new GoogleApiManager();
const generator = new AddressAndUrlGenerator();
test();

app.listen(port, () => {
  console.log('Live on port : ' + port);
});
