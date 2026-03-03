/* ==================== SHOW MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.classList.add('disable-scroll');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.classList.remove('disable-scroll');
    });
}

/* Remove menu on mobile link click */
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
    document.body.classList.remove('disable-scroll');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
const scrollHeader = () => {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SHOW SCROLL UP ==================== */
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

/* ==================== TYPING EFFECT ==================== */
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Data Scientist", "Data Analyst", "Machine Learning Engineer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if typedTextSpan exists to prevent errors on pages without it
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

/* ==================== PORTFOLIO MODALS ==================== */
const modalViews = document.querySelectorAll('.portfolio-modal'),
    modalBtns = document.querySelectorAll('.project-dots, .project-link'),
    modalCloses = document.querySelectorAll('.portfolio-modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener('click', (e) => {
        // Only prevent default if it has a data-target (View Details & Dots), but let typical links go through
        if (modalBtn.hasAttribute('data-target')) {
            e.preventDefault();
            const targetModal = document.getElementById(modalBtn.getAttribute('data-target'));
            if (targetModal) {
                targetModal.classList.add('active-modal');
            }
        }
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

// Close click outside
window.addEventListener('click', (e) => {
    modalViews.forEach((modalView) => {
        if (e.target === modalView) {
            modalView.classList.remove('active-modal');
        }
    })
});

/* ==================== EXPAND PROJECT DESCRIPTION ==================== */
const projectDescriptions = document.querySelectorAll('.project-description');

projectDescriptions.forEach(desc => {
    desc.addEventListener('click', () => {
        desc.classList.toggle('expanded');
    });
});
