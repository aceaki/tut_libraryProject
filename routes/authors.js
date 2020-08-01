const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// all authors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }

    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query })
    } catch (err) {
        console.error(err.message)
        res.redirect('/')
    }
})
// new author toute
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author()})
})

// create new author
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
})

router.get('/:id',(req,res) => {
    res.send(`show author: ${req.params.id}`)
})
router.get('/:id/edit',(req,res) => {
    res.send(`edit author: ${req.params.id}`)
})
router.put('/:id',(req,res) => {
    res.send(`update author: ${req.params.id}`)
})
router.delete('/:id',(req,res) => {
    res.send(`delete author: ${req.params.id}`)
})




module.exports = router