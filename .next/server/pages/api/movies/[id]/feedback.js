"use strict";
(() => {
var exports = {};
exports.id = 82;
exports.ids = [82];
exports.modules = {

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 8109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ feedback)
});

// EXTERNAL MODULE: ./src/utils/dbConnect.ts
var dbConnect = __webpack_require__(8025);
// EXTERNAL MODULE: ./src/models/Movie.ts
var Movie = __webpack_require__(9876);
// EXTERNAL MODULE: ./src/utils/auth.ts
var auth = __webpack_require__(9770);
;// CONCATENATED MODULE: external "natural"
const external_natural_namespaceObject = require("natural");
var external_natural_default = /*#__PURE__*/__webpack_require__.n(external_natural_namespaceObject);
;// CONCATENATED MODULE: ./src/utils/feedbackAnalysis.ts

// Initialize the sentiment analyzer
const analyzer = new (external_natural_default()).SentimentAnalyzer("English", (external_natural_default()).PorterStemmer, "afinn");
// Initialize the language processor
const tokenizer = new (external_natural_default()).WordTokenizer();
const stemmer = (external_natural_default()).PorterStemmer;
// Common English stopwords
const stopwords = [
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "were",
    "will",
    "with",
    "the",
    "this",
    "but",
    "they",
    "have",
    "had",
    "what",
    "when",
    "where",
    "who",
    "which",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "can",
    "just",
    "should",
    "now"
];
// Offensive words list (simplified for demo)
const offensiveWords = [
    "abuse",
    "abusive",
    "attack",
    "awful",
    "bad",
    "crap",
    "damn",
    "disgusting",
    "hate",
    "horrible",
    "idiot",
    "jerk",
    "loser",
    "nasty",
    "offensive",
    "pathetic",
    "racist",
    "sexist",
    "shit",
    "stupid",
    "suck",
    "terrible",
    "trash",
    "ugly",
    "worst",
    "worthless"
];
// Stemmed offensive words for better matching
const stemmedOffensiveWords = offensiveWords.map((word)=>stemmer.stem(word));
function analyzeFeedback(text) {
    // Tokenize the text
    const tokens = tokenizer.tokenize(text.toLowerCase());
    // Stem the tokens
    const stemmedTokens = tokens.map((token)=>stemmer.stem(token));
    // Analyze sentiment
    const sentimentScore = analyzer.getSentiment(tokens);
    // Check for offensive content
    const offensiveMatches = stemmedTokens.filter((token)=>stemmedOffensiveWords.includes(token));
    // Map stemmed offensive words back to original words in the text
    const foundOffensiveWords = tokens.filter((token, index)=>stemmedOffensiveWords.includes(stemmedTokens[index]));
    // Extract keywords (simplified approach)
    const keywords = tokens.filter((token)=>token.length > 3 && !stopwords.includes(token)).slice(0, 5);
    return {
        sentiment: {
            score: sentimentScore,
            comparative: sentimentScore / tokens.length,
            vote: sentimentScore > 0.05 ? "positive" : sentimentScore < -0.05 ? "negative" : "neutral"
        },
        isOffensive: offensiveMatches.length > 0,
        offensiveWords: Array.from(new Set(foundOffensiveWords)),
        keywords
    };
}
function moderateFeedback(text) {
    const analysis = analyzeFeedback(text);
    // Reject if offensive
    if (analysis.isOffensive) {
        return {
            isApproved: false,
            moderatedText: text,
            reason: `Contains offensive language: ${analysis.offensiveWords.join(", ")}`
        };
    }
    // Reject if extremely negative
    if (analysis.sentiment.score < -0.7) {
        return {
            isApproved: false,
            moderatedText: text,
            reason: "Extremely negative content"
        };
    }
    // Censor offensive words if any slipped through our detection
    let moderatedText = text;
    offensiveWords.forEach((word)=>{
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        moderatedText = moderatedText.replace(regex, "****");
    });
    return {
        isApproved: true,
        moderatedText
    };
}

;// CONCATENATED MODULE: ./src/pages/api/movies/[id]/feedback.ts




async function handler(req, res, user) {
    const { id  } = req.query;
    await (0,dbConnect/* default */.Z)();
    // GET - Retrieve all feedback for a movie
    if (req.method === "GET") {
        try {
            const movie = await Movie/* default.findById */.Z.findById(id).select("reviews");
            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: "Movie not found"
                });
            }
            return res.status(200).json({
                success: true,
                data: movie.reviews
            });
        } catch (error) {
            console.error("Error fetching feedback:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
    // POST - Submit new feedback
    if (req.method === "POST") {
        try {
            const { rating , comment  } = req.body;
            if (!rating || !comment) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide rating and comment"
                });
            }
            // Validate rating
            const numericRating = Number(rating);
            if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating must be between 1 and 5"
                });
            }
            // Moderate the feedback
            const moderation = moderateFeedback(comment);
            if (!moderation.isApproved) {
                return res.status(400).json({
                    success: false,
                    message: "Feedback rejected by moderation",
                    reason: moderation.reason
                });
            }
            const movie1 = await Movie/* default.findById */.Z.findById(id);
            if (!movie1) {
                return res.status(404).json({
                    success: false,
                    message: "Movie not found"
                });
            }
            // Check if user has already submitted feedback
            const existingReview = movie1.reviews.find((review)=>review.user.toString() === user.userId);
            if (existingReview) {
                // Update existing review
                existingReview.rating = numericRating;
                existingReview.comment = moderation.moderatedText;
                existingReview.createdAt = new Date();
            } else {
                // Add new review
                movie1.reviews.push({
                    user: user.userId,
                    rating: numericRating,
                    comment: moderation.moderatedText,
                    createdAt: new Date()
                });
            }
            // Update movie rating
            const totalRating = movie1.reviews.reduce((sum, review)=>sum + review.rating, 0);
            movie1.rating = totalRating / movie1.reviews.length;
            await movie1.save();
            return res.status(201).json({
                success: true,
                data: {
                    message: "Feedback submitted successfully"
                }
            });
        } catch (error1) {
            console.error("Error submitting feedback:", error1);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
    // DELETE - Remove feedback
    if (req.method === "DELETE") {
        try {
            const movie2 = await Movie/* default.findById */.Z.findById(id);
            if (!movie2) {
                return res.status(404).json({
                    success: false,
                    message: "Movie not found"
                });
            }
            // Find the review index
            const reviewIndex = movie2.reviews.findIndex((review)=>review.user.toString() === user.userId);
            if (reviewIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: "Review not found"
                });
            }
            // Remove the review
            movie2.reviews.splice(reviewIndex, 1);
            // Update movie rating
            if (movie2.reviews.length > 0) {
                const totalRating1 = movie2.reviews.reduce((sum, review)=>sum + review.rating, 0);
                movie2.rating = totalRating1 / movie2.reviews.length;
            } else {
                movie2.rating = 0;
            }
            await movie2.save();
            return res.status(200).json({
                success: true,
                data: {
                    message: "Feedback removed successfully"
                }
            });
        } catch (error2) {
            console.error("Error removing feedback:", error2);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }
    return res.status(405).json({
        success: false,
        message: "Method not allowed"
    });
}
/* harmony default export */ const feedback = ((0,auth/* isAuthenticated */.$8)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [270,876], () => (__webpack_exec__(8109)));
module.exports = __webpack_exports__;

})();