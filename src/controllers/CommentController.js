import { Comment } from "../models";
import { httpErrorCreater } from "../utils";

const index = (req, res, next) => {
  Comment.find()
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const read = (req, res, next) => {
  Comment.findOne({
    _id: req.params.commentId,
  })
    .then(comment => {
      if (comment && comment !== null) {
        res.status(200).send(comment);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `comment: ${req.params.commentId}`,
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
  const data = new Comment(req.body);
  data
    .save()
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const deleteOne = (req, res, next) => {
  Comment.findOneAndDelete({ _id: req.params.commentId })
    .then(comment => {
      if (comment && comment !== null) {
        res.status(200).send(comment);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `comment: ${req.params.commentId}`,
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
  Comment.findOneAndUpdate({ _id: req.params.commentId }, req.body, {
    new: true,
  })
    .then(comment => {
      if (comment && comment !== null) {
        res.status(200).send(comment);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `comment: ${req.params.comment}`,
          })
        );
      }
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

export default { index, read, deleteOne, update, create };
