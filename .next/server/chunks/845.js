"use strict";
exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 1539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ layout_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/layout/Navbar.tsx




const Navbar = ()=>{
    const { 0: isOpen , 1: setIsOpen  } = (0,external_react_.useState)(false);
    const { 0: isScrolled , 1: setIsScrolled  } = (0,external_react_.useState)(false);
    const { 0: isLoggedIn , 1: setIsLoggedIn  } = (0,external_react_.useState)(false);
    const router = (0,router_.useRouter)();
    // Check if user is scrolled
    (0,external_react_.useEffect)(()=>{
        const handleScroll = ()=>{
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    // Check if user is logged in
    (0,external_react_.useEffect)(()=>{
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black shadow-lg" : "bg-black/80"}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "container mx-auto px-4 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex justify-between h-16 items-center",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            className: "flex-shrink-0 flex items-center",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent",
                                children: "BigScreenBiz"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "hidden md:block",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "ml-10 flex items-center space-x-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        className: `${router.pathname === "/" ? "text-white border-b-2 border-purple-500 font-bold" : "text-white hover:text-purple-300 font-semibold"} px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`,
                                        children: "Home"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/movies",
                                        className: `${router.pathname.includes("/movies") ? "text-white border-b-2 border-purple-500 font-bold" : "text-white hover:text-purple-300 font-semibold"} px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`,
                                        children: "Movies"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/schedule",
                                        className: `${router.pathname.includes("/schedule") ? "text-white border-b-2 border-purple-500 font-bold" : "text-white hover:text-purple-300 font-semibold"} px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`,
                                        children: "Schedule"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/contact",
                                        className: `${router.pathname === "/contact" ? "text-white border-b-2 border-purple-500 font-bold" : "text-white hover:text-purple-300 font-semibold"} px-1 py-2 text-sm transition-all duration-200 text-shadow-lg`,
                                        children: "Contact"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "hidden md:block",
                            children: isLoggedIn ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/profile",
                                        className: "bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-l-md transition-all duration-200",
                                        children: "My Account"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: handleLogout,
                                        className: "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-all duration-200",
                                        children: "Logout"
                                    })
                                ]
                            }) : /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/login",
                                className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition-all duration-200",
                                children: "Login"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "md:hidden flex items-center",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                onClick: ()=>setIsOpen(!isOpen),
                                className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none",
                                "aria-expanded": "false",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "sr-only",
                                        children: "Open main menu"
                                    }),
                                    !isOpen ? /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M4 6h16M4 12h16M4 18h16"
                                        })
                                    }) : /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                        className: "block h-6 w-6",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M6 18L18 6M6 6l12 12"
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: `${isOpen ? "block" : "hidden"} md:hidden bg-black`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "px-2 pt-2 pb-3 space-y-1 sm:px-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/",
                            className: `${router.pathname === "/" ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`,
                            children: "Home"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/movies",
                            className: `${router.pathname.includes("/movies") ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`,
                            children: "Movies"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/schedule",
                            className: `${router.pathname.includes("/schedule") ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`,
                            children: "Schedule"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/contact",
                            className: `${router.pathname === "/contact" ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`,
                            children: "Contact"
                        }),
                        isLoggedIn ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/profile",
                                    className: "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
                                    children: "My Account"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    onClick: handleLogout,
                                    className: "w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
                                    children: "Logout"
                                })
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: "/login",
                            className: "block px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700",
                            children: "Login"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const layout_Navbar = (Navbar);

;// CONCATENATED MODULE: ./src/components/layout/Footer.tsx


