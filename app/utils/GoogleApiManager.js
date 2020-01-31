const asyncHttpsRequest = require('./asyncHttpsRequest');
const ErrHandler = require('./ErrHandler');
const errHandler = new ErrHandler();

class GoogleApiManager {
  async getPlacesInfos (url) {
    let res = await asyncHttpsRequest(url);
    res = JSON.parse(res);
    return (res.candidates);
  }

  async getPhoneNumbersFromPlaceAPI (url) {
    const res = await asyncHttpsRequest(url);
    const answer = JSON.parse(res);
    if (answer.result.international_phone_number == undefined || answer.result.international_phone_number.length < 1) {
      throw (errHandler.noPhoneNumber);
    } else if (typeof (answer.result.international_phone_number) === 'object') {
      console.log('More than one phone number : ', answer.result.international_phone_number);
    }
    return ({ name: answer.result.name, num: answer.result.international_phone_number, err: null });
  }
}

module.exports = GoogleApiManager;
