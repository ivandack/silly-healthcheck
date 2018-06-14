'use strict';

const http = require('http');
const expect = require('chai').expect;
const helper = require('../fixtures/helper');

describe('silly-healthcheck', () => {

  it('should fail if the port is not being listened (no server)', () => {
    let output = helper.run();
    expect(output.stdout).to.be.empty;
    expect(output.status).to.equal(1);
    expect(output.stderr).to.contain('ECONNREFUSED');
  });

  xit('should pass if server returns HTTP 200', (done) => {
    const server = http.createServer((req, res) => {
      res.end(req.method);
    }).listen(() => {
      const port = server.address().port;
      process.env.HEALTHCHECK_PORT = port;

      // console.log('Port: ' + port);
      let output = helper.run();
      // console.log(output);

      expect(output.stderr).to.be.empty;
      expect(output.status).to.equal(0);
      expect(output.stdout).to.equal('Response: 200\n');
      server.close();
      done();
    });
  });

});
