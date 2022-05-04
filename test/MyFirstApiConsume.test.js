const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.headers).to.have.property('content-length');
    expect(response.headers).to.have.property('content-type');
    expect(response.header['Content-Type'], /json/);
  });

  it('Consume PATCH Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.patch('https://httpbin.org/patch').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.data).to.eq('');
    expect(response.body.args).to.eql(query);
  });

  it('Consume PUT Service with sending Json', async () => {
    const json = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    const header = {
      Accept: '*/*'
    };

    const response = await agent.put('https://httpbin.org/put').send(json).set(header);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.eql(json);
    expect(response.body.headers).to.have.property('Accept');
  });

  it('Consume DELETE Service with sending Json', async () => {
    const json = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    const header = {
      Accept: '*/*'
    };

    const response = await agent.del('https://httpbin.org/delete').send(json).set(header);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.json).to.eql(json);
    expect(response.body.headers).to.have.property('Accept');
  });
});
