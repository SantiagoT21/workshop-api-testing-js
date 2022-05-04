const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;

const urlBase = 'http://localhost';
const portBase = '2432';
const api = 'api/items';

describe('Given de items are created', () => {
  const json = {
    name: 'chocorramo',
    sellIn: 20,
    quality: 35,
    type: 'NORMAL'
  };

  describe('When wanna remove a item from the list', () => {
    let createdItem;
    let itemID;

    before(async () => {
      createdItem = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);
      itemID = createdItem.body.id;
    });

    it('then consume DELETE Service with id by parameter', async () => {
      const response = await agent.delete(`${urlBase}:${portBase}/${api}/${itemID}`);
      expect(response.status).to.equal(statusCode.OK);
    });
  });

  describe('When wanna remove all items from the list', () => {
    it('then consume DELETE Service with item ids by parameters', async () => {
      const itemsList = await agent.get(`${urlBase}:${portBase}/${api}`);

      if (itemsList.body.length > 0) {
        itemsList.body.forEach(async (item) => {
          await agent.delete(`${urlBase}:${portBase}/${api}/${item.id}`);
        });
      }
    });
  });
});
