import express from "express";
import { httpErrorCreater } from "../utils";
import {
  AuthController,
  UserController,
  PostController,
  CommentController,
  CategorieController,
} from "../controllers";

const router = express.Router();

router.get("/session", (req, res, next) =>
  req.session.passport
    ? res.status(200).send(req.session.passport)
    : next(httpErrorCreater({ status: 401 }))
);

// User Routes
router.get("/users", UserController.index);
router.get("/users/:userId", UserController.read);
router.put("/users/:userId", UserController.update);
router.delete("/users/:userId", UserController.deleteOne);

// Post Routes
router.get("/post", PostController.index);
router.get("/post/:postId", PostController.read);
router.post("/post", PostController.create);
router.put("/post/:postId", PostController.update);
router.put("/post/:postId/comment", PostController.addComment);
router.delete("/post/:postId", PostController.deleteOne);

// Comment Routes
router.get("/comment", CommentController.index);
router.get("/comment/:commentId", CommentController.read);
router.post("/comment", CommentController.create);
router.put("/comment/:commentId", CommentController.update);
router.delete("/comment/:commentId", CommentController.deleteOne);

// Categorie Routes
router.get("/categorie", CategorieController.index);
router.get("/categorie/:categorieId", CategorieController.read);
router.post("/categorie", CategorieController.create);
router.put("/categorie/:categorieId", CategorieController.update);
router.delete("/categorie/:categorieId", CategorieController.deleteOne);

// Login and Register
router.post("/login", AuthController.signIn);
router.post("/register", AuthController.signUp);

export default router;
