const http = require('http');

const options = {
  host: process.env.HEALTHCHECK_HOST || 'localhost',
  port: parseInt(process.env.HEALTHCHECK_PORT) || 80,
  method: process.env.HEALTHCHECK_METHOD || 'HEAD',
  path: process.env.HEALTHCHECK_PATH || '/index.html',
  timeout: parseInt(process.env.HEALTHCHECK_TIMEOUT) || 2000
};

const request = http.request(options, (res) => {
  console.log(`Response: ${res.statusCode}`);
  if (res.statusCode < 400) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function (err) {
  console.log(`${err}`);
  process.exit(1);
});

request.end();
