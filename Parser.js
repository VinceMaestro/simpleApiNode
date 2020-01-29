const cheerio = require('cheerio');

class Parser {
  // constructor (config) {
  // }

  parseFromGoogle (data) {
    return new Promise((resolve, reject) => {
      console.log('Parsing from Google');
      const $ = cheerio.load(data);
      let url = $('.kCrYT a').attr('href');
      if (url !== undefined) {
        const start = url.indexOf('=') + 1;
        const end = url.indexOf('&');
        url = url.substr(start, end - start);
        resolve(url);
      } else {
        reject(new Error('Can not find any url on Google'));
      }
    });
  }

  parseFromCorporama (data) {
    return new Promise((resolve, reject) => {
      const url = 'https://corporama.com/ajax/legal/audiotel_phone?n=iMzAaXXURYOPMA__';
      // const $ = cheerio.load(data);
      // let url = $('');
      // if (url !== undefined) {
      //   const start =
      resolve(url);
      // } else {
      // reject('Can not find any url on Corporama');
      // }
    });
  }

  parseFromPagesJaunes (data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      // const $ = cheerio.load(data);
      resolve('03 21 27 60 68');
    //   let tel = $('.coord-numero-mobile.noTrad a').text();
    //   console.log(tel);
    //   if (tel !== undefined) {
    //     const start = tel.indexOf('=') + 1;
    //     const end = tel.indexOf('&');
    //     tel = tel.substr(start, end - start);
    //     resolve(tel);
    //   } else {
    //     reject('Can not find any tel on Pages Jaunes');
    //   }
    });
    // "coord-numero-mobile noTrad"
  }

  parseFromLeFigaro (data) {
    return new Promise((resolve, reject) => {
      console.log('Parsing from Le Figaro');
      // TODO !!!!
      if (data) {
        const $ = cheerio.load(data);
        const isDissolved = $('.od_timeline__content__item h3').text();
        console.log(isDissolved);
        resolve(isDissolved);
      } else {
        reject(new Error('Rejected'));
      }
    });
  }
}

module.exports = Parser;
