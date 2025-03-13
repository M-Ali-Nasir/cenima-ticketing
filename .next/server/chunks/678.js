"use strict";
exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 1678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ movies_MovieGrid)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/ui/Card.tsx
var Card = __webpack_require__(3456);
// EXTERNAL MODULE: ./src/components/ui/Button.tsx
var Button = __webpack_require__(1666);
;// CONCATENATED MODULE: ./src/components/movies/MovieCard.tsx





const MovieCard = ({ id , title , genre , releaseDate , poster , rating , duration  })=>{
    const { 0: isHovered , 1: setIsHovered  } = (0,external_react_.useState)(false);
    const formatDate = (dateString)=>{
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "h-full transition-all duration-300 transform hover:scale-[1.02]",
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Card/* default */.Z, {
            variant: "elevated",
            padding: "none",
            className: "h-full flex flex-col",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Card/* default.Image */.Z.Image, {
                            src: poster || "/placeholder-movie.jpg",
                            alt: `${title} poster`,
                            className: "h-[380px]"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "absolute top-2 right-2 bg-purple-600 text-white font-bold py-1 px-2 rounded",
                            children: rating.toFixed(1)
                        }),
                        isHovered && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                        className: "text-white font-bold text-xl mb-2",
                                        children: title
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-gray-300 mb-2",
                                        children: genre.join(", ")
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        className: "text-gray-300 mb-4",
                                        children: [
                                            duration,
                                            " • ",
                                            formatDate(releaseDate)
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex justify-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: `/movies/${id}`,
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                                    variant: "primary",
                                                    size: "sm",
                                                    children: "View Details"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: `/booking/${id}`,
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "bg-white bg-opacity-10",
                                                    children: "Book Tickets"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "p-4 flex-grow",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                            className: "font-bold text-lg truncate",
                            children: title
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: "text-gray-600 text-sm",
                            children: [
                                genre.slice(0, 2).join(", "),
                                genre.length > 2 ? "..." : ""
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "mt-2 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-sm text-gray-500",
                                    children: duration
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-sm text-gray-500",
                                    children: formatDate(releaseDate)
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const movies_MovieCard = (MovieCard);

;// CONCATENATED MODULE: ./src/components/movies/MovieGrid.tsx



const MovieGrid = ({ title , movies , loading =false , emptyMessage ="No movies found"  })=>{
    const { 0: mounted , 1: setMounted  } = (0,external_react_.useState)(false);
    // This ensures hydration issues are avoided
    (0,external_react_.useEffect)(()=>{
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "mb-10",
        children: [
            title && /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: "text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2",
                children: title
            }),
            loading ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6",
                children: Array.from({
                    length: 10
                }).map((_, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "animate-pulse",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "bg-gray-300 rounded-lg h-[380px] mb-2"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "h-5 bg-gray-300 rounded w-3/4 mb-2"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "h-4 bg-gray-300 rounded w-1/2"
                            })
                        ]
                    }, index))
            }) : movies.length > 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6",
                children: movies.map((movie)=>/*#__PURE__*/ jsx_runtime_.jsx(movies_MovieCard, {
                        id: movie.id,
                        title: movie.title,
                        genre: movie.genre,
                        releaseDate: movie.releaseDate,
                        poster: movie.poster,
                        rating: movie.rating,
                        duration: movie.duration
                    }, movie.id))
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "text-center py-12",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                        className: "mx-auto h-12 w-12 text-gray-400",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: "mt-2 text-sm font-medium text-gray-900",
                        children: emptyMessage
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mt-1 text-sm text-gray-500",
                        children: "Try changing your search or filter criteria."
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const movies_MovieGrid = (MovieGrid);


/***/ })

};
;