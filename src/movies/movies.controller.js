const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    };
    next({
        status: 404,
        message: "Movie cannot be found."
    });
};

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    if (isShowing == "true") {
        res.json({ data: await moviesService.listNowShowing() })
    };
    res.json({ data: await moviesService.list() });
};

function read(req, res) {
    res.json({ data: res.locals.movie });
};

async function listTheatersShowingMovie(req, res) {
    const { movie_id } = res.locals.movie;
    res.json({ data: await moviesService.listTheatersShowingMovie(movie_id) });
};

async function listMovieReviews(req, res) {
    const { movie_id } = res.locals.movie;
    res.json({ data: await moviesService.listMovieReviews(movie_id) });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(read)
    ],
    listTheatersShowingMovie: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(listTheatersShowingMovie)
    ],
    listMovieReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listMovieReviews)
    ],
}