        
        // footer year
        document.getElementById("copyright-year").textContent = new Date().getFullYear();

        // nav bar hamburger
        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("nav-links");

        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            hamburger.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        navLinks.addEventListener("click", (event) => {
            if (event.target.matches("a")) {
                navLinks.classList.remove("open");
                hamburger.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // service slider
        const serviceSlider = document.querySelector(".service-scroll");
        let isDraggingServices = false;
        let dragStartX = 0;
        let sliderStartScroll = 0;

        serviceSlider.addEventListener("pointerdown", (event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            isDraggingServices = true;
            dragStartX = event.clientX;
            sliderStartScroll = serviceSlider.scrollLeft;
            serviceSlider.classList.add("is-dragging");
            serviceSlider.setPointerCapture(event.pointerId);
        });

        serviceSlider.addEventListener("pointermove", (event) => {
            if (!isDraggingServices) return;
            serviceSlider.scrollLeft = sliderStartScroll - (event.clientX - dragStartX);
        });

        const stopDraggingServices = () => {
            isDraggingServices = false;
            serviceSlider.classList.remove("is-dragging");
        };
        serviceSlider.addEventListener("pointerup", stopDraggingServices);
        serviceSlider.addEventListener("pointercancel", stopDraggingServices);

        serviceSlider.querySelectorAll("img").forEach((image) => {
            image.draggable = false;
        });