const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');


// Iteration #8: Adding a new movie
router.get('/movies/new', (req, res, next) => {
    Celebrity.find({})
        .then(celebrities => {
            res.render('movies/new', { celebrities })
        })
        .catch(err => next(err))
})

// Iteration #9: Adding actors to the movie cast
router.post('/movies', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
        .then(createdMovie => {
            console.log(createdMovie)
            res.redirect('/movies')
        })
        .catch(err => res.render('movies/new'))
})

router.get('/movies', (req, res, next) => {
    Movie.find({})
        .populate('cast')
        .then(movies => {
            // console.log(movies[0].cast)
            res.render('movies/index', { movies, doctitle: 'Movies' });
        })
        .catch(err => next(err));
});

// Iteration #11 Editing a movie
// router.get('/movies/:id', (req, res) => {

// });



module.exports = router;