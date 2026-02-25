text = "Web Developer";
const speed = 120;
const pauseAfterTyping = 3000;

let index = 0;
let typing = true;

const target = document.getElementById("text");

function typeLoop() {
    if (typing) {
        if (index <= text.length) {
            target.innerText = text.slice(0, index++);
            setTimeout(typeLoop, speed);
        } else {
            typing = false;
            setTimeout(typeLoop, pauseAfterTyping);
        }
    } else {
        if (text === "Web Developer") {
            text = "App Developer";
        } else {
            text = "Web Developer";
        }
        index = 0;
        target.innerText = "";
        typing = true;
        setTimeout(typeLoop, speed);
    }
}

typeLoop();

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("active") })
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

(function () {
    emailjs.init("V_2fPu835svDD4F-b");
})();

const form = document.getElementById("contactForm");
const button = form.querySelector("button");
const toast = document.getElementById("toast");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Set loading state
    button.classList.add("loading");
    button.disabled = true;
    button.innerHTML = "Sending";

    emailjs.sendForm(
        "service_lz312n2",
        "template_dre9vrr",
        this
    )

        .then(() => {
            toast.innerText = "Message sent successfully!";
            toast.classList.add("show");
            form.reset();
        })
        .catch(() => {
            toast.innerText = "Failed to send!";
            toast.classList.add("show");
        })
        .finally(() => {
            // ✅ ALWAYS reset button
            button.classList.remove("loading");
            button.disabled = false;
            button.innerHTML = "Send Message";

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        });
});

const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");
const overlay = document.getElementById("menuOverlay");

function closeMenu() {
    menu.classList.remove("show");
    overlay.classList.remove("show");
    toggle.classList.remove("active");
}

toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
    overlay.classList.toggle("show");
    toggle.classList.toggle("active");
});

// Close on link click
menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Close on outside click
overlay.addEventListener("click", closeMenu);