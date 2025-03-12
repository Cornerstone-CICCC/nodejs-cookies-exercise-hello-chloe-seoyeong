import { Router } from "express";
import {
  getHome,
  getJoin,
  getLogin,
  getLogout,
  getProfile,
  getUsers,
  postJoin,
  postLogin,
} from "../controllers/page.controllers";
import { checkAuth } from "../middlewares/auth.middleware";

const pageRouter = Router();

pageRouter.get("/", getHome);
pageRouter.get("/login", getLogin);
pageRouter.post("/login", postLogin);
pageRouter.get("/join", getJoin);
pageRouter.post("/join", postJoin);
pageRouter.get("/users", checkAuth, getUsers);
pageRouter.get("/profile", checkAuth, getProfile);
pageRouter.get("/logout", getLogout);

export default pageRouter;
