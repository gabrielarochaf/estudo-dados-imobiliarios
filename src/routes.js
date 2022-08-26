const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");
const SessionController = require("./app/controllers/SessionController");
const JsonController = require("./app/controllers/JsonController");

// routes.post("/sessions", SessionController.store);
// routes.get("/teste", JsonController.index)
// routes.get("/check", JsonController.check)
routes.get("/lead/:size(\\d+)?", JsonController.store);
routes.get("/user/:size(\\d+)?", JsonController.usuario);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  res.status(200).send();
});

module.exports = routes;
