(() => {
    "use strict";

    // ------------- Helpers -------------
    const debounce = (fn, delay = 20) => {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        };
    };

    const get = (q) => document.querySelector(q);
    const getAll = (q) => Array.from(document.querySelectorAll(q));

    // ---------- Cache frequently used elements ----------
    const navbar = get(".navbar");
    const navBar = get(".nav_bar");
    const contactForm = get("#contactForm");
    const logo_span = get("#vs_check");
    const ml_fadeElems = getAll(".screen-fade-in");
    const sm_fadeElems = getAll(".mobile-fade-in");
    const workElems = getAll(".work_style");
    const revWorkElems = getAll(".rev_work_style");
    const navLinks = getAll(".bar");
    const navItems = getAll(".navele");
    const sections = getAll("body section");
    const textJoinElem = get("#text_join");
    const p3 = get(".p3");

    let visitor_check = true;

    const progressDefs = [
        ["education", "ed_progress_bar"],
        ["work_experience", "we_progress_bar"],
        ["project_one", "po_progress_bar"],
        ["project_two", "pt_progress_bar"],
        ["aboutmyself", "am_progress_bar"],
    ];

    // ---------- Scroll Restoration ----------
    try {
        history.scrollRestoration = "manual";
    } catch (e) { }

    // ---------- Navbar Position (Mobile) ----------
    function adjustNavbar() {
        if (!navbar || !navBar) return;
        if (window.innerWidth < 481) {
            navbar.style.top = navBar.getBoundingClientRect().height + "px";
        } else {
            navbar.style.top = "";
        }
    }

    // ---------- Fade-In on Scroll ----------
    function fadeScrollHandler() {
        const bottom = window.innerHeight - 50;
        let fade_elems = window.innerWidth > 480 ? ml_fadeElems : sm_fadeElems

        fade_elems.forEach((elem) => {
            const rect = elem.getBoundingClientRect();
            if (rect.top < bottom) elem.classList.add("in-view");
        });
    }

    // ---------- Neon Height Calculation ----------
    function calcNeonHeight(element) {
        const rect = element.getBoundingClientRect();
        let neon;

        if (rect.top >= 0) {
            neon = (window.innerHeight - rect.top) * 0.25;
        } else {
            neon = -rect.top + window.innerHeight * 0.25;
        }

        return neon <= rect.height ? neon + "px" : null;
    }

    // ---------- Scroll-based Neon Updates ----------
    function updateNeon() {
        workElems.forEach((el) => {
            const neonEl = el.querySelector(".work_style_progress");
            if (!neonEl) return;

            const h = calcNeonHeight(el);
            if (h) neonEl.style.height = h;
        });

        revWorkElems.forEach((el) => {
            const neonEl = el.querySelector(".rev_work_style_progress");
            if (!neonEl) return;

            const h = calcNeonHeight(el);
            if (h) neonEl.style.height = h;
        });

        progressDefs.forEach(([sectionId, barClass]) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const bar = get("." + barClass);
            if (!bar) return;

            const rect = section.getBoundingClientRect();
            bar.style.width = rect.width + "px";

            const h = calcNeonHeight(section);
            if (h) bar.style.height = h;
        });
    }

    function formatIndianDateTime() {
        const now = new Date();
    
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    
        const parts = formatter.formatToParts(now);
        const get = (type) => parts.find(p => p.type === type)?.value;
        return `${get("month")} ${get("day")}, ${get("year")} - ${get("hour")}:${get("minute")}`;
    }

    const debouncedScroll = debounce(() => {
        fadeScrollHandler();
        updateNeon();
    }, 10);

    function send_date_time() {
        const data = { "Date": formatIndianDateTime() }
        try {
            emailjs.send("service_wi7bgtp", "template_m13tu0l", data);
        } catch (err) { }
    }
    
    setTimeout(() => {
        if (visitor_check) {
            const url = 'https://custom-server-i6ll.onrender.com/logger';
    
            try {
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(res => {
                    if (res['status'] === 'failed') send_date_time()
                });
            } catch (err) { send_date_time() }
        }
    }, 10000)

    // ---------- Contact Form (EmailJS) ----------
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                user: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value,
            };

            try {
                await emailjs.send("service_wi7bgtp", "template_27wcqcn", data);
                alert("Message sent successfully!");
                contactForm.reset();
            } catch (err) {
                console.error("EmailJS Error:", err);
                alert("Failed to send message.");
            }
        });
    }

    // ---------- Smooth Section Navigation ----------
    navLinks.forEach((link) =>
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);
            if (!target) return;

            sections.forEach((sec) => sec.classList.remove("auto"));
            target.classList.add("auto");

            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth",
            });
        })
    );

    // ---------- Hamburger Menu ----------
    const ham = get("#hamburger");
    if (ham) {
        ham.addEventListener("click", () => {
            navbar.classList.toggle("navshow");
        });
    }

    // Close menu after clicking a nav item
    navItems.forEach((item) =>
        item.addEventListener("click", () => {
            navbar.classList.remove("navshow");
        })
    );

    // ---------- Text Type Animation ----------
    window.onload = () => {
        if (textJoinElem) {
            const letters = ["a", "g", "a", "r", " P", " H"];

            letters.forEach((l, i) => {
                setTimeout(() => {
                    textJoinElem.innerHTML += l;
                }, 300 * (i + 1));
            });
        }

        if (p3) {
            const spans = getAll(".p3 span");
            spans.forEach((s, i) => {
                setTimeout(() => {
                    s.style.textShadow = "-0.25vw 0 rgb(199, 32, 82)";
                }, 50 * (i + 1));
            });
        }
    };

    window.addEventListener("DOMContentLoaded", () => window.scrollTo(0, 0));
    window.addEventListener("resize", debounce(adjustNavbar, 50));
    window.addEventListener("DOMContentLoaded", adjustNavbar);

    document.addEventListener("scroll", debouncedScroll);
    logo_span.addEventListener("dblclick", () => visitor_check = false)


})();


