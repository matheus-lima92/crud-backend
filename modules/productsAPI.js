const Joi = require('joi');
const requestsSchema = require('../schemas/requestsSchemas.js');
const database = require('./database');

const productsAPI = {

  // https://www.npmjs.com/package/mongoose-paginate
  getProducts: (req, res) => {
    database.find({}, req.query.page)
    .then(data => {
      res.status(200);
      res.send({ data });
    })
    .catch(message => {
      res.status(500);
      res.send({ message });
    });
  },
  newProduct: (req, res) => {
    Joi.validate(req.body, requestsSchema, error => {
      if (error) {
        res.status(400);
        res.send('A new product must have a name, description, price and category!');
        return;
      }
      database.save(req.body)
      .then(response => {
        const { message, data } = response;
        res.status(200);
        res.send({ message, data });
      })
      .catch(message => {
        res.status(500);
        res.send({ message });
      });
    });
  },
  updateProduct: (req, res) => {
    Joi.validate(req.body, requestsSchema, error => {
      if (error) {
        res.status(400);
        res.send('To update a product you must send the name, description, price and category!');
        return;
      }
      database.update(req.query.id, req.body)
      .then(response => {
        const { message, data } = response;
        res.status(200);
        res.send({ message, data });
      })
      .catch(message => {
        res.status(500);
        res.send({ message });
      });
    });
  },
  deleteProduct: (req, res) => {
    database.delete(req.query.id)
    .then(message => {
      res.status(200);
      res.send({ message });
    })
    .catch(message => {
      res.status(500);
      res.send({ message });
    });
  }
}

module.exports = productsAPI;
