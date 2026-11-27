const projects = [
 
{
    title: "Personal Portfolio",
    description:
        "A modern and responsive developer portfolio featuring animated sections, project showcases, internship experience and a functional contact form.",
    image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    link: "#"
},

    
{
    title: "Local Farmer's Marketplace",
    description:
        "A digital marketplace connecting local farmers directly with customers to make fresh farm produce accessible and support local farming communities.",
    image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    link: "https://localfarmersmarketplace.vercel.app/"
},

    
{
    title: "FitLife Landing Page",
    description:
        "A modern fitness product landing page showcasing workout essentials, customer testimonials and a contact section.",
    image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    link: "https://cheerful-strudel-991beb.netlify.app/"
}

];



const projectContainer = document.getElementById("project-container");

function renderProjects() {
    if (!projectContainer) return;

    projects.forEach((project) => {

        const article = document.createElement("article");
        article.className = "project-card";

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title + " project preview";
        image.loading = "lazy";

        const content = document.createElement("div");
        content.className = "project-content";

        const heading = document.createElement("h3");
        heading.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const link = document.createElement("a");
        link.href = project.link;
        link.textContent = "View Project ↗";

        if (project.link.startsWith("http")) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        content.appendChild(heading);
        content.appendChild(description);
        content.appendChild(link);

        article.appendChild(image);
        article.appendChild(content);

        projectContainer.appendChild(article);
    });
}

renderProjects();


const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok) {

                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting me.";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    result.errors
                        ? result.errors.map(error => error.message).join(", ")
                        : "Unable to send message. Please try again.";

            }

        } catch (error) {

            formStatus.textContent =
                "Something went wrong. Please check your internet connection and try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message ↗";

        }

    });

}
