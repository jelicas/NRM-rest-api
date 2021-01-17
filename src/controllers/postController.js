import mongoose from "mongoose";
import { postModel } from "../db/models/post.js";
import { userModel } from "../db/models/user.js";

export const postController = {
  async getPosts(req, res) {
    try {
      let posts = [];
      const { limit, offset } = req.query;

      if (limit && offset) {
        posts = await postModel
          .find()
          .skip(parseInt(offset))
          .limit(parseInt(limit));
      } else {
        posts = await postModel.find();
      }

      res.status(200).send(posts);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async getPost(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id, "title content user_id");

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      res.status(200).send(post);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async createPost(req, res) {
    try {
      const { title, content, user_id } = req.body;

      const user = await userModel.findById(user_id);

      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      const post = new postModel({ title, content, user_id });
      await post.save();

      res.status(201).send(post);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      res.sendStatus(204);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async updatePost(req, res) {
    try {
      const { id } = req.params;

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      const post = await postModel.findByIdAndUpdate(id, req.body);
      res.status(200).send(post);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async getPostComments(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id, "comments");

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      res.status(200).send(post.comments);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async addComment(req, res) {
    try {
      const { id } = req.params;
      const comment = {
        content: req.body.content,
        user_id: req.body.user_id,
      };
      const post = await postModel.findById(id);

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      post.comments.push(comment);
      await post.save();

      res.status(201).send(comment);
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || "Internal server error", error });
    }
  },
};
