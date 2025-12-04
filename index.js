/*** Dark Mode ***/
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};
let motionEnabled = true;

const motionButton = document.getElementById("motion-button");
motionButton.addEventListener("click", () => {
    motionEnabled = !motionEnabled;
});
themeButton.addEventListener("click", toggleDarkMode);


/*** RSVP Handling ***/
let count = 3;
const rsvpButton = document.getElementById("rsvp-button");

const addParticipant = (person) => {
    const newParticipant = document.createElement("p");
    newParticipant.textContent =
        `🐾 ${person.name} from ${person.campus.charAt(0).toUpperCase() + person.campus.slice(1)} Campus has RSVP'd!`;

    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    // Update RSVP counter
    const oldCounter = document.getElementById("rsvp-count");
    if (oldCounter) oldCounter.remove();

    count += 1;
    const newCounter = document.createElement("p");
    newCounter.id = "rsvp-count";
    newCounter.textContent = `⭐ ${count} people have RSVP'd to this event!`;
    participantsDiv.appendChild(newCounter);
};


/*** Form Validation ***/
const validateForm = (event) => {
    event.preventDefault(); // Prevent page reload

    let containsErrors = false;
    const rsvpInputs = document.getElementById("rsvp-form").elements;

    let person = {
        name: rsvpInputs[0].value.trim(),
        email: rsvpInputs[1].value.trim(),
        campus: rsvpInputs[2].value
    };

    console.log("Person object created:", person);

    // Validate each input
    for (let i = 0; i < rsvpInputs.length; i++) {
        let input = rsvpInputs[i];
        if (input.type === "button") continue;

        if (input.value.trim().length < 2) {
            containsErrors = true;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    // Email must contain "@"
    const emailInput = document.getElementById("email");
    if (!emailInput.value.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error");
    } else {
        emailInput.classList.remove("error");
    }

    // If valid, add participant, show modal, reset form
    if (!containsErrors) {
        addParticipant(person);      // Add participant
        toggleModal(person);         // Show modal

        // Reset form fields & remove error highlights
        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].type !== "button") {
                rsvpInputs[i].value = "";
                rsvpInputs[i].classList.remove("error");
            }
        }
    }
};

// Attach form validation to RSVP button
rsvpButton.addEventListener("click", validateForm);


/*** Modal ***/



/*** Animations [PLACEHOLDER] ***/
/*** Animations & Modal Handling ***/
let rotateFactor = 0;                                      // tracks rotation
const modalImage = document.getElementById("modal-img");
const modal = document.getElementById("thanks-modal");
const closeModalButton = document.getElementById("close-modal-button");

function animateImage() {
    if (!modalImage) return;
    if (!motionEnabled) return;
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

function toggleModal(person) {
    const modalContent = document.getElementById("modal-text");
    modal.style.display = "flex";
    modalContent.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you there!`;

    // Start animation
    const animationInterval = setInterval(animateImage, 500);

    // Auto-hide modal after 5 seconds
    const modalTimeout = setTimeout(() => {
        closeModal();
    }, 5000);

    // Close button stops animation and timeout
    closeModalButton.onclick = () => {
        clearInterval(animationInterval);
        clearTimeout(modalTimeout);
        closeModal();
    };
}

function closeModal() {
    modal.style.display = "none";
    if (modalImage) {
        modalImage.style.transform = "rotate(0deg)";
        rotateFactor = 0;
    }
}
