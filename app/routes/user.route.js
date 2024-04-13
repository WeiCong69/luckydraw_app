import middleware from "../middleware/index.js";
import user from "../controllers/user.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    req.get("Referrer");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/all", user.allAccess);

  app.get("/api/test/user", [middleware.authJwt.verifyToken], user.userBoard);

  app.get(
    "/api/test/mod",
    [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
    user.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    user.adminBoard
  );

  app.post("/api/profile", [middleware.authJwt.verifyToken], user.profile);
  app.post(
    "/api/updateProfile",
    [middleware.authJwt.verifyToken],
    user.updateProfile
  );

  app.get(
    "/api/user/list",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    user.showAllUser
  );

  app.get(
    '/users',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    user.getAllUser
  )
}
