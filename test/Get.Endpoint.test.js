const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

const urlBase = process.env.APP_BASE_URL || 'http://localhost';
const portBase = '8081';
const api = 'api/items';

describe('Given the app API endpoins', () => {
  const json = {
    name: 'chocorramo',
    sellIn: 20,
    quality: 35,
    type: 'NORMAL'
  };

  it('before consume DELETE Service with item ids by parameters', async () => {
    const itemsList = await agent.get(`${urlBase}:${portBase}/${api}`);

    if (itemsList.body.length > 0) {
      itemsList.body.forEach(async (item) => {
        await agent.delete(`${urlBase}:${portBase}/${api}/${item.id}`);
      });
    }
  });

  describe('When wanna get an item', () => {
    let createdItem;
    let itemID;

    before(async () => {
      createdItem = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);
      itemID = createdItem.body.id;
    });

    it('then consume GET Service with id by parameter', async () => {
      const response = await agent.get(`${urlBase}:${portBase}/${api}/${itemID}`);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.id).to.eq(itemID);
      expect(response.body).to.eql(createdItem.body);
    });
  });
  describe('When wanna get all items', () => {
    let firstItemCreated;
    let secondItemCreated;

    before(async () => {
      firstItemCreated = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);
      secondItemCreated = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);
    });

    it('then consume GET Service', async () => {
      const response = await agent.get(`${urlBase}:${portBase}/${api}`);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.length).to.eq(3);
      expect(response.body[1]).to.eql(firstItemCreated.body);
      expect(response.body[2]).to.eql(secondItemCreated.body);
    });
  });
});
