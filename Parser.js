const cheerio = require ('cheerio')

class Parser {
  constructor(config) {
  };

  parseFromGoogle(data) {
    const $ = cheerio.load(data)
    let url = $('.kCrYT a').attr('href');
    const start = url.indexOf('=') + 1;
    const end = url.indexOf("&");
    url = url.substr(start, end - start);
    return url
  };

  parseFromCorporama(data) {

  };

  parseFromPagesJaunes() {

  };

  parseFromLeFigaro() {

  };
}

module.exports = Parser;
