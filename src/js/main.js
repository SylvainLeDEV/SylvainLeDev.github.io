let URL_FOLDER_DATA = '/assets/data/'
// ---- End Environement ---- //
const isMobile = window.innerWidth <= 768;
// ---- Curtain menu ---- //
function openNav() {
    document.getElementById("myOverlay").style.height = "100%";
}

const openCurtain = document.querySelector(".open-curtain")
openCurtain.addEventListener('click', openNav)

function closeNav() {
    document.getElementById("myOverlay").style.height = "0%";
}

const closeLinks = document.querySelectorAll('.close-curtain');
// Get all links with the class "close-curtain"
closeLinks.forEach(link => {
    // For each link, add an event listener for when it's clicked
    link.addEventListener('click', e => {
        // When the link is clicked, do the following:
        e.preventDefault(); // Prevent the default behavior of the browser
        closeNav(); // Close the menu
        const targetId = e.target.getAttribute('href');
        // Get the ID of the target element from the link's "href" attribute
        const targetElement = document.querySelector(targetId);
        // Find the element with that ID
        targetElement.scrollIntoView({behavior: 'smooth'});
        // Scroll the page to that element
    });
});
// ---- End Curtain ---- //

// ---- Navbar Scroll --------//
let lastScrollTop = 0;
const navbar = document.getElementById("myNavbar");

window.addEventListener("scroll", function (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.opacity = "0";
        navbar.style.height = "0px";
    } else {
        navbar.style.opacity = "0.98";
        navbar.style.height = "57px";
    }
    lastScrollTop = scrollTop;
});
// ---- End Navbar ----------//

// ---- Description ---------//
const DESCRIPTION_MODULE_URL = `${URL_FOLDER_DATA}/description.js`;
import(DESCRIPTION_MODULE_URL)
    .then(module => {
        const DESCRIPTION = module.DESCRIPTION;
        const descriptionBlock = document.querySelector(".block__text");
        for (let i = 0; i < DESCRIPTION.length; i++) {
            const paragraph = document.createElement("p");
            paragraph.textContent = DESCRIPTION[i];
            descriptionBlock.appendChild(paragraph);
        }
    })
    .catch(error => {
        console.error("Error in file Description : ", error)
    });
// ---- End Description -----//
const SKILLS_MODULE_URL = `${URL_FOLDER_DATA}/skills.js`;
import(SKILLS_MODULE_URL)
    .then(module => {
        const LANGUAGE = module.LANGUAGE;
        const TOOLS = module.TOOLS;
        const SOFT_SKILLS = module.SOFT_SKILLS;
        const skillsContainer = document.querySelector(".skills__container-cards");
        const generateSkills = (skillsArray, skillClass, title) => {
            const skillDiv = document.createElement("div");
            skillDiv.classList.add("skill", skillClass);
            const skillTitle = document.createElement("h4");
            skillTitle.textContent = title;
            skillDiv.appendChild(skillTitle);
            skillsArray.forEach((skill) => {
                const skillButton = document.createElement("button");
                skillButton.classList.add("pill", "hover");
                skillButton.textContent = skill;
                skillDiv.appendChild(skillButton);
            });
            skillsContainer.appendChild(skillDiv);
        };
        generateSkills(LANGUAGE, "skill-language", "Languages");
        generateSkills(TOOLS, "skill-tools", "Tools");
        generateSkills(SOFT_SKILLS, "skill-soft-skills", "Soft Skills");
    })
    .catch(error => {
        console.error("Error in file Skills : ", error)
    });
// ---- Pill of Skills ------//

// ---- Experience --------- //
const CHRONOLOGIE_MODULE_URL = `${URL_FOLDER_DATA}/chronologie.js`;
import(CHRONOLOGIE_MODULE_URL)
    .then(module => {
        const CHRONOLOGIE = module.CHRONOLOGIE;
        const timelineDiv = document.querySelector(".timeline");
// Loop to display each element of CHRONOLOGIE.
        for (let i = 0; i < CHRONOLOGIE.length; i++) {
            const element = CHRONOLOGIE[i];

            // Creating a div element for each element of CHRONOLOGIE.
            const timelineExp = document.createElement("div");
            timelineExp.classList.add("timeline-exp");

            const divContent = document.createElement("div");
            if (isMobile) {
                timelineExp.classList.add("aos-disabled");
                timelineExp.appendChild(divContent);
            } else {
                // add data-aos for animation
                divContent.setAttribute("data-aos", i % 2 === 0 ? "zoom-in-left" : "zoom-in-right");
                timelineExp.appendChild(divContent);
            }

            // add title
            const title = document.createElement("h4");
            title.textContent = element.title;
            divContent.appendChild(title);

            // add date
            const date = document.createElement("h6");
            date.textContent = element.date;
            divContent.appendChild(date);

            // Add content
            const content = document.createElement("p");
            content.textContent = element.content;
            divContent.appendChild(content);

            // Adding the div element to the timeline div.
            timelineDiv.appendChild(timelineExp);
        }
    })
    .catch(error => {
        console.error("Error in file chronologie : ", error)
    });