const Footer = ()=>{
    const currentYear = new Date().getFullYear();
    return /*#__PURE__*/ jsx_runtime_.jsx("footer", {
        className: "bg-gray-900 text-white",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-8",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "text-xl font-bold mb-4 text-purple-400",
                                    children: "BigScreenBiz"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-gray-400 mb-4",
                                    children: "Your ultimate cinema management system. Experience movies like never before with our state-of-the-art theaters and premium services."
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                            href: "#",
                                            className: "text-gray-400 hover:text-white transition-colors duration-300",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "sr-only",
                                                    children: "Facebook"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                    className: "h-6 w-6",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        fillRule: "evenodd",
                                                        d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                            href: "#",
                                            className: "text-gray-400 hover:text-white transition-colors duration-300",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "sr-only",
                                                    children: "Instagram"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                    className: "h-6 w-6",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        fillRule: "evenodd",
                                                        d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                            href: "#",
                                            className: "text-gray-400 hover:text-white transition-colors duration-300",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "sr-only",
                                                    children: "Twitter"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                    className: "h-6 w-6",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": "true",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "text-xl font-bold mb-4 text-purple-400",
                                    children: "Quick Links"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/",
                                                className: "text-gray-400 hover:text-white transition-colors duration-300",
                                                children: "Home"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/movies",
                                                className: "text-gray-400 hover:text-white transition-colors duration-300",
                                                children: "Movies"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/schedule",
                                                className: "text-gray-400 hover:text-white transition-colors duration-300",
                                                children: "Schedule"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/contact",
                                                className: "text-gray-400 hover:text-white transition-colors duration-300",
                                                children: "Contact Us"
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "text-xl font-bold mb-4 text-purple-400",
                                    children: "Contact Us"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                    className: "h-6 w-6 text-purple-400 mr-2",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "text-gray-400",
                                                    children: [
                                                        "123 Cinema Street",
                                                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                        "Movie City, MC 12345"
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                    className: "h-6 w-6 text-purple-400 mr-2",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-400",
                                                    children: "(123) 456-7890"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                    className: "h-6 w-6 text-purple-400 mr-2",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-400",
                                                    children: "info@bigscreenbiz.com"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                    className: "text-xl font-bold mb-4 text-purple-400",
                                    children: "Opening Hours"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "text-gray-400",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "font-medium",
                                                    children: "Monday - Thursday:"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                "10:00 AM - 11:00 PM"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "text-gray-400",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "font-medium",
                                                    children: "Friday - Saturday:"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                "10:00 AM - 1:00 AM"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                            className: "text-gray-400",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "font-medium",
                                                    children: "Sunday:"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                "12:00 PM - 11:00 PM"
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "border-t border-gray-800 mt-12 pt-8 text-center",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: "text-gray-400",
                            children: [
                                "\xa9 ",
                                currentYear,
                                " BigScreenBiz Cinema. All rights reserved."
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "mt-4 flex justify-center space-x-6",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/terms",
                                    className: "text-gray-400 hover:text-white transition-colors duration-300",
                                    children: "Terms of Service"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/privacy",
                                    className: "text-gray-400 hover:text-white transition-colors duration-300",
                                    children: "Privacy Policy"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/faq",
                                    className: "text-gray-400 hover:text-white transition-colors duration-300",
                                    children: "FAQ"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const layout_Footer = (Footer);

;// CONCATENATED MODULE: ./src/components/layout/Layout.tsx



const Layout = ({ children  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col min-h-screen",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(layout_Navbar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: "flex-grow",
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(layout_Footer, {})
        ]
    });
};
/* harmony default export */ const layout_Layout = (Layout);


/***/ }),

/***/ 1666:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Button = ({ children , variant ="primary" , size ="md" , isFullWidth =false , isLoading =false , leftIcon , rightIcon , className ="" , disabled , ...props })=>{
    const baseClasses = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";
    const variantClasses = {
        primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900",
        outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 active:bg-purple-100",
        ghost: "text-purple-600 hover:bg-purple-50 active:bg-purple-100"
    };
    const sizeClasses = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3"
    };
    const loadingClasses = isLoading ? "opacity-70 cursor-not-allowed" : "";
    const fullWidthClasses = isFullWidth ? "w-full" : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${fullWidthClasses} ${disabledClasses} ${className}`,
        disabled: disabled || isLoading,
        ...props,
        children: [
            isLoading && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                className: "animate-spin -ml-1 mr-2 h-4 w-4",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })
                ]
            }),
            !isLoading && leftIcon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "mr-2",
                children: leftIcon
            }),
            children,
            !isLoading && rightIcon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "ml-2",
                children: rightIcon
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ })

};
;