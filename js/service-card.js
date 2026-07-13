/* ==========================================
   SERVICES DATA
========================================== */

const SERVICES = [
  {
    number: "01",
    title: "Design",
    color: "#F36A21",
    textColor: "#1B1B1B",
    description:
      "Creating intuitive experiences that connect people with products.",
    items: [
      "Product Strategy",
      "UX Research",
      "UX/UI Design",
      "Design Systems",
      "Interaction Design",
      "Website Design",
      "Mobile App Design",
      "Prototyping"
    ]
  },

  {
    number: "02",
    title: "Development",
    color: "#3B5BFF",
    textColor: "#FFFFFF",
    description:
      "Building scalable, reliable and high-performance digital products.",
    items: [
      "Frontend Development",
      "Backend Development",
      "WordPress Development",
      "Webflow Development",
      "Framer Development",
      "API Integration",
      "Performance Optimization",
      "Maintenance & Support"
    ]
  },

  {
    number: "03",
    title: "SEO",
    color: "#FFD84D",
    textColor: "#1B1B1B",
    description:
      "Helping businesses increase visibility and attract the right audience.",
    items: [
      "Technical SEO",
      "SEO Audit",
      "Keyword Research",
      "On-page SEO",
      "Content Strategy",
      "Schema Markup",
      "Analytics",
      "Performance Monitoring"
    ]
  },

  {
    number: "04",
    title: "Branding",
    color: "#00B894",
    textColor: "#FFFFFF",
    description:
      "Creating memorable brands that people recognize and trust.",
    items: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Design",
      "Brand Guidelines",
      "Typography",
      "Color Systems",
      "Marketing Assets",
      "Brand Positioning"
    ]
  },

  {
    number: "05",
    title: "Product",
    color: "#8E44AD",
    textColor: "#FFFFFF",
    description:
      "Transforming ideas into successful digital products from concept to launch.",
    items: [
      "Discovery",
      "User Flows",
      "Wireframes",
      "Product Roadmap",
      "MVP Planning",
      "User Testing",
      "Growth Strategy",
      "Product Optimization"
    ]
  },

  {
    number: "06",
    title: "Marketing",
    color: "#E74C3C",
    textColor: "#FFFFFF",
    description:
      "Growing digital products through strategic marketing and measurable campaigns.",
    items: [
      "Digital Marketing",
      "Paid Advertising",
      "Email Campaigns",
      "Content Marketing",
      "Social Media",
      "Conversion Optimization",
      "Analytics",
      "Growth Reporting"
    ]
  }
];


/* ==========================================
   CARD ELEMENTS
========================================== */

const frontCard = document.querySelector(".service-card-front");
const middleCard = document.querySelector(".service-card-middle");
const backCard = document.querySelector(".service-card-back");

let index = 0;


/* ==========================================
   RENDER CARD
========================================== */

function renderCard(card, service) {

    card.style.background = service.color;
    card.style.color = service.textColor;

    card.querySelector(".service-number").textContent =
        `${service.number} —`;

    card.querySelector(".service-title").textContent =
        service.title;

    card.querySelector(".service-description").textContent =
        service.description;

    card.querySelector(".service-list").innerHTML =
        service.items
            .map(item => `<li>${item}</li>`)
            .join("");

}


/* ==========================================
   INITIAL LOAD
========================================== */

function loadCards(){

    renderCard(
        frontCard,
        SERVICES[index % SERVICES.length]
    );

    renderCard(
        middleCard,
        SERVICES[(index + 1) % SERVICES.length]
    );

    renderCard(
        backCard,
        SERVICES[(index + 2) % SERVICES.length]
    );

}

loadCards();


/* ==========================================
   NEXT SLIDE
========================================== */

function nextSlide(){

    // Fade text
    frontCard.classList.add("changing");
    middleCard.classList.add("changing");
    backCard.classList.add("changing");

    setTimeout(()=>{

        index++;

        renderCard(
            frontCard,
            SERVICES[index % SERVICES.length]
        );

        renderCard(
            middleCard,
            SERVICES[(index + 1) % SERVICES.length]
        );

        renderCard(
            backCard,
            SERVICES[(index + 2) % SERVICES.length]
        );

        frontCard.classList.remove("changing");
        middleCard.classList.remove("changing");
        backCard.classList.remove("changing");

    },350);

}


/* ==========================================
   AUTO SLIDE
========================================== */

setInterval(nextSlide,4000);