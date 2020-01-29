class ErrHandler {
  constructor () {
    this.usageMsg = { err: 'Usage : http://localhost/8000&siren&name&address  :: Return a json format string: { err: errMessage,  phoneNumber: num }', num: null };
    this.dissolvedMsg = { err: 'Company dissolved, no phone number to display', num: null };
  }
}

module.exports = ErrHandler;
