import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import routes from "./routes";
import { connectDB, connection } from "./config/db";
// Get IP of client to determine location and get currency
import requestIp from "request-ip";

import session from "express-session";
// Add custom properties to "req.session"
declare module "express-session" {
  interface Session {
    user: { uuid: string };
  }
}
import connectMongo from "connect-mongo";
const MongoStore = connectMongo(session);

// Connect to the database
connectDB();

const app = express();

// Set up sessions that store cookies in the browser and in MongoDB
app.use(
  session({
    name: "expense_tracker.sid",
    secret: process.env.SECRET as string,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something is stored
    store: new MongoStore({
      mongooseConnection: connection,
      ttl: 9999999 * 24 * 60 * 60, // = 9999999 days
    }),
  })
);

// Middlewares
app.use(requestIp.mw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/transactions", routes);

// PRODUCTION DEPLOYMENT
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
  );
}
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
