'use strict';

// If checking for version, just print it
if (process.argv.filter(p => p === '--version' || p === '-v').length > 0) {
  const manifest = require('../package.json');
  console.log('Version: ' + manifest.version);
  process.exit(0);
}

const http = require('http');

const options = {
  protocol: process.env.HEALTHCHECK_PROTOCOL || 'http:',
  host: process.env.HEALTHCHECK_HOST || 'localhost',
  port: parseInt(process.env.HEALTHCHECK_PORT) || 80,
  method: process.env.HEALTHCHECK_METHOD || 'HEAD',
  path: process.env.HEALTHCHECK_PATH || '/index.html',
  timeout: parseInt(process.env.HEALTHCHECK_TIMEOUT) || 3000
};

const request = http.request(options, (res) => {
  console.log('Response: ' + res.statusCode);
  if (res.statusCode < 400) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

request.end();
