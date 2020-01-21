import { Post } from "../models";
import { httpErrorCreater } from "../utils";

const index = (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 3;
  console.log(req.query);
  Post.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .then(post => {
      Post.count().then(count => {
        res.status(200).send({ post, meta: { page, count, perPage } });
      });
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const read = (req, res, next) => {
  Post.findOne({
    _id: req.params.postId,
  })
    .populate({
      path: "comments._comment",
      populate: {
        path: "_author",
      },
    })
    .then(post => {
      if (post && post !== null) {
        const newPost = post;
        newPost.meta.views = post.meta.views + 1;
        newPost.save();
        res.status(200).send(post);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `post: ${req.params.postId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const create = (req, res, next) => {
  const data = new Post(req.body);
  data
    .save()
    .then(post => {
      res.status(200).send(post);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const deleteOne = (req, res, next) => {
  Post.findOneAndDelete({ _id: req.params.postId })
    .then(post => {
      if (post && post !== null) {
        res.status(200).send(post);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `post: ${req.params.postId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};
const update = (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true })
    .populate({
      path: "comments._comment",
      populate: {
        path: "_author",
      },
    })
    .then(post => {
      if (post && post !== null) {
        res.status(200).send(post);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `post: ${req.params.postId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const addComment = (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    { $push: { comments: req.body.comments } },
    { new: true }
  )
    .populate({
      path: "comments._comment",
      populate: {
        path: "_author",
      },
    })
    .then(post => {
      if (post && post !== null) {
        res.status(200).send(post);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `post: ${req.params.postId}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

export default { index, read, deleteOne, update, create, addComment };
