/* =========================================================
   SHOPNEST - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DEMO PRODUCT DATA
   Later this will come from the database/API.
========================================================= */

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2490,
        oldPrice: 2990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        featured: true,
        stock: 25
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 3590,
        oldPrice: 4290,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        featured: true,
        stock: 18
    },

    {
        id: 3,
        name: "Premium Sneakers",
        category: "Fashion",
        price: 2890,
        oldPrice: 3490,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        featured: true,
        stock: 32
    },

    {
        id: 4,
        name: "Minimal Backpack",
        category: "Fashion",
        price: 1890,
        oldPrice: 2290,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        featured: true,
        stock: 15
    },

    {
        id: 5,
        name: "Classic Sunglasses",
        category: "Fashion",
        price: 1290,
        oldPrice: 1590,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        featured: false,
        stock: 20
    },

    {
        id: 6,
        name: "Modern Desk Lamp",
        category: "Home",
        price: 1590,
        oldPrice: 1990,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        featured: false,
        stock: 12
    },

    {
        id: 7,
        name: "Premium Skin Care Set",
        category: "Beauty",
        price: 2190,
        oldPrice: 2690,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
        featured: false,
        stock: 27
    },

    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 1990,
        oldPrice: 2490,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        featured: false,
        stock: 21
    }
];


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(localStorage.getItem("shopnest_cart")) || [];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const featuredProducts =
    document.getElementById("featuredProducts");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const newsletterForm =
    document.getElementById("newsletterForm");


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0
    }).format(price);

}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const discount =
        product.oldPrice > product.price
            ? Math.round(
                ((product.oldPrice - product.price) /
                    product.oldPrice) * 100
            )
            : 0;


    return `
        <article class="product-card">

            <a
                href="product.html?id=${product.id}"
                class="product-image"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                    discount > 0
                        ? `
                            <span class="product-discount">
                                -${discount}%
                            </span>
                          `
                        : ""
                }

            </a>


            <div class="product-content">

                <span class="product-category">
                    ${product.category}
                </span>


                <a
                    href="product.html?id=${product.id}"
                    class="product-title"
                >
                    ${product.name}
                </a>


                <div class="product-price">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    ${
                        product.oldPrice > product.price
                            ? `
                                <del>
                                    ${formatPrice(product.oldPrice)}
                                </del>
                              `
                            : ""
                    }

                </div>


                <button
                    type="button"
                    class="btn btn-primary add-to-cart-btn"
                    data-product-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER FEATURED PRODUCTS
========================================================= */

function renderFeaturedProducts() {

    if (!featuredProducts) {
        return;
    }


    const featured =
        products.filter(product => product.featured);


    if (featured.length === 0) {

        featuredProducts.innerHTML = `
            <div class="product-loading">
                No featured products available.
            </div>
        `;

        return;
    }


    featuredProducts.innerHTML =
        featured
            .map(createProductCard)
            .join("");

}


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalItems =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


    cartCount.textContent = totalItems;

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        if (existingItem.quantity >= product.stock) {

            alert(
                "Sorry, there is no more stock available."
            );

            return;
        }


        existingItem.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    localStorage.setItem(
        "shopnest_cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showNotification(
        `${product.name} added to cart`
    );

}


/* =========================================================
   PRODUCT CARD CLICK EVENT
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(".add-to-cart-btn");


        if (!button) {
            return;
        }


        event.preventDefault();


        const productId =
            Number(
                button.dataset.productId
            );


        addToCart(productId);

    }
);


/* =========================================================
   SEARCH
========================================================= */

function performSearch() {

    if (!searchInput) {
        return;
    }


    const searchValue =
        searchInput.value.trim();


    if (!searchValue) {

        window.location.href =
            "products.html";

        return;
    }


    window.location.href =
        `products.html?search=${encodeURIComponent(
            searchValue
        )}`;

}


/* Search button */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


/* Search with Enter */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );

}


/* =========================================================
   NEWSLETTER
========================================================= */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );


            const email =
                emailInput.value.trim();


            if (!email) {
                return;
            }


            showNotification(
                "Thanks! You are subscribed."
            );


            newsletterForm.reset();

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const revealTargets = Array.from(
        document.querySelectorAll(
            "section, article, .product-card, .feature-card, .category-card, .collection-card, .testimonial-card, .cart-item, .order-card, .newsletter, .contact-card, .info-card, .service-card"
        )
    );

    if (!revealTargets.length) {
        return;
    }

    revealTargets.forEach(function (element, index) {

        element.classList.add("scroll-reveal");

        element.style.transitionDelay =
            `${Math.min(index * 30, 420)}ms`;

    });

    if (!window.IntersectionObserver) {

        revealTargets.forEach(function (element) {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealTargets.forEach(function (element) {
        observer.observe(element);
    });

}


/* =========================================================
   SIMPLE NOTIFICATION
========================================================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(
            ".shopnest-notification"
        );


    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");


    notification.className =
        "shopnest-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.classList.add(
                "hide"
            );

        },
        2200
    );


    setTimeout(
        () => {

            notification.remove();

        },
        2700
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderFeaturedProducts();

        updateCartCount();

        initScrollReveal();

    }
);