// ---- End Experience ---------//

//--------- Carousel ------//
const PROJECTS_MODULE_URL = `${URL_FOLDER_DATA}/project.js`;
import(PROJECTS_MODULE_URL)
    .then(module => {
        const PROJECTS = module.PROJECTS;
        const buttonRight = document.querySelector(".carousel__arrow-right");
        const buttonLeft = document.querySelector(".carousel__arrow-left");
        const slides = document.getElementById("carousel-items");

        let slideIndex = 0;
        const numSlides = PROJECTS.length;

        // Get the width of the carousel container
        let containerCarousel = document.querySelector(".portfolio__container-carousel").clientWidth;

        // Update the carousel container width on window resize
        window.addEventListener("resize", () => {
            containerCarousel = document.querySelector(".portfolio__container-carousel").clientWidth;
            slides.style.transform = `translate(-${slideIndex * containerCarousel}px)`;
        });

        // Set the width of the carousel to hold all slides
        slides.style.width = `${numSlides * 100}%`;

        // Create carousel slides and anchors dynamically
        PROJECTS.forEach((project, i) => {
            const image = document.createElement("div");
            image.className = "carousel__image";
            image.style.backgroundImage = `url(./assets/img/carousel/${project.IMG}.jpg)`;

            const anchor = document.createElement("a");
            anchor.className = "carousel__anchor";
            anchor.href = project.URL;
            anchor.target = "_blank";
            image.appendChild(anchor);

            // Uncomment below to add project name to the anchor
            // const projectName = document.createElement("p");
            // projectName.innerHTML = Object.keys(PROJECTS)[i];
            // anchor.appendChild(projectName);

            slides.appendChild(image);
        });

        // Function to play the carousel automatically
        const autoPlay = () => {
            slideIndex++;
            if (slideIndex > numSlides - 1) {
                slideIndex = 0;
            }
            slides.style.transform = `translate(-${slideIndex * containerCarousel}px)`;
            slides.style.transition = "all 0.6s ease-in-out";
        };

        let autoscrolling = setInterval(autoPlay, 3000);

        // Add click event listener to the left arrow button
        buttonLeft.addEventListener("click", () => {
            slideIndex--;
            if (slideIndex < 0) {
                slideIndex = numSlides - 1;
            }
            slides.style.transform = `translate(-${slideIndex * containerCarousel}px)`;
            slides.style.transition = "all 0.6s ease-in-out";
            clearInterval(autoscrolling);
        });

        // Add click event listener to the right arrow button
        buttonRight.addEventListener("click", () => {
            slideIndex++;
            if (slideIndex > numSlides - 1) {
                slideIndex = 0;
            }
            slides.style.transform = `translate(-${slideIndex * containerCarousel}px)`;
            slides.style.transition = "all 0.6s ease-in-out";
            clearInterval(autoscrolling);
        });

        // Restart autoplay when user clicks on any carousel slide
        function restartCarousel() {
            clearInterval(autoscrolling);
            autoscrolling = setInterval(autoPlay, 3000);
        }

        buttonRight.addEventListener("click", restartCarousel)
        buttonLeft.addEventListener("click", restartCarousel)
    })
    .catch(error => {
        console.error("Error in file project : ", error)
    });
//----- END CAROUSEL -----//


//----- TypedJS -----//

// import Typed from '/assets/typed.js/lib/typed.js';
let typed = new Typed('.typed', {
    strings: ["Java Script", "React JS", "Node JS", "HTML / CSS", "AWS"],
    typeSpeed: 40,
    backSpeed: 100,
    fadeOut: true,
    loop: true
});
//----- END TypedJS -----//


// AOS animation library JS
AOS.init({
    startEvent: 'DOMContentLoaded',
    disable: 'mobile',
    duration: 1100,
});
// END AOS animation library JS--//


// Mouse ----------------------
if (!isMobile) {
    const cursor = document.querySelector('.cursor');
    window.addEventListener('mousemove', e => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`);
    });
    const hoverLink = document.querySelectorAll('.hover');
    hoverLink.forEach((link) => {
        link.addEventListener('mouseover', () => {
            cursor.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transition = '.3s ease-out';
            cursor.classList.remove('hovered');
        });
    });
}
// END Mouse ------------------


console.log("COUCOU :) ! Si tu est là, c'est que tu inspecte mon site, pas de problème a ça !  ");
console.log("Le code est en open source n'hésite pas à t'en servire si tu en as besoin ! ");

