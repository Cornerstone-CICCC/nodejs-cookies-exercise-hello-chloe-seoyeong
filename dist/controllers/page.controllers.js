"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getProfile = exports.postJoin = exports.getJoin = exports.postLogin = exports.getLogin = exports.getLogout = exports.getHome = void 0;
const uuid_1 = require("uuid");
const users = [
    { id: (0, uuid_1.v4)(), username: "admin", password: "admin12345" },
    { id: (0, uuid_1.v4)(), username: "admin2", password: "admin23456" },
];
let isLoggedIn = false;
const getHome = (req, res) => {
    res
        .status(200)
        .render("index", { siteTitle: "🍪", pageTitle: "Home", isLoggedIn });
};
exports.getHome = getHome;
const getLogout = (req, res) => {
    res.clearCookie("isLoggedIn");
    res.clearCookie("username");
    isLoggedIn = false;
    res.status(200).redirect("/login");
};
exports.getLogout = getLogout;
const getLogin = (req, res) => {
    res
        .status(200)
        .render("login", { siteTitle: "🍪", pageTitle: "Login", isLoggedIn });
};
exports.getLogin = getLogin;
const postLogin = (req, res) => {
    const { username, password } = req.body;
    const findUser = users.find((user) => user.username === username && user.password === password);
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
exports.postLogin = postLogin;
const getJoin = (req, res) => {
    res
        .status(200)
        .render("join", { siteTitle: "🍪", pageTitle: "Join", isLoggedIn });
};
exports.getJoin = getJoin;
const postJoin = (req, res) => {
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
        id: (0, uuid_1.v4)(),
        username,
        password,
    });
    res.status(200).redirect("/");
};
exports.postJoin = postJoin;
// export const checkLogin = (req: Request, res: Response) => {
//   const { username } = req.signedCookies;
//   res.status(200).json({
//     username,
//   });
// };
const getProfile = (req, res) => {
    const { username } = req.signedCookies;
    res.status(200).render("profile", {
        siteTitle: "🍪",
        pageTitle: "Profile",
        username,
        isLoggedIn,
    });
};
exports.getProfile = getProfile;
const getUsers = (req, res) => {
    res.status(200).render("users", {
        siteTitle: "🍪",
        pageTitle: "Users List",
        users,
        isLoggedIn,
    });
};
exports.getUsers = getUsers;
