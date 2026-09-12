(function () {
    "use strict";

    var page = (location.pathname.split("/").pop() || "index.html").split("?")[0];

    var groups = [
        {
            title: "Main",
            items: [
                { href: "index.html", label: "Dashboard", icon: "▦", match: ["index.html"] },
                { href: "products.html", label: "Products", icon: "▣", match: ["products.html", "product-edit.html"] },
                { href: "orders.html", label: "Orders", icon: "⌑", match: ["orders.html", "order-details.html"] },
                { href: "customers.html", label: "Customers", icon: "♙", match: ["customers.html", "customer-details.html"] },
                { href: "categories.html", label: "Categories", icon: "▤", match: ["categories.html"] },
                { href: "coupons.html", label: "Coupons", icon: "%", match: ["coupons.html"] }
            ]
        },
        {
            title: "Store Management",
            items: [
                { href: "inventory.html", label: "Inventory", icon: "◫", match: ["inventory.html"] },
                { href: "shipping.html", label: "Shipping", icon: "✈", match: ["shipping.html"] },
                { href: "returns.html", label: "Returns", icon: "↺", match: ["returns.html"] },
                { href: "claim.html", label: "Claims", icon: "⚑", match: ["claim.html"] },
                { href: "payments.html", label: "Payments", icon: "◌", match: ["payments.html"] },
                { href: "tax.html", label: "Tax", icon: "₨", match: ["tax.html"] },
                { href: "couriers.html", label: "Couriers", icon: "◍", match: ["couriers.html"] },
                { href: "delivery-zones.html", label: "Delivery Zones", icon: "⌁", match: ["delivery-zones.html"] }
            ]
        },
        {
            title: "Reports & Insights",
            items: [
                { href: "reports.html", label: "Reports", icon: "◒", match: ["reports.html"] },
                { href: "reviews.html", label: "Reviews", icon: "★", match: ["reviews.html"] },
                { href: "audit-logs.html", label: "Audit Logs", icon: "☰", match: ["audit-logs.html"] }
            ]
        },
        {
            title: "Marketing & Content",
            items: [
                { href: "banners.html", label: "Banners", icon: "✦", match: ["banners.html"] },
                { href: "homepage.html", label: "Homepage", icon: "⌂", match: ["homepage.html"] },
                { href: "media.html", label: "Media", icon: "◫", match: ["media.html"] },
                { href: "seo.html", label: "SEO", icon: "◈", match: ["seo.html"] },
                { href: "email-templates.html", label: "Email Templates", icon: "✉", match: ["email-templates.html"] },
                { href: "sms-templates.html", label: "SMS Templates", icon: "☎", match: ["sms-templates.html"] },
                { href: "notifications.html", label: "Notifications", icon: "✉", match: ["notifications.html"] }
            ]
        },
        {
            title: "Admin Tools",
            items: [
                { href: "staff.html", label: "Staff", icon: "♙", match: ["staff.html"] },
                { href: "admin-profile.html", label: "Admin Profile", icon: "♚", match: ["admin-profile.html"] },
                { href: "search.html", label: "Search", icon: "⌕", match: ["search.html"] },
                { href: "security.html", label: "Security", icon: "⚡", match: ["security.html"] },
                { href: "bulk-actions.html", label: "Bulk Actions", icon: "⇅", match: ["bulk-actions.html"] },
                { href: "import-export.html", label: "Import / Export", icon: "⇓", match: ["import-export.html"] },
                { href: "settings.html", label: "Settings", icon: "⚙", match: ["settings.html"] }
            ]
        }
    ];

    var sidebar = document.querySelector("#sidebar, aside.sidebar, aside.admin-sidebar, .admin-sidebar");

    if (!sidebar) {
        return;
    }

    var usesNavItem = Boolean(sidebar.querySelector(".nav-item"));
    var usesNavLink = Boolean(sidebar.querySelector(".nav-link"));
    var usesAdminNav = Boolean(sidebar.querySelector(".admin-nav"));
    var iconClass = sidebar.querySelector(".nav-icon")
        ? "nav-icon"
        : sidebar.querySelector(".icon")
            ? "icon"
            : "nav-icon";

    var linkClass = usesNavItem ? "nav-item" : usesNavLink ? "nav-link" : "";
    var titleClass = sidebar.querySelector(".menu-title")
        ? sidebar.querySelector(".menu-title").className
        : sidebar.querySelector(".nav-title")
            ? sidebar.querySelector(".nav-title").className
            : sidebar.querySelector(".nav-section-title")
                ? sidebar.querySelector(".nav-section-title").className
                : usesNavItem
                    ? "menu-title"
                    : "nav-title";

    function isActive(item) {
        return (item.match || [item.href]).indexOf(page) !== -1;
    }

    function makeLink(item) {
        var active = isActive(item);
        var className = (linkClass + (active ? " active" : "")).trim();
        var classAttr = className ? ' class="' + className + '"' : (active ? ' class="active"' : "");

        return (
            '<a href="' + item.href + '"' + classAttr + ">" +
                '<span class="' + iconClass + '">' + item.icon + "</span>" +
                item.label +
            "</a>"
        );
    }

    function makeGroup(group) {
        var html = '<div class="' + titleClass + '">' + group.title + "</div>";

        if (usesNavItem) {
            html += '<nav class="nav-menu">';
            html += group.items.map(makeLink).join("");
            html += "</nav>";
            return html;
        }

        html += group.items.map(makeLink).join("");
        return html;
    }

    var menuHtml = groups.map(makeGroup).join("");

    var footerHtml =
        '<a href="../index.html"' + (linkClass ? ' class="' + linkClass + '"' : "") + ">" +
            '<span class="' + iconClass + '">↗</span> View Store' +
        "</a>" +
        '<a href="../login.html" id="logoutBtn"' + (linkClass ? ' class="' + linkClass + '"' : "") + ">" +
            '<span class="' + iconClass + '">⇥</span> Logout' +
        "</a>";

    var brand = sidebar.querySelector(".brand, .admin-logo, .admin-brand, .logo");
    var footer = sidebar.querySelector(".sidebar-bottom, .sidebar-footer");
    var adminNav = sidebar.querySelector(".admin-nav, nav.nav");

    if (adminNav && !usesNavItem) {
        adminNav.innerHTML = menuHtml +
            '<div class="' + titleClass + '">Store</div>' +
            footerHtml;
    } else {
        Array.prototype.slice.call(sidebar.children).forEach(function (child) {
            if (brand && child === brand) {
                return;
            }
            if (footer && child === footer) {
                return;
            }
            sidebar.removeChild(child);
        });

        var wrap = document.createElement("div");
        wrap.innerHTML = menuHtml;

        if (footer) {
            while (wrap.firstChild) {
                sidebar.insertBefore(wrap.firstChild, footer);
            }

            footer.innerHTML = footerHtml;
        } else {
            var bottom = document.createElement("div");
            bottom.className = usesNavItem ? "sidebar-bottom" : "sidebar-footer";
            bottom.innerHTML = footerHtml;

            while (wrap.firstChild) {
                sidebar.appendChild(wrap.firstChild);
            }

            sidebar.appendChild(bottom);
        }
    }

    sidebar.querySelectorAll('a[href="../admin-profile.html"]').forEach(function (link) {
        link.setAttribute("href", "admin-profile.html");
    });
})();
