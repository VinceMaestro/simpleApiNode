const client = require('https')

function async_https_request(url) {
  return new Promise((resolve, reject) => {
    client.get(url, (resp) => {
      let data = ''
      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        if (resp.statusCode == 200) {
          console.log('Status Code : 200')
          resolve(data);
        } else {
          let msg = JSON.parse(data)
          reject(msg.error)
        }
      });
    });
  })
}

module.exports = async_https_request;
