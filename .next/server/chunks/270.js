"use strict";
exports.id = 270;
exports.ids = [270];
exports.modules = {

/***/ 9770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$8": () => (/* binding */ isAuthenticated),
/* harmony export */   "RA": () => (/* binding */ generateToken)
/* harmony export */ });
/* unused harmony exports verifyToken, getTokenFromRequest, authenticateUser, hasRole */
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
if (!JWT_SECRET) {
    throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}
function generateToken(user) {
    const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    };
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {
        expiresIn: "7d"
    });
}
function verifyToken(token) {
    try {
        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
function getTokenFromRequest(req) {
    var ref;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }
    return ((ref = req.cookies) === null || ref === void 0 ? void 0 : ref.token) || null;
}
async function authenticateUser(req, res, requiredRoles = []) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }
    // Check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return null;
    }
    return decoded;
}
function isAuthenticated(handler) {
    return async (req, res)=>{
        const user = await authenticateUser(req, res);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        return handler(req, res, user);
    };
}
function hasRole(handler, roles) {
    return async (req, res)=>{
        const user = await authenticateUser(req, res, roles);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }
        return handler(req, res, user);
    };
}


/***/ }),

/***/ 8025:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bigscreenbiz";
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */ let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);


/***/ })

};
;