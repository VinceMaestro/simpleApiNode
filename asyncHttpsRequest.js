function asyncHttpsRequest (url, useHttp = false) {
  return new Promise((resolve, reject) => {
    const client = useHttp === false ? require('https') : require('http');
    client.get(url, (resp) => {
      let data = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        if (resp.statusCode === 200) {
          console.log('Server status : ' + resp.statusCode);
          resolve(data);
        } else {
          console.log('Server status : ' + resp.statusCode);
          // const msg = JSON.parse(data);
          // reject(msg.error);
          reject(new Error(data));
        }
      });
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
}

module.exports = asyncHttpsRequest;
