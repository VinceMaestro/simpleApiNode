class ErrHandler {
  constructor () {
    this.usageMsg = { err: 'Usage : http://localhost/8000&siren&name&address - Return a json with "err" & "num" ', num: null };
    this.dissolvedMsg = { err: 'Company dissolved, no phone number to display', num: null };
    this.testingPhase = { err: 'Code still in testing phase, reaching end of tests', num: null };
    this.noPlaceInfos = { err: 'No place informations found', num: null };
    this.noPhoneNumber = { err: 'No place phone number found', num: null };
  }
}

module.exports = ErrHandler;
