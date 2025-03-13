"use strict";
(() => {
var exports = {};
exports.id = 731;
exports.ids = [731];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ recommendations)
});

// EXTERNAL MODULE: ./src/utils/dbConnect.ts
var dbConnect = __webpack_require__(8025);
// EXTERNAL MODULE: ./src/models/Movie.ts
var Movie = __webpack_require__(9876);
// EXTERNAL MODULE: ./src/models/User.ts
var User = __webpack_require__(4113);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(1185);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./src/models/Booking.ts

const BookingSchema = new (external_mongoose_default()).Schema({
    user: {
        type: (external_mongoose_default()).Schema.Types.ObjectId,
        ref: "User",
        required: [
            true,
            "Please provide a user"
        ]
    },
    screening: {
        type: (external_mongoose_default()).Schema.Types.ObjectId,
        ref: "Screening",
        required: [
            true,
            "Please provide a screening"
        ]
    },
    seats: [
        {
            row: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                enum: [
                    "male",
                    "female",
                    null
                ],
                default: null
            }
        }, 
    ],
    totalAmount: {
        type: Number,
        required: [
            true,
            "Please provide the total amount"
        ],
        min: [
            0,
            "Total amount cannot be negative"
        ]
    },
    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "completed",
            "failed",
            "refunded"
        ],
        default: "pending"
    },
    bookingStatus: {
        type: String,
        enum: [
            "confirmed",
            "cancelled",
            "pending"
        ],
        default: "pending"
    },
    bookingReference: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});
// Generate a unique booking reference before saving
BookingSchema.pre("save", async function(next) {
    if (!this.bookingReference) {
        // Generate a random alphanumeric string
        const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
        const timestamp = Date.now().toString().slice(-6);
        this.bookingReference = `BK-${randomString}-${timestamp}`;
    }
    next();
});
// Validate that seats array is not empty
BookingSchema.pre("validate", function(next) {
    if (!this.seats || this.seats.length === 0) {
        this.invalidate("seats", "Please select at least one seat");
    }
    next();
});
// Check if model exists before creating a new one (for Next.js hot reloading)
const Booking = (external_mongoose_default()).models.Booking || external_mongoose_default().model("Booking", BookingSchema);
/* harmony default export */ const models_Booking = (Booking);

