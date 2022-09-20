const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");
const SessionController = require("./app/controllers/SessionController");
const MoskitController = require("./app/controllers/MoskitController");
const ImovelController = require("./app/controllers/ImovelController");
const ImageController = require("./app/controllers/ImageController");

// routes.post("/sessions", SessionController.store);
// routes.get("/teste", JsonController.index)
// routes.get("/check", JsonController.check)
routes.get("/", (req, res) => {
  res.send("Projeto integração com moskit");
});
routes.get("/lead/:size(\\d+)?", MoskitController.store);
routes.get("/user/:size(\\d+)?", MoskitController.usuario);
routes.get("/grant", MoskitController.update_user);
routes.get("/imoveis/:id", ImovelController.show);
routes.post("/imoveis", ImovelController.store);
routes.get("/images", ImageController.index);
routes.get("/process/:start(\\d+)?/:limit(\\d+)?", ImovelController.run);
routes.get("/load/:count(\\d+)?", ImovelController.load);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  res.status(200).send();
});

module.exports = routes;
