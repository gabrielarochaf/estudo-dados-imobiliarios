// var data = require("../../../data/imovel.json");

// const list = Object.values(data);
// const qtdItem = list.length;
// console.log("tenho ", qtdItem, " itens");

// const devices = list.reduce((list, item) => {
//   list[item.id] = (list[item.id] || 0) + 1;
//   return list;
// }, {});

// const devices = list.reduce(
//   (list, { id }) => ({ ...list, [id]: (list[id] || 0) + 1 }),
//   {}
// );

// const fieldsAmount = Object.entries(data).reduce((acc, item) => {
//   Object.keys(item[1]).forEach((key) => (acc[key] = (acc[key] || 0) + 1));
//   return acc;
// }, {});

const { RealState } = require("../models");

class Imovel {
  _parseAddress(address) {
    try {
      const {
        precision,
        location: { lon: location_lon, lat: location_lat },
      } = address.geoLocation;

      delete address.geoLocation;

      return {
        ...address,
        precision,
        location_lon,
        location_lat,
      };
    } catch (e) {
      delete address.geoLocation;
      return address;
    }
  }

  async persists(payload) {
    try {
      payload.address = this._parseAddress(payload.address);

      payload.images = payload.images.map((url) => ({
        realStateId: payload.id,
        urlImg: url,
      }));

      const imovel = await RealState.create(payload, {
        include: ["images", "address", "pricingInfos"],
      });

      return imovel;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new Imovel();
