const express = require('express');
const router = express.Router({ mergeParams: true });

const Book = require('../models/Book')

router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save()
        const { _id, ...rest } = book._doc
        res.send({ id: _id, ...rest })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books.map(book => {
            const { _id, ...rest } = book._doc
            return ({ id: _id, ...rest })
        }))
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        const { _id, ...rest } = response._doc
        res.send({ id: _id, ...rest })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Book.findByIdAndDelete(id)
        response ? res.send(response) : res.status(404).send('Not found')
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

module.exports = router