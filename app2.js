var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');

var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect(database.url);

var Product = require('./models/product');

app.get('/api/products', function(req, res) {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/api/products/:product_id', function(req, res) {
    let id = req.params.product_id;
    Product.findById(id)
        .then(product => {
            if (!product) {
                res.status(404).send('Product not found.');
            } else {
                res.json(product);
            }
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).send('Error fetching product');
        });
});

app.post('/api/products', function (req, res) {
    Product.create(req.body)
        .then(function (product) {
            res.status(201).json(product);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.put('/api/products/:product_id', function(req, res) {
    let id = req.params.product_id;
    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then(product => {
            if (!product) {
                res.status(404).send('Product not found.');
            } else {
                res.json(product);
            }
        })
        .catch(err => {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
        });
});

app.put('/api/products/:asin', (req, res) => {
    const { title, price } = req.body;
    Product.findOneAndUpdate({ asin: req.params.asin }, { title, price }, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            }
            res.json(updatedProduct);
        })
        .catch(err => res.status(500).send(err.message));
});

app.delete('/api/products/:product_id', function(req, res) {
    let id = req.params.product_id;

    Product.deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 1) {
                res.send('Successfully! Product has been deleted.');
            } else {
                res.status(404).send('Product not found.');
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});

app.listen(port);
console.log("App listening on port : " + port);
