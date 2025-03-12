import { Request, Response } from "express";
import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

const users: User[] = [
  { id: uuidv4(), username: "admin", password: "admin12345" },
  { id: uuidv4(), username: "admin2", password: "admin23456" },
];

let isLoggedIn: boolean = false;

export const getHome = (req: Request, res: Response) => {
  res
    .status(200)
    .render("index", { siteTitle: "🍪", pageTitle: "Home", isLoggedIn });
};

export const getLogout = (req: Request, res: Response) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("username");
  isLoggedIn = false;
  res.status(200).redirect("/login");
};

export const getLogin = (req: Request, res: Response) => {
  res
    .status(200)
    .render("login", { siteTitle: "🍪", pageTitle: "Login", isLoggedIn });
};

export const postLogin = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const findUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!findUser) {
    res.status(404).render("login", {
      siteTitle: "🍪",
      pageTitle: "Login",
      errorMessage: "Username or Password is not correct. 🥲",
    });
    return;
  }
  res.cookie("isLoggedIn", true, {
    maxAge: 3 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  res.cookie("username", username, {
    maxAge: 3 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  isLoggedIn = true;
  res.status(200).redirect("/");
};

export const getJoin = (req: Request, res: Response) => {
  res
    .status(200)
    .render("join", { siteTitle: "🍪", pageTitle: "Join", isLoggedIn });
};

export const postJoin = (req: Request, res: Response) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    res.status(404).render("join", {
      siteTitle: "🍪",
      pageTitle: "Join",
      errorMessage: "Passwords are not matched.🥲",
    });
    return;
  }
  const findUser = users.find((user) => user.username === username);
  if (findUser) {
    res.status(404).render("join", {
      siteTitle: "🍪",
      pageTitle: "Join",
      errorMessage: "Username is already taken.🥲",
    });
    return;
  }
  users.push({
    id: uuidv4(),
    username,
    password,
  });
  res.status(200).redirect("/");
};

// export const checkLogin = (req: Request, res: Response) => {
//   const { username } = req.signedCookies;
//   res.status(200).json({
//     username,
//   });
// };

export const getProfile = (req: Request, res: Response) => {
  const { username } = req.signedCookies;
  res.status(200).render("profile", {
    siteTitle: "🍪",
    pageTitle: "Profile",
    username,
    isLoggedIn,
  });
};

export const getUsers = (req: Request, res: Response) => {
  res.status(200).render("users", {
    siteTitle: "🍪",
    pageTitle: "Users List",
    users,
    isLoggedIn,
  });
};
