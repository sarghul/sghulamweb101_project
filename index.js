/*** Dark Mode ***/
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);

/*** RSVP Handling ***/
let count = 3;
const rsvpButton = document.getElementById("rsvp-button");

const addParticipant = () => {
    const name = document.getElementById("name").value.trim();
    const campus = document.getElementById("campus").value;

    const newParticipant = document.createElement("p");
    newParticipant.textContent = `🐾 ${name} from ${campus.charAt(0).toUpperCase() + campus.slice(1)} Campus has RSVP'd!`;

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

    // Loop through inputs and check for < 2 characters
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

    // Email validation: must include "@"
    const emailInput = document.getElementById("email");
    if (!emailInput.value.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error");
    } else {
        emailInput.classList.remove("error");
    }

    // If no errors, add participant and clear the form
    if (!containsErrors) {
        addParticipant();

        for (let i = 0; i < rsvpInputs.length; i++) {
            if (rsvpInputs[i].type !== "button") {
                rsvpInputs[i].value = "";
                rsvpInputs[i].classList.remove("error"); // Remove any leftover highlights
            }
        }
    }
};

// Attach only validateForm to the RSVP button
rsvpButton.addEventListener("click", validateForm);



/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
