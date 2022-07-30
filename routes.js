const { Router } = require('express');
const router = Router();
const fs = require('fs');
const { uuid } = require('uuidv4');

const stringProducts = fs.readFileSync('src/database.json', 'utf-8');
let products = JSON.parse(stringProducts);

router.get('/', (req, res) => {
    res.render(__dirname + '/public/index.ejs', {
        products: products,
        productsJson: stringProducts
    });
})

router.get('/newentry', (req, res) => {
    res.render(__dirname + '/public/new_entry.ejs');
})

router.post('/newentry', (req, res) => {
    const {name, description, category, stock, image} = req.body;

    if (!name || !category || !stock || !image) {
        res.status(400).send('Complete any field');
        return;
    }

    let newProduct = {
        name: name,
        description: description,
        category: category,
        stock: stock,
        image: image,
        id: uuid()
    }
    products.push(newProduct);

    const jsonProducts = JSON.stringify(products);
    fs.writeFileSync('src/database.json', jsonProducts, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
    products = products.filter(product => product.id != req.params.id);
    const jsonProducts = JSON.stringify(products);
    fs.writeFileSync('src/database.json', jsonProducts, 'utf-8');

    res.redirect('/');
});

module.exports = router;