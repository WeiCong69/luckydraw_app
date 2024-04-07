import middleware from "../middleware/index.js";
import auth from "../controllers/auth.controller.js";

const authRoute = (app) => {
  app.use(function (req, res, next) {
    req.get("Referrer");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      middleware.verifySignUp.checkDuplicateUsernameOrEmail,
      middleware.verifySignUp.checkRolesExisted,
    ],
    auth.signup
  );

  app.post("/api/auth/signin", auth.signin);

  app.post("/api/auth/signout", auth.signout);
  app.post(
    "/api/auth/sendemail",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    auth.sendEmail
  );
  app.post(
    "/api/auth/qrcode",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    auth.qrCode
  );
  app.post(
    "/api/auth/generate/pdf",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    auth.createPDF
  );
};
export default authRoute;
