import mongoose from "mongoose";
import { postModel } from "../db/models/post.js";

export const postController = {
  async getPosts(req, res) {
    try {
      const posts = await postModel.find();

      res.status(200).send(posts);
    } catch (error) {
      return res
        .status(error || 500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async getPost(req, res) {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id);

      if (!post) {
        return res.status(404).send({ message: "Post not found!" });
      }

      res.status(200).send(post);
    } catch (error) {
      return res
        .status(error || 500)
        .send({ message: error.message || "Internal server error", error });
    }
  },

  async createPost(req, res) {
    try {
      const { title, content } = req.body;

      const post = new postModel({ title, content });
      await post.save();

      res.status(201).send(post);
    } catch (error) {
      return res
        .status(error || 500)
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
      return res
        .status(error || 500)
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
      return res
        .status(error || 500)
        .send({ message: error.message || "Internal server error", error });
    }
  },
};
