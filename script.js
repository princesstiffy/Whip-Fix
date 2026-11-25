        
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

        // Submit the contact form without navigating away from the page.
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
            const formStatus = document.getElementById("form-status");
            const submissionDialog = document.getElementById("submission-dialog");
            const submitButton = contactForm.querySelector(".form-submit");
            const submitLabel = submitButton.innerHTML;

            contactForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                formStatus.hidden = true;
                submitButton.disabled = true;
                submitButton.textContent = "Sending…";

                try {
                    const response = await fetch(contactForm.action, {
                        method: "POST",
                        body: new FormData(contactForm),
                        headers: { Accept: "application/json" }
                    });

                    if (!response.ok) throw new Error("The inquiry could not be sent. Please try again or contact me directly.");

                    contactForm.reset();
                    submissionDialog.showModal();
                } catch (error) {
                    formStatus.textContent = error.message || "Something went wrong. Please try again or contact me directly.";
                    formStatus.hidden = false;
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = submitLabel;
                }
            });

            submissionDialog.querySelector(".dialog-close").addEventListener("click", () => {
                submissionDialog.close();
            });
            submissionDialog.addEventListener("click", (event) => {
                if (event.target === submissionDialog) submissionDialog.close();
            });
        }

        // service slider
        const serviceSlider = document.querySelector(".service-scroll");
        let isDraggingServices = false;
        let dragStartX = 0;
        let sliderStartScroll = 0;

        if (serviceSlider) {
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
        }
