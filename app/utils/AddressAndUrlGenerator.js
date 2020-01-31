const fs = require('fs');
const API_KEY = fs.readFileSync(__dirname + '/../../credentials', 'utf8');

class AddressAndUrlGenerator {
  genCompleteAddress (name, address) {
    const addr = name.toLowerCase() + ', ' + address.toLowerCase();
    return (addr);
  }

  genUrlEncodedPhoneQuery (place_id) {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=international_phone_number&key=' + API_KEY;
    return (url);
  }

  genUrlEncodedPlacesInfosQuery (address) {
    const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=' + address + '&fields=name,place_id,permanently_closed&key=' + API_KEY;
    return (url);
  }
}

module.exports = AddressAndUrlGenerator;
