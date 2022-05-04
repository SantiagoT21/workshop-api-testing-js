const agent = require('superagent');
const chai = require('chai');

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

  it('before consume DELETE Service with item ids by parameters', async () => {
    const itemsList = await agent.get(`${urlBase}:${portBase}/${api}`);

    if (itemsList.body.length > 0) {
      itemsList.body.forEach(async (item) => {
        await agent.delete(`${urlBase}:${portBase}/${api}/${item.id}`);
      });
    }
  });

  describe('When wanna create a new item', () => {
    it('then consume POST Service with sending Json', async () => {
      const response = await agent.post(`${urlBase}:${portBase}/${api}`).send(json);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eql(json.name);
      expect(response.body.sellIn).to.eql(json.sellIn);
      expect(response.body.quality).to.eql(json.quality);
      expect(response.body.type).to.eql(json.type);
    });
  });
});
