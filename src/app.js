import { database } from "./db/index.js";
//import { postModel } from "./db/models/post.js";
import { postRoutes } from "./routes/postRoutes.js";

import express from "express";
import bodyParser from "body-parser";

database.initialize();

const app = express();
app.use(bodyParser.json());

app.use('/', postRoutes);

app.listen(3000, () => {
  console.log("Up and running!");
});
