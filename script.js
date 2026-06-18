// Initialization of Premium Interactive Mechanics
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader Visual Termination
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.classList.add("opacity-0");
            setTimeout(() => preloader.remove(), 700);
        });
        // Safety timeout trigger if window load state delays
        setTimeout(() => { if (preloader) preloader.remove(); }, 2500);
    }

    // 2. Initialize AOS Animations Framework
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 3. Mobile Navigation Menu Toggle Engine
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 4. Smooth Scroll-To-Top Engine
    const scrollTopBtn = document.getElementById("scrollToTop");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.remove("hidden");
            } else {
                scrollTopBtn.classList.add("hidden");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. Dynamic Counter Statistics Interpolation Engine
    const counters = document.querySelectorAll("[data-target]");
    if (counters.length > 0) {
        const runCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const current = +counter.innerText;
                const increment = Math.ceil(target / 80); // Speed control

                if (current < target) {
                    counter.innerText = Math.min(current + increment, target);
                    setTimeout(runCounters, 25);
                } else {
                    counter.innerText = target + "+";
                }
            });
        };

        // Simple Intersection Observer for executing calculations dynamically when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runCounters();
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        
        const targetSection = counters[0].parentElement.parentElement;
        if (targetSection) observer.observe(targetSection);
    }

    // 6. Portfolio Collection Gallery Filter & Search System
    const searchInput = document.getElementById("catalogueSearch");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const items = document.querySelectorAll(".gallery-item");

    if (items.length > 0) {
        const filterGallery = () => {
            const activeTab = document.querySelector(".tab-btn.bg-luxuryGold")?.getAttribute("data-filter") || "all";
            const searchQuery = searchInput?.value.toLowerCase().trim() || "";

            items.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                const itemTitle = item.querySelector("h3")?.innerText.toLowerCase() || "";
                
                const matchesTab = (activeTab === "all" || itemCategory === activeTab);
                const matchesSearch = itemTitle.includes(searchQuery);

                if (matchesTab && matchesSearch) {
                    item.classList.remove("hidden-item");
                    item.style.position = "relative";
                    item.style.visibility = "visible";
                    item.style.pointerEvents = "auto";
                } else {
                    item.classList.add("hidden-item");
                }
            });
        };

        // Tab selection event bindings
        tabBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                tabBtns.forEach(b => {
                    b.classList.remove("bg-luxuryGold", "text-luxuryBlack");
                    b.classList.add("text-white", "border-luxuryGold/30");
                });
                e.currentTarget.classList.add("bg-luxuryGold", "text-luxuryBlack");
                e.currentTarget.classList.remove("text-white", "border-luxuryGold/30");
                filterGallery();
            });
        });

        // Live input keyup search bindings
        if (searchInput) {
            searchInput.addEventListener("input", filterGallery);
        }
    }

    // 7. Lightbox Modal Quick View System Controller
    const quickViewButtons = document.querySelectorAll(".quick-view-btn");
    const modal = document.getElementById("quickViewModal");
    const closeModal = document.getElementById("closeModal");

    if (quickViewButtons.length > 0 && modal) {
        quickViewButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const title = e.currentTarget.getAttribute("data-title");
                const desc = e.currentTarget.getAttribute("data-desc");
                const img = e.currentTarget.getAttribute("data-img");

                document.getElementById("modalTitle").innerText = title;
                document.getElementById("modalDesc").innerText = desc;
                document.getElementById("modalImg").setAttribute("src", img);

                modal.classList.remove("hidden");
                document.body.classList.add("overflow-hidden");
            });
        });

        const closeActiveModal = () => {
            modal.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
        };

        if (closeModal) closeModal.addEventListener("click", closeActiveModal);
        modal.addEventListener("click", (e) => { if (e.target === modal) closeActiveModal(); });
    }
});
