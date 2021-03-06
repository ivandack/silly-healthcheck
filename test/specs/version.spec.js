'use strict';
const expect = require('chai').expect;
const manifest = require('../../package.json');
const helper = require('../fixtures/helper');

describe('silly-healthcheck --version', () => {

  it('should output the version number and exit 0', () => {
    let output = helper.run('--version');

    expect(output.stderr).to.be.empty;
    expect(output.status).to.equal(0);
    expect(output.stdout).to.equal('Version: ' + manifest.version + '\n');
  });

  it('should work with the "-v" alias', () => {
    let output = helper.run('-v');

    expect(output.stderr).to.be.empty;
    expect(output.status).to.equal(0);
    expect(output.stdout).to.equal('Version: ' + manifest.version + '\n');
  });

});
