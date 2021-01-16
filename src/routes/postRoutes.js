import { Router } from "express";
//import { postModel } from "../db/models/post.js";
import { postController }from "../controllers/postController.js";

const postRoutes = Router();

postRoutes.get("/posts", postController.getPosts);

postRoutes.get("/posts/:id", postController.getPost);

postRoutes.post("/posts", postController.createPost);

postRoutes.delete("/posts/:id", postController.deletePost);

postRoutes.put("/posts/:id", postController.updatePost);

postRoutes.patch("/posts/:id", postController.updatePost);

export { postRoutes };
