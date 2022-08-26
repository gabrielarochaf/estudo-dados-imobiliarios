const { faker } = require("@faker-js/faker");
const { factory } = require("factory-girl");
const { User, Contact } = require("../src/app/models");


factory.define("User", User, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define("Contact", Contact, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  href: faker.internet.domainName()
});

module.exports = factory;
