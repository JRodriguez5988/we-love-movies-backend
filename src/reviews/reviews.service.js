const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
};

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
};

function update(updatedReview) {
    return knex("reviews as r")
        .select("*")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview)
};

function readReviewWithCritic(review_id) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ review_id })
        .first()
        .then(addCritic);
};

module.exports = {
    read,
    destroy,
    update,
    readReviewWithCritic,
};