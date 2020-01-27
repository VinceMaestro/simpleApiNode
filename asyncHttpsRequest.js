const client = require('https');

function asyncHttpsRequest (url) {
  return new Promise((resolve, reject) => {
    // console.log('Reaching : ' + url);
    client.get(url, (resp) => {
      let data = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        if (resp.statusCode === 200) {
          // console.log(data)
          resolve(data);
        } else if (resp.statusCode === 302) {
          console.log('Server status : ' + resp.statusCode);
        } else {
          console.log('Server status : ' + resp.statusCode);
          // const msg = JSON.parse(data);
          // reject(msg.error);
          reject(resp);
        }
      });
    });
  });
}

module.exports = asyncHttpsRequest;
