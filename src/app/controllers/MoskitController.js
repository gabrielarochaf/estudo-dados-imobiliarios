const api = require("../../config/api");
const { faker } = require("@faker-js/faker");
const MoskitService = require("../services/moskit");
const { sleep } = require("../helpers");

// const factory = require("../../../__tests__/factories");
// const copyRealState = require("./ImoveisController")

class MoskitController {
  async index(req, res) {
    //   const { email, password } = req.body;
    const { data } = await api.get("pokemon/ditto");

    res.json({ data });
  }

  async check(req, res) {
    const moskit = MoskitService();
    try {
      await moskit.hello();

      res.json("ok");
    } catch (error) {
      const {
        response: { status, data },
      } = error;

      res.status(status).json(data);
    }
  }

  async store(req, res) {
    const moskit = MoskitService();

    // const size = Number(req.params.size) || 5;
    const size = Number(req.params.size) || 1;

    const { data: users } = await moskit.get("users");

    const slug = await moskit.get_imovel();

    try {
      const geraLead = (userId, slugImovel) => {
        const name = faker.name.firstName();
        const email = faker.internet.email();
        const phone = faker.phone.number();

        moskit.send({
          // name: faker.name.firstName(),
          name: name,
          email: email,
          phone: phone,
          userId,
          href: slugImovel,
          leadText: slugImovel.split("/"),
          description: `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nImovel: ${
            slugImovel.split("/")[4]
          }\nLink do site: ${slugImovel}`,
        });
      };
      //Processo enfileirado com pausa de 2 segundos
      let results = [];

      for (let i = 0; i < size; i++) {
        const lucky = Math.floor(Math.random() * users.length);
        const slug_imovel = Math.floor(Math.random() * slug.length);

        const data = geraLead(users[lucky].id, slug[slug_imovel]); //Adicionar para produtos

        results.push({
          i,
          data,
          produto: {
            title: slug[slug_imovel].split("/")[4],
          },
          responsibily: {
            id: users[lucky].id,
            name: users[lucky].name,
          },
        });

        await sleep(2); // Esperar 2 segundos entre chamadas
      }

      // Processo em paralelo

      // const list = Array(size).fill(0).map(async (_, i) => {
      //     const data = await geraLead()
      //     results.push({i, data})
      // })

      // await Promise.all(list)
      // const list = Array(size).fill(0).map((_, i) => geraLead().then(data => results.push({i, data})))

      // await Promise.all(list)

      res.json(results);
    } catch (error) {
      // const {response: {status, data}} = error

      res.status(500).json(error);
    }
  }

  async usuario(req, res) {
    const moskit = MoskitService();
    const size = Number(req.params.size) || 5;
    const { data: teams } = await moskit.get("teams");
    try {
      const geraUser = (teamId) =>
        moskit.user({
          name: faker.name.firstName(),
          username: faker.internet.email(),
          phone: faker.phone.number(),
          // teamId: 49337,
          teamId,
          pipelineId: 53404,
          dashboardId: 49139, // Pega no proprio moskit (dentro de dash)
        });

      //Processo enfileirado com pausa de 2 segundos
      let results = [];

      for (let i = 0; i < size; i++) {
        const chosedTeam = Math.floor(Math.random() * teams.length + 1);
        const data = await geraUser(teams[chosedTeam]);

        results.push({
          i,
          data,
          team: {
            id: teams[chosedTeam].id,
            name: teams[chosedTeam].name,
          },
        });

        await sleep(2); // Esperar 2 segundos entre chamadas
      }

      // Processo em paralelo

      // const list = Array(size).fill(0).map(async (_, i) => {
      //     const data = await geraLead()
      //     results.push({i, data})
      // })

      // await Promise.all(list)
      // const list = Array(size).fill(0).map((_, i) => geraLead().then(data => results.push({i, data})))

      // await Promise.all(list)

      res.json(results);
    } catch (error) {
      // const {response: {status, data}} = error
      console.log(error);
      res.status(500).json(error);
    }
  }

  async update_user(req, res) {
    const moskit = MoskitService();

    const { data: users } = await moskit.get("users");

    try {
      let results = [];

      for (let user of users) {
        const { data } = await moskit.userAlt(user);

        results.push({ id: user.id, data });
      }

      // Processo em paralelo

      // const list = Array(size).fill(0).map(async (_, i) => {
      //     const data = await geraLead()
      //     results.push({i, data})
      // })

      // await Promise.all(list)
      // const list = Array(size).fill(0).map((_, i) => geraLead().then(data => results.push({i, data})))

      // await Promise.all(list)

      res.json({ users, results });
    } catch (error) {
      // const {response: {status, data}} = error

      res.status(500).json(error);
    }
  }
}

module.exports = new MoskitController();
