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
