class ErrHandler {
  constructor () {
    this.usageMsg = { err: 'Usage : http://localhost/8000/:siren  :: Return a json format string: { err: errMessage,  phoneNumber: num }', num: null };
  }
}

module.exports = ErrHandler;
