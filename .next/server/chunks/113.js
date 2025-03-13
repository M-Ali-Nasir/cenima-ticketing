"use strict";
exports.id = 113;
exports.ids = [113];
exports.modules = {

/***/ 4113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);


const UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    name: {
        type: String,
        required: [
            true,
            "Please provide a name"
        ],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [
            true,
            "Please provide an email"
        ],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email", 
        ],
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please provide a password"
        ],
        minlength: 6
    },
    role: {
        type: String,
        enum: [
            "user",
            "admin"
        ],
        default: "user"
    },
    gender: {
        type: String,
        enum: [
            "male",
            "female",
            "other",
            "prefer-not-to-say"
        ],
        default: "prefer-not-to-say"
    },
    watchlist: [
        {
            type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.Types.ObjectId),
            ref: "Movie"
        }, 
    ]
}, {
    timestamps: true
});
// Hash password before saving
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().genSalt(10);
        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidatePassword, this.password);
};
// Check if model exists before creating a new one (for Next.js hot reloading)
const User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.User) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("User", UserSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ })

};
;