const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

function list() {
    return knex("movies").select("*");
};

function listNowShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({"mt.is_showing": true})
        .groupBy("m.movie_id");
};

function read(movieId) {
    return knex("movies").select("*").where({ "movie_id": movieId }).first();
};

function listTheatersShowingMovie(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("*")
        .where({ "mt.movie_id": movie_id });
};

function listMovieReviews(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({ "r.movie_id": movie_id })
        .then((data) => data.map(addCritic));
};

module.exports = {
    list,
    listNowShowing,
    read,
    listTheatersShowingMovie,
    listMovieReviews,
}