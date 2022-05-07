const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

const urlBase = 'http://localhost';
const portBase = '2432';
const api = 'api/items';

describe('Given the app API endpoins', () => {
  const json = {
    name: 'chocorramo',
    sellIn: 20,
    quality: 35,
    type: 'NORMAL'
  };

  const updateJson = {
    name: 'chocorramo',
    sellIn: 25,
    quality: 45,
    type: 'TICKETS'
  };

  it('before consume DELETE Service with item ids by parameters', async () => {
    const itemsList = await agent.get(`${urlBase}:${portBase}/${api}`);

    if (itemsList.body.length > 0) {
      itemsList.body.forEach(async (item) => {
        await agent.delete(`${urlBase}:${portBase}/${api}/${item.id}`);
      });
    }
  });

  describe('When wanna update a item', () => {
    let createdItem;
    let itemID;

    before(async () => {
      createdItem = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);
      itemID = createdItem.body.id;
    });

    it('then consume PUT Service with id by parameter and sending Json', async () => {
      const response = await agent.put(`${urlBase}:${portBase}/${api}/${itemID}`).send(updateJson);

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eql(updateJson.name);
      expect(response.body.sellIn).to.eql(updateJson.sellIn);
      expect(response.body.quality).to.eql(updateJson.quality);
      expect(response.body.type).to.eql(updateJson.type);
    });
  });
  describe('When wanna update a item quality', () => {
    let createdItem;
    let itemID;

    before(async () => {
      createdItem = await agent.post(`${urlBase}:${portBase}/${api}`).send(updateJson);
      itemID = createdItem.body.id;
    });

    it('then consume POST Service', async () => {
      const response = await agent.post(`${urlBase}:${portBase}/${api}/quality`);
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body[1].id).to.eql(itemID);
      expect(response.body[1].name).to.eql(updateJson.name);
      expect(response.body[1].sellIn).to.eql(updateJson.sellIn - 1);
      expect(response.body[1].quality).to.eql(updateJson.quality + 1);
    });
  });
});
