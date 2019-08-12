import { Categorie } from "../models";
import { httpErrorCreater } from "../utils";

const index = (req, res, next) => {
  Categorie.find()
    .then(categorie => {
      res.status(200).send(categorie);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const read = (req, res, next) => {
  Categorie.findOne({
    _id: req.params.categorieId,
  })
    .then(categorie => {
      if (categorie && categorie !== null) {
        res.status(200).send(categorie);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `categorie: ${req.params.categorieId}`,
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
  const data = new Categorie(req.body);
  data
    .save()
    .then(categorie => {
      res.status(200).send(categorie);
    })
    .catch(error => {
      console.log(error);
      next(httpErrorCreater({}));
    });
};

const deleteOne = (req, res, next) => {
  Categorie.findOneAndDelete({ _id: req.params.categorieId })
    .then(categorie => {
      if (categorie && categorie !== null) {
        res.status(200).send(categorie);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `categorie: ${req.params.categorieId}`,
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
  Categorie.findOneAndUpdate({ _id: req.params.categorieId }, req.body, {
    new: true,
  })
    .then(categorie => {
      if (categorie && categorie !== null) {
        res.status(200).send(categorie);
      } else {
        next(
          httpErrorCreater({
            status: 404,
            additionalData: `categorie: ${req.params.categorie}`,
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
