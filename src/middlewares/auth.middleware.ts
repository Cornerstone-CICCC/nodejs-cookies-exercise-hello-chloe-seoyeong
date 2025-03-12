import { Request, Response, NextFunction } from "express";
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { isLoggedIn, username } = req.signedCookies;
  if (!isLoggedIn) {
    res.status(403).redirect("/login");
    return;
  }
  next();
};