// EXTERNAL MODULE: ./src/utils/auth.ts
var auth = __webpack_require__(9770);
;// CONCATENATED MODULE: ./src/utils/recommendations.ts
/**
 * Generate personalized movie recommendations for a user
 * @param user The user to generate recommendations for
 * @param movies All available movies
 * @param userBookings The user's booking history
 * @returns Array of recommended movies sorted by relevance
 */ async function generateRecommendations(user, movies, userBookings) {
    // Filter out movies that have ended
    const availableMovies = movies.filter((movie)=>movie.status !== "ended");
    // Get movies the user has already watched (from bookings)
    const watchedMovieIds = userBookings.map((booking)=>booking.screening.toString());
    // Get user's watchlist
    const watchlistIds = user.watchlist.map((id)=>id.toString());
    // Get user's genre preferences from watched movies and watchlist
    const userGenrePreferences = new Map();
    // Add genres from watched movies with higher weight
    const watchedMovies = movies.filter((movie)=>watchedMovieIds.includes(movie._id.toString()));
    watchedMovies.forEach((movie)=>{
        movie.genres.forEach((genre)=>{
            const currentWeight = userGenrePreferences.get(genre) || 0;
            userGenrePreferences.set(genre, currentWeight + 2);
        });
    });
    // Add genres from watchlist with lower weight
    const watchlistMovies = movies.filter((movie)=>watchlistIds.includes(movie._id.toString()));
    watchlistMovies.forEach((movie)=>{
        movie.genres.forEach((genre)=>{
            const currentWeight = userGenrePreferences.get(genre) || 0;
            userGenrePreferences.set(genre, currentWeight + 1);
        });
    });
    // Score each movie based on user preferences
    const scoredMovies = availableMovies.filter((movie)=>!watchedMovieIds.includes(movie._id.toString())).map((movie)=>{
        let score = 0;
        // Score based on genre preferences
        movie.genres.forEach((genre)=>{
            score += userGenrePreferences.get(genre) || 0;
        });
        // Boost score for highly rated movies
        score += movie.rating * 0.5;
        // Boost score for new releases
        const daysSinceRelease = Math.floor((Date.now() - new Date(movie.releaseDate).getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceRelease < 14) {
            score += (14 - daysSinceRelease) * 0.1;
        }
        // Boost score for movies in user's watchlist
        if (watchlistIds.includes(movie._id.toString())) {
            score += 5;
        }
        // Convert to plain object and add score
        const plainMovie = {
            title: movie.title,
            description: movie.description,
            posterUrl: movie.posterUrl,
            bannerUrl: movie.bannerUrl,
            trailerUrl: movie.trailerUrl,
            duration: movie.duration,
            releaseDate: movie.releaseDate,
            endDate: movie.endDate,
            genres: movie.genres,
            cast: movie.cast,
            director: movie.director,
            language: movie.language,
            rating: movie.rating,
            reviews: movie.reviews,
            status: movie.status,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt,
            _id: movie._id,
            score
        };
        return plainMovie;
    });
    // Sort by score and return top recommendations
    return scoredMovies.sort((a, b)=>b.score - a.score).map((movie)=>{
        // Remove the score property before returning
        const { score , ...movieWithoutScore } = movie;
        return movieWithoutScore;
    });
}
/**
 * Generate similar movies based on a specific movie
 * @param movie The reference movie
 * @param allMovies All available movies
 * @returns Array of similar movies sorted by relevance
 */ function getSimilarMovies(movie, allMovies) {
    // Filter out the reference movie itself
    const otherMovies = allMovies.filter((m)=>m._id.toString() !== movie._id.toString());
    // Score each movie based on similarity
    const scoredMovies = otherMovies.map((otherMovie)=>{
        let score = 0;
        // Score based on shared genres
        const sharedGenres = otherMovie.genres.filter((genre)=>movie.genres.includes(genre));
        score += sharedGenres.length * 2;
        // Score based on same director
        if (otherMovie.director === movie.director) {
            score += 3;
        }
        // Score based on shared cast members
        const sharedCast = otherMovie.cast.filter((actor)=>movie.cast.includes(actor));
        score += sharedCast.length;
        // Score based on similar release date (within 1 year)
        const movieYear = new Date(movie.releaseDate).getFullYear();
        const otherMovieYear = new Date(otherMovie.releaseDate).getFullYear();
        if (Math.abs(movieYear - otherMovieYear) <= 1) {
            score += 1;
        }
        // Convert to plain object and add score
        const plainMovie = {
            title: otherMovie.title,
            description: otherMovie.description,
            posterUrl: otherMovie.posterUrl,
            bannerUrl: otherMovie.bannerUrl,
            trailerUrl: otherMovie.trailerUrl,
            duration: otherMovie.duration,
            releaseDate: otherMovie.releaseDate,
            endDate: otherMovie.endDate,
            genres: otherMovie.genres,
            cast: otherMovie.cast,
            director: otherMovie.director,
            language: otherMovie.language,
            rating: otherMovie.rating,
            reviews: otherMovie.reviews,
            status: otherMovie.status,
            createdAt: otherMovie.createdAt,
            updatedAt: otherMovie.updatedAt,
            _id: otherMovie._id,
            score
        };
        return plainMovie;
    });
    // Sort by score and return top similar movies
    return scoredMovies.filter((movie)=>movie.score > 0).sort((a, b)=>b.score - a.score).slice(0, 6).map((movie)=>{
        // Remove the score property before returning
        const { score , ...movieWithoutScore } = movie;
        return movieWithoutScore;
    });
}

;// CONCATENATED MODULE: ./src/pages/api/recommendations.ts






async function handler(req, res, user) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }
    try {
        await (0,dbConnect/* default */.Z)();
        // Get user details
        const userDetails = await User/* default.findById */.Z.findById(user.userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Get all movies
        const movies = await Movie/* default.find */.Z.find({});
        // Get user's booking history
        const userBookings = await models_Booking.find({
            user: user.userId
        });
        // Generate recommendations
        const recommendations = await generateRecommendations(userDetails, movies, userBookings);
        // Limit to top 10 recommendations
        const topRecommendations = recommendations.slice(0, 10);
        return res.status(200).json({
            success: true,
            data: topRecommendations
        });
    } catch (error) {
        console.error("Error generating recommendations:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
/* harmony default export */ const recommendations = ((0,auth/* isAuthenticated */.$8)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [270,113,876], () => (__webpack_exec__(3338)));
module.exports = __webpack_exports__;

})();