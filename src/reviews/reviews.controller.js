const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    };
    next({
        status: 404,
        message: "Review cannot be found."
    });
};

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    await reviewsService.update(updatedReview)
    res.json({ data: await reviewsService.readReviewWithCritic(res.locals.review.review_id) });
}

async function destroy(req, res) {
    const { review_id } = res.locals.review;
    await reviewsService.destroy(review_id);
    res.sendStatus(204);
};

module.exports = {
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ],
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
    ],
};