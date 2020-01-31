const ErrHandler = require('../utils/ErrHandler');
const GoogleApiManager = require('../utils/GoogleApiManager');
const AddressAndUrlGenerator = require('../utils/AddressAndUrlGenerator');

const errHandler = new ErrHandler();
const apiManager = new GoogleApiManager();
const generator = new AddressAndUrlGenerator();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const siren = req.query.siren;
  const name = req.query.name;
  const address = req.query.address;
  const obj = await searchPhoneNumbers(siren, name, address);
  res.status(200).json(obj);
});

function isInvalidInput (siren, name, address) {
  return (siren == null || name == null || address == null || typeof (siren) !== 'string' || typeof (name) !== 'string' || typeof (address) !== 'string' || siren.length !== 9 || name.length < 1 || address.length < 1 || false);
}

async function searchPhoneNumbers (siren, name, address) {
  try {
    if (isInvalidInput(siren, name, address)) {
      throw (errHandler.usageMsg);
    }
    const complete_address = generator.genCompleteAddress(name, address);
    const url = generator.genUrlEncodedPlacesInfosQuery(complete_address);
    const places_infos = await apiManager.getPlacesInfos(url); // DONE
    if (places_infos.length < 1) {
      throw (errHandler.noPlaceInfos)
    }
    const answer = [];
    for (let i = 0; i < places_infos.length; i++) {
      const url = generator.genUrlEncodedPhoneQuery(places_infos[i].place_id); // DONE
      const res = await apiManager.getPhoneNumbersFromPlaceAPI(url); // DONE
      res.name = places_infos[i].name;
      res.permanently_closed = places_infos[i].permanently_closed;
      answer.push(res);
    }
    return (answer);
  } catch (err) {
    err.name = name;
    return ([err]);
  }
}

module.exports = router;
