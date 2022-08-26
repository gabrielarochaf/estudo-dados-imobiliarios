const api = require("../../config/api");
const { faker } = require("@faker-js/faker");
const MoskitService = require("../services/moskit");
const UsuarioService = require("../services/usuario");
const { sleep } = require("../helpers");
// const factory = require("../../../__tests__/factories");

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
    const size = Number(req.params.size) || 5;


    const {data: users} = await moskit.get('users')

    

    
 
    try {
      const geraLead = (userId) =>
        moskit.send({
          name: faker.name.firstName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          userId,
          href: faker.internet.domainName(),
          leadText: "Lead-Loja-Corretor Edificio Gold Center prontos",
          description:
            "Nome: teste\nTelefone: xx xxxx-xxxx\nEmail: teste@email.com\nImovel: Edificio Gold Center\nCategoria: prontos\nLink do site: https://catulio.adaoimoveis.com.br/imovel/prontos/5549-edificio-gold-center",
        });

      //Processo enfileirado com pausa de 2 segundos
      let results = [];

      for (let i = 0; i < size; i++) {
        const lucky = Math.floor(Math.random() * users.length)
        const data = await geraLead(users[lucky].id);

        results.push({ 
          i, 
          data, 
          responsibily: {
            id:users[lucky].id,
            name: users[lucky].name
          } 
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
  

    try {
      const geraUser = () =>
        moskit.user({
          name: faker.name.firstName(),
          username: faker.internet.email(),
          phone: faker.phone.number(),
          teamId: 48146 ,
          pipelineId: 52050 ,
          dashboardId: 47704 ,
        });

      //Processo enfileirado com pausa de 2 segundos
      let results = [];

      for (let i = 0; i < size; i++) {
        const data = await geraUser();

        results.push({ i, data });

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
    
    const {data: users} = await moskit.get('users')
 
    try {
      
      let results = [];

      for (let user of users) {
       const {data} = await moskit.userAlt(user)

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

      res.json({users, results});
    } catch (error) {
      // const {response: {status, data}} = error

      res.status(500).json(error);
    }
  }
}

module.exports = new MoskitController();
