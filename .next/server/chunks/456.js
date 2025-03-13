"use strict";
exports.id = 456;
exports.ids = [456];
exports.modules = {

/***/ 3456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Card = ({ children , variant ="default" , className ="" , padding ="md"  })=>{
    const baseClasses = "rounded-lg overflow-hidden";
    const variantClasses = {
        default: "bg-white",
        elevated: "bg-white shadow-lg",
        outlined: "bg-white border border-gray-200"
    };
    const paddingClasses = {
        none: "",
        sm: "p-3",
        md: "p-5",
        lg: "p-7"
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`,
        children: children
    });
};
// Additional subcomponents for structured card layout
Card.Header = function CardHeader({ children , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `mb-4 ${className}`,
        children: children
    });
};
Card.Title = function CardTitle({ children , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: `text-xl font-bold ${className}`,
        children: children
    });
};
Card.Subtitle = function CardSubtitle({ children , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
        className: `text-gray-600 text-sm mt-1 ${className}`,
        children: children
    });
};
Card.Body = function CardBody({ children , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `${className}`,
        children: children
    });
};
Card.Footer = function CardFooter({ children , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `mt-4 pt-4 border-t border-gray-100 ${className}`,
        children: children
    });
};
Card.Image = function CardImage({ src , alt ="" , className =""  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `w-full ${className}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: src,
            alt: alt,
            className: "w-full h-full object-cover"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);


/***/ })

};
;