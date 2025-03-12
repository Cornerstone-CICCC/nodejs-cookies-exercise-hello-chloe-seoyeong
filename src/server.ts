import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import pageRouter from "./routes/page.routes";
import cookieParser from "cookie-parser";
dotenv.config();

// Create server
const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Set template
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../src/views"));

// Routes
app.use("/", pageRouter);

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).render("404", { siteTitle: "Cookies", pageTitle: "404" });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ☄️`);
});
