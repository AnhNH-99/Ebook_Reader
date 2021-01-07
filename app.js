import dotenv from "dotenv";
dotenv.config();
// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import accountRoutes from "./server/routes/accountRoute.js";
import loginRoutes from "./server/routes/loginRoute.js";
import categoryRoutes from "./server/routes/categoryRoute.js";
import bookRoutes from "./server/routes/bookRoute.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { authenticateJWT } from "./server/middlewares/mainMiddleware.js";

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
app.use(cookieParser());
// Set up port number
const port = process.env.PORT;

// set up mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

// Set up home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project Ebook Reader",
  });
});
// set up route
app.use("/api/", express.static("static/uploads"));
app.use("/api/", loginRoutes);
app.use("/api/", accountRoutes);
app.use("/api/",  categoryRoutes);
app.use("/api/", bookRoutes);
app.listen(port, (req, res) => {
  console.log("Example app listening at http://localhost:" + port);
});